import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface AudioLevelMeterProps {
  levels: number[];
  isActive: boolean;
}

export const AudioLevelMeter = ({ levels, isActive }: AudioLevelMeterProps) => {
  const bandLabels = ['60Hz', '170Hz', '310Hz', '600Hz', '1kHz', '3kHz', '6kHz', '12kHz'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Grafischer Equalizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-1 h-32">
          {bandLabels.map((label, index) => {
            const level = levels[index] || 0;
            const height = Math.max(4, level * 120); // Minimum 4px height
            const isLoud = level > 0.7;
            const isMedium = level > 0.4;
            
            return (
              <div key={label} className="flex flex-col items-center flex-1">
                <div className="flex-1 flex items-end">
                  <div
                    className={`w-full transition-all duration-75 rounded-t ${
                      !isActive 
                        ? 'bg-muted' 
                        : isLoud 
                          ? 'bg-destructive' 
                          : isMedium 
                            ? 'bg-warning' 
                            : 'bg-success'
                    }`}
                    style={{ height: `${height}px` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-1 transform -rotate-45 origin-center">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-center">
          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-warning rounded"></div>
              <span>Laut</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-destructive rounded"></div>
              <span>Zu laut</span>
            </div>
          </div>
          {!isActive && (
            <p className="text-sm text-muted-foreground mt-2">
              Starten Sie die Hörhilfe um Audio-Pegel zu sehen
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};