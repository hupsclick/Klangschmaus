import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Headphones } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SafetyWarningProps {
  onAccept: () => void;
}

const SafetyWarning = ({ onAccept }: SafetyWarningProps) => {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary">
      <Card className="max-w-lg w-full shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-16 h-16 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary mb-2">
            Wichtiger Sicherheitshinweis
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert className="border-destructive/20 bg-destructive/5">
            <Headphones className="h-4 w-4" />
            <AlertDescription className="text-sm leading-relaxed">
              <strong>Kopfhörer erforderlich:</strong> Bitte schließen Sie Kopfhörer an, 
              bevor Sie die App verwenden. Ohne Kopfhörer kann es zu gefährlichen 
              Rückkopplungen kommen, die Ihr Gehör schädigen können.
            </AlertDescription>
          </Alert>

          <Alert className="border-accent/20 bg-accent/5">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm leading-relaxed">
              <strong>Medizinischer Hinweis:</strong> Diese App ist eine Hörhilfe und 
              kein Ersatz für medizinische Behandlung. Bei anhaltenden Hörproblemen 
              konsultieren Sie bitte einen HNO-Arzt.
            </AlertDescription>
          </Alert>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="acknowledge" 
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            <label htmlFor="acknowledge" className="text-sm text-muted-foreground">
              Ich habe die Sicherheitshinweise gelesen und verstanden
            </label>
          </div>

          <Button 
            onClick={onAccept}
            disabled={!acknowledged}
            className="w-full h-12 text-lg font-medium"
            size="lg"
          >
            App starten
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyWarning;