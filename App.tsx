import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from './components/ThemeContext';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
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
  const { toggleTheme } = useTheme();

  const handleNavigate = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setCurrentView(view);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 't':
          toggleTheme();
          break;
        case 'h':
        case 'escape':
          handleNavigate('home');
          break;
        case 'c':
          handleNavigate('contact');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  // --- CONTACT VIEW ---
  if (currentView === 'contact') {
    return (
      <>
        <Helmet>
          <title>Contact | Neel - Software Engineer</title>
          <meta name="description" content="Get in touch with Neel, a full-stack engineer and AI/ML builder." />
          <link rel="alternate" type="application/rss+xml" title="Neel Portfolio Updates" href="/rss.xml" />
        </Helmet>
        <ContactPage onBack={() => handleNavigate('home')} />
      </>
    );
  }

  // --- MAIN VIEW ---
  return (
    <div className="relative min-h-screen bg-brutal-bg text-brutal-text font-mono selection:bg-accent selection:text-brutal-bg">
      <Helmet>
        <title>Neel | Full-Stack Engineer & AI Builder</title>
        <meta name="description" content="Portfolio of Neel, a Computer Engineering student specializing in full-stack engineering and AI/ML models." />
        <link rel="alternate" type="application/rss+xml" title="Neel Portfolio Updates" href="/rss.xml" />
      </Helmet>
      
      {/* Loading Overlay - Rendered on top of everything initially */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      
      <Navbar onNavigate={handleNavigate} />
      
      <main className="flex flex-col border-l border-r border-white/5 max-w-[1400px] mx-auto bg-brutal-bg">
        <Hero />
        <About />
        <ProjectsSection />
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
