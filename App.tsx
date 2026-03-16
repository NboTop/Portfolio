import React, { useState } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Stack from './components/Stack';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConnectButton from './components/ConnectButton';
import ContactPage from './components/ContactPage';
import LoadingScreen from './components/LoadingScreen';

type ViewState = 'home' | 'contact';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigate = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setCurrentView(view);
  };

  // --- CONTACT VIEW ---
  if (currentView === 'contact') {
    return <ContactPage onBack={() => handleNavigate('home')} />;
  }

  // --- MAIN VIEW ---
  return (
    <div className="relative min-h-screen bg-brutal-bg text-brutal-text font-mono selection:bg-magenta selection:text-black">
      
      {/* Loading Overlay - Rendered on top of everything initially */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <Navbar onNavigate={handleNavigate} />
      
      <main className="flex flex-col border-l border-r border-zinc-900 max-w-[1400px] mx-auto bg-brutal-bg shadow-2xl">
        <Hero />
        <About />
        <Projects />
        <Stack />
      </main>
      
      <div className="max-w-[1400px] mx-auto">
        <Footer />
      </div>
      
      {/* THE CONNECT BUTTON */}
      <ConnectButton onNavigate={() => handleNavigate('contact')} />
    </div>
  );
};

export default App;