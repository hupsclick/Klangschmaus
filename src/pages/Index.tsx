import { useState } from "react";
import SafetyWarning from "@/components/SafetyWarning";
import AudioControl from "@/components/AudioControl";

const Index = () => {
  const [hasAcceptedWarning, setHasAcceptedWarning] = useState(false);

  if (!hasAcceptedWarning) {
    return <SafetyWarning onAccept={() => setHasAcceptedWarning(true)} />;
  }

  return <AudioControl />;
};

export default Index;
