import { useState }          from "react";
import { ProfilesProvider, useProfiles } from "./context/ProfilesContext";
import { WelcomePage }       from "./pages/WelcomePage";
import { EditorPage }        from "./pages/EditorPage";
import { About }             from "./pages/About";

type View = "welcome" | "editor" | "about";

function CVApp() {
  const { activeProfileId, updateActiveCV, activeProfile } = useProfiles();
  const [view, setView] = useState<View>("welcome");

  const handleDocSelect = (template: "modern" | "classic") => {
    updateActiveCV({ template });
    setView("editor");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div>
        {view === "welcome" && <WelcomePage onDocSelect={handleDocSelect} />}
        {view === "editor"  && activeProfile && <EditorPage onBack={() => setView("welcome")} />}
        {view === "about"   && <About onBack={() => setView("welcome")} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProfilesProvider>
      <CVApp />
    </ProfilesProvider>
  );
}
