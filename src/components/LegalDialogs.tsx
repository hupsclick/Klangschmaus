import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const LegalDialogs = () => {
  return (
    <div className="flex gap-3">
      {/* Impressum Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-1 h-12">
            Impressum
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Impressum</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-base mb-2">Angaben gemäß § 5 TMG</h3>
                <p>
                  Manfred Häcker<br />
                  Feldstraße 6<br />
                  17153 Stavenhagen<br />
                  Deutschland
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-base mb-2">Kontakt</h3>
                <p>
                  <br />
                  E-Mail: regiemail@gmx.de
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">Haftungsausschluss</h3>
                <p>
                  <strong>Medizinischer Hinweis:</strong><br />
                  Diese App ist eine Hörhilfe und kein medizinisches Gerät. Sie ersetzt keine professionelle medizinische Beratung, Diagnose oder Behandlung. Bei Hörproblemen konsultieren Sie bitte einen HNO-Arzt oder Audiologen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Datenschutz Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-1 h-12">
            Datenschutz
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Datenschutzerklärung</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-base mb-2">1. Datenschutz auf einen Blick</h3>
                <p>
                  Diese App "Klangnah" verarbeitet Audiodaten nur lokal auf Ihrem Gerät. Es werden keine Audiodaten an Server übertragen oder gespeichert.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">2. Erhobene Daten</h3>
                <p><strong>Audiodaten:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Mikrofonaufnahmen werden nur zur Echtzeit-Übertragung verwendet</li>
                  <li>Keine Speicherung von Audiodaten</li>
                  <li>Keine Übertragung an externe Server</li>
                  <li>Verarbeitung erfolgt ausschließlich lokal auf Ihrem Gerät</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">3. Gespeicherte Einstellungen</h3>
                <p><strong>Lokale Speicherung:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Lautstärke-Einstellungen</li>
                  <li>Equalizer-Einstellungen (Hohe/Tiefe Töne)</li>
                  <li>Balance-Einstellungen (Links/Rechts)</li>
                  <li>Gespeicherte persönliche Profile</li>
                  <li>Dark/Light Mode Präferenz</li>
                </ul>
                <p className="mt-2">
                  Diese Daten werden nur in Ihrem Browser gespeichert (localStorage) und nie an externe Server übertragen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">4. Verwendung von Google Fonts</h3>
                <p>
                  Diese App verwendet keine Google Fonts. Alle Schriftarten sind lokal verfügbar oder werden vom System bereitgestellt.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">5. Berechtigungen</h3>
                <p><strong>Mikrofon-Zugriff:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Erforderlich für die Hörhilfe-Funktion</li>
                  <li>Nur aktiv wenn die Hörhilfe eingeschaltet ist</li>
                  <li>Kann jederzeit durch den Nutzer beendet werden</li>
                  <li>Keine Aufzeichnung oder Speicherung</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">6. Ihre Rechte</h3>
                <p>
                  Da keine personenbezogenen Daten gespeichert oder übertragen werden, entfallen die meisten datenschutzrechtlichen Anfragen. Sie können jederzeit:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Die Mikrofon-Berechtigung entziehen</li>
                  <li>Ihre lokalen Einstellungen löschen (Browser-Cache leeren)</li>
                  <li>Die App deinstallieren</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">7. Medizinischer Haftungsausschluss</h3>
                <p className="text-destructive font-medium">
                  <strong>WICHTIGER HINWEIS:</strong> Diese App ist eine Hörhilfe und kein medizinisches Gerät. Sie ersetzt keine professionelle medizinische Beratung, Diagnose oder Behandlung. Bei anhaltenden Hörproblemen oder Mittelohrentzündungen konsultieren Sie unbedingt einen HNO-Facharzt.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">8. Kontakt</h3>
                <p>
                  Bei Fragen zum Datenschutz kontaktieren Sie uns unter:<br />
                  E-Mail: regiemail@gmx.de
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};