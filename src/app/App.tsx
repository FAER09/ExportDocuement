import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Dashboard } from './components/Dashboard';
import { ProfileForm } from './components/ProfileForm';
import { ProfileSelector } from './components/ProfileSelector';
import { TopBar } from './components/layout/TopBar';
import { AboutPage } from './pages/AboutPage';
import { EditorPage } from './pages/EditorPage';
import { useProfileStore } from './store/profile-store';

type View = 'welcome' | 'editor' | 'about';
type Template = 'modern' | 'classic';

export default function App() {
  const profiles = useProfileStore((state) => state.profiles);
  const selectedProfileId = useProfileStore((state) => state.selectedProfileId);
  const showForm = useProfileStore((state) => state.showForm);
  const selectedProfile = profiles.find((profile) => profile.id === selectedProfileId) ?? null;

  const [view, setView] = useState<View>('welcome');
  const [template, setTemplate] = useState<Template>('modern');

  useEffect(() => {
    if (!selectedProfileId) {
      setView('welcome');
    }
  }, [selectedProfileId]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {selectedProfile && !showForm && <TopBar onAbout={() => setView('about')} />}

      <div className={selectedProfile && !showForm ? 'pt-14' : ''}>
        {!selectedProfile && !showForm && <ProfileSelector />}
        {showForm && <ProfileForm />}

        {selectedProfile && !showForm && view === 'welcome' && (
          <Dashboard profile={selectedProfile} onSelectDocument={(nextTemplate) => {
            setTemplate(nextTemplate);
            setView('editor');
          }} />
        )}

        {selectedProfile && !showForm && view === 'editor' && (
          <EditorPage
            profile={selectedProfile}
            template={template}
            onTemplateChange={setTemplate}
            onBack={() => setView('welcome')}
          />
        )}

        {selectedProfile && !showForm && view === 'about' && (
          <AboutPage onBack={() => setView('welcome')} />
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}
