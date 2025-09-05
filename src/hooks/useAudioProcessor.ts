import { useRef, useCallback, useState, useEffect } from 'react';

interface AudioSettings {
  masterVolume: number;
  highFreq: number;
  lowFreq: number;
  balance: number; // -100 to 100, 0 is center
}

export const useAudioProcessor = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const highFilterRef = useRef<BiquadFilterNode | null>(null);
  const lowFilterRef = useRef<BiquadFilterNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const startAudioProcessing = useCallback(async (): Promise<boolean> => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      });
      
      streamRef.current = stream;
      
      // Create audio context
      audioContextRef.current = new AudioContext();
      const audioContext = audioContextRef.current;
      
      // Create audio nodes
      sourceRef.current = audioContext.createMediaStreamSource(stream);
      gainNodeRef.current = audioContext.createGain();
      highFilterRef.current = audioContext.createBiquadFilter();
      lowFilterRef.current = audioContext.createBiquadFilter();
      analyserRef.current = audioContext.createAnalyser();
      pannerRef.current = audioContext.createStereoPanner();
      
      // Configure filters
      highFilterRef.current.type = 'highshelf';
      highFilterRef.current.frequency.value = 3000;
      
      lowFilterRef.current.type = 'lowshelf';
      lowFilterRef.current.frequency.value = 300;
      
      // Configure analyser
      analyserRef.current.fftSize = 256;
      
      // Connect audio chain
      sourceRef.current
        .connect(highFilterRef.current)
        .connect(lowFilterRef.current)
        .connect(gainNodeRef.current)
        .connect(pannerRef.current)
        .connect(analyserRef.current)
        .connect(audioContext.destination);
      
      setIsProcessing(true);
      
      // Start audio level monitoring
      const updateAudioLevels = () => {
        if (analyserRef.current) {
          const bufferLength = analyserRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Group frequencies into bands for equalizer display
          const bands = 8;
          const bandSize = Math.floor(bufferLength / bands);
          const levels = [];
          
          for (let i = 0; i < bands; i++) {
            const start = i * bandSize;
            const end = start + bandSize;
            let sum = 0;
            for (let j = start; j < end; j++) {
              sum += dataArray[j];
            }
            levels.push(sum / bandSize / 255); // Normalize to 0-1
          }
          
          setAudioLevels(levels);
        }
        
        if (isProcessing) {
          requestAnimationFrame(updateAudioLevels);
        }
      };
      
      updateAudioLevels();
      
      return true;
    } catch (error) {
      console.error('Audio processing error:', error);
      return false;
    }
  }, [isProcessing]);

  const stopAudioProcessing = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    // Reset refs
    audioContextRef.current = null;
    sourceRef.current = null;
    gainNodeRef.current = null;
    highFilterRef.current = null;
    lowFilterRef.current = null;
    analyserRef.current = null;
    pannerRef.current = null;
    streamRef.current = null;
    
    setIsProcessing(false);
    setAudioLevels([]);
  }, []);

  const updateSettings = useCallback((settings: AudioSettings) => {
    if (!isProcessing) return;
    
    // Update volume
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = settings.masterVolume / 100;
    }
    
    // Update high frequency
    if (highFilterRef.current) {
      highFilterRef.current.gain.value = settings.highFreq;
    }
    
    // Update low frequency
    if (lowFilterRef.current) {
      lowFilterRef.current.gain.value = settings.lowFreq;
    }
    
    // Update balance
    if (pannerRef.current) {
      pannerRef.current.pan.value = settings.balance / 100;
    }
  }, [isProcessing]);

  useEffect(() => {
    return () => {
      stopAudioProcessing();
    };
  }, [stopAudioProcessing]);

  return {
    startAudioProcessing,
    stopAudioProcessing,
    updateSettings,
    audioLevels,
    isProcessing
  };
};