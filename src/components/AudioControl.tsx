import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Settings,
  AlertTriangle,
  Clock,
  Save,
  RotateCcw
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAudioProcessor } from "@/hooks/useAudioProcessor";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DarkModeToggle } from "./DarkModeToggle";
import { AudioLevelMeter } from "./AudioLevelMeter";
import { LegalDialogs } from "./LegalDialogs";

interface AudioSettings {
  masterVolume: number;
  highFreq: number;
  lowFreq: number;
  balance: number;
  preset: string;
}

interface SavedProfile {
  name: string;
  settings: AudioSettings;
}

const AudioControl = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [settings, setSettings] = useLocalStorage<AudioSettings>('klangnah-settings', {
    masterVolume: 50,
    highFreq: 0,
    lowFreq: 0,
    balance: 0,
    preset: "normal"
  });
  const [savedProfiles, setSavedProfiles] = useLocalStorage<SavedProfile[]>('klangnah-profiles', []);
  const [showVolumeWarning, setShowVolumeWarning] = useState(false);
  const [profileName, setProfileName] = useState('');
  const { toast } = useToast();
  const { startAudioProcessing, stopAudioProcessing, updateSettings, audioLevels, isProcessing } = useAudioProcessor();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Volume warning check
  useEffect(() => {
    if (settings.masterVolume > 80) {
      setShowVolumeWarning(true);
    } else {
      setShowVolumeWarning(false);
    }
  }, [settings.masterVolume]);

  // Update audio processing when settings change
  useEffect(() => {
    if (isProcessing) {
      updateSettings(settings);
    }
  }, [settings, isProcessing, updateSettings]);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (newVolume > 85) {
      toast({
        title: "Warnung: Hohe Lautstärke",
        description: "Eine zu hohe Lautstärke kann zu Hörschäden führen.",
        variant: "destructive",
      });
    }
    setSettings(prev => ({ ...prev, masterVolume: newVolume }));
  };

  const handlePresetChange = (preset: string) => {
    const presets = {
      quiet: { highFreq: 10, lowFreq: -5, masterVolume: 40, balance: 0 },
      street: { highFreq: 15, lowFreq: 5, masterVolume: 70, balance: 0 },
      tv: { highFreq: 5, lowFreq: 0, masterVolume: 60, balance: 0 },
      normal: { highFreq: 0, lowFreq: 0, masterVolume: 50, balance: 0 }
    };
    
    const newSettings = presets[preset as keyof typeof presets];
    setSettings(prev => ({ ...prev, ...newSettings, preset }));
    
    toast({
      title: "Voreinstellung geladen",
      description: `${preset === 'quiet' ? 'Ruhige Umgebung' : 
                   preset === 'street' ? 'Straßenlärm' : 
                   preset === 'tv' ? 'TV/Fernsehen' : 'Normal'} aktiviert`,
    });
  };

  const saveProfile = () => {
    if (!profileName.trim()) {
      toast({
        title: "Name erforderlich",
        description: "Bitte geben Sie einen Namen für das Profil ein",
        variant: "destructive",
      });
      return;
    }

    const newProfile: SavedProfile = {
      name: profileName.trim(),
      settings: { ...settings }
    };

    setSavedProfiles(prev => {
      const updated = prev.filter(p => p.name !== newProfile.name);
      return [...updated, newProfile];
    });

    setProfileName('');
    toast({
      title: "Profil gespeichert",
      description: `Profil "${newProfile.name}" wurde erfolgreich gespeichert`,
    });
  };

  const loadProfile = (profile: SavedProfile) => {
    setSettings(profile.settings);
    toast({
      title: "Profil geladen",
      description: `Profil "${profile.name}" wurde geladen`,
    });
  };

  const deleteProfile = (profileName: string) => {
    setSavedProfiles(prev => prev.filter(p => p.name !== profileName));
    toast({
      title: "Profil gelöscht",
      description: `Profil "${profileName}" wurde gelöscht`,
    });
  };

  const toggleListening = async () => {
    if (!isProcessing) {
      const success = await startAudioProcessing();
      if (success) {
        toast({
          title: "Hörhilfe aktiviert",
          description: "Audioübertragung gestartet",
        });
      } else {
        toast({
          title: "Mikrofon-Zugriff verweigert",
          description: "Bitte erlauben Sie den Zugriff auf das Mikrofon",
          variant: "destructive",
        });
      }
    } else {
      stopAudioProcessing();
      toast({
        title: "Hörhilfe deaktiviert",
        description: "Audioübertragung gestoppt",
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header with time */}
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div></div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h1 className="text-3xl font-bold text-primary">Klangnah</h1>
              </div>
              <DarkModeToggle />
            </div>
            <div className="text-2xl font-mono font-bold text-foreground">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(currentTime)}
            </div>
          </CardContent>
        </Card>

        {/* Volume Warning */}
        {showVolumeWarning && (
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Achtung:</strong> Hohe Lautstärke kann zu Hörschäden führen. 
              Reduzieren Sie die Lautstärke falls nötig.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Hörhilfe Steuerung</span>
              <Badge variant={isProcessing ? "default" : "secondary"}>
                {isProcessing ? "Aktiv" : "Inaktiv"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Button
                onClick={toggleListening}
                size="lg"
                className={`h-20 w-20 rounded-full text-white font-bold ${
                  isProcessing 
                    ? "bg-destructive hover:bg-destructive/90" 
                    : "bg-success hover:bg-success/90"
                }`}
              >
                {isProcessing ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                {isProcessing ? "Tippen zum Stoppen" : "Tippen zum Starten"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Volume Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Lautstärke: {settings.masterVolume}%
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={[settings.masterVolume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-full"
            />
            
            {/* Balance Control */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Balance: {settings.balance === 0 ? 'Mitte' : settings.balance > 0 ? `${settings.balance}% Rechts` : `${Math.abs(settings.balance)}% Links`}
              </label>
              <Slider
                value={[settings.balance]}
                onValueChange={(value) => setSettings(prev => ({ ...prev, balance: value[0] }))}
                min={-100}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Links</span>
                <span>Mitte</span>
                <span>Rechts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equalizer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Equalizer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Hohe Töne: {settings.highFreq > 0 ? '+' : ''}{settings.highFreq} dB
              </label>
              <Slider
                value={[settings.highFreq]}
                onValueChange={(value) => setSettings(prev => ({ ...prev, highFreq: value[0] }))}
                min={-20}
                max={20}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Tiefe Töne: {settings.lowFreq > 0 ? '+' : ''}{settings.lowFreq} dB
              </label>
              <Slider
                value={[settings.lowFreq]}
                onValueChange={(value) => setSettings(prev => ({ ...prev, lowFreq: value[0] }))}
                min={-20}
                max={20}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Audio Level Meter */}
        <AudioLevelMeter levels={audioLevels} isActive={isProcessing} />

        {/* Presets */}
        <Card>
          <CardHeader>
            <CardTitle>Voreinstellungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={settings.preset === 'quiet' ? 'default' : 'outline'}
                onClick={() => handlePresetChange('quiet')}
                className="h-12"
              >
                Ruhige Umgebung
              </Button>
              <Button
                variant={settings.preset === 'street' ? 'default' : 'outline'}
                onClick={() => handlePresetChange('street')}
                className="h-12"
              >
                Straßenlärm
              </Button>
              <Button
                variant={settings.preset === 'tv' ? 'default' : 'outline'}
                onClick={() => handlePresetChange('tv')}
                className="h-12"
              >
                TV/Fernsehen
              </Button>
              <Button
                variant={settings.preset === 'normal' ? 'default' : 'outline'}
                onClick={() => handlePresetChange('normal')}
                className="h-12"
              >
                Normal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Profiles */}
        <Card>
          <CardHeader>
            <CardTitle>Persönliche Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Profil Name eingeben..."
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm"
                onKeyPress={(e) => e.key === 'Enter' && saveProfile()}
              />
              <Button onClick={saveProfile} size="sm" className="px-3">
                <Save className="h-4 w-4" />
              </Button>
            </div>
            
            {savedProfiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Gespeicherte Profile:</h4>
                {savedProfiles.map((profile) => (
                  <div key={profile.name} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <span className="text-sm">{profile.name}</span>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => loadProfile(profile)}
                        className="h-8 px-2"
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteProfile(profile.name)}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legal Information */}
        <LegalDialogs />
      </div>
    </div>
  );
};

export default AudioControl;