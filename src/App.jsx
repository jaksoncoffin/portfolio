import { useState, useEffect } from 'react';
import StarFieldBackground from './components/StarFieldBackground';
import StarFieldLoader from './components/StarFieldLoader';
import ConstellationNavigation from './components/ConstellationNavigation';
import PortfolioContent from './components/PortfolioContent';
import TopNavBar from './components/TopNavBar';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [welcomeFormed, setWelcomeFormed] = useState(false);
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [blackHoleActive, setBlackHoleActive] = useState(false);
  const [transition, setTransition] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showGalaxy, setShowGalaxy] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (loading) {
      const startWelcomeTimer = setTimeout(() => setWelcomeFormed(true), 500);
      const welcomeCompleteTimer = setTimeout(() => setWelcomeComplete(true), 1700);
      const blackHoleTimer = setTimeout(() => setBlackHoleActive(true), 3000);
      const transitionTimer = setTimeout(() => setTransition(true), 5500);
      const mainContentTimer = setTimeout(() => {
        setLoading(false);
        setShowMainContent(true);
      }, 6500);

      return () => {
        clearTimeout(startWelcomeTimer);
        clearTimeout(welcomeCompleteTimer);
        clearTimeout(blackHoleTimer);
        clearTimeout(transitionTimer);
        clearTimeout(mainContentTimer);
      };
    }
  }, [loading]);

  useEffect(() => {
    if (showMainContent) {
      const galaxyTimer = setTimeout(() => setShowGalaxy(true));
      return () => clearTimeout(galaxyTimer);
    }
  }, [showMainContent]);

  const handleSectionSelect = id => setActiveSection(id);
  const handleCloseSection = () => setActiveSection(null);

  return (
    <div className="app-container">
      {loading && (
        <div className="loader-container">
          <StarFieldBackground showGalaxy={false} />
          <StarFieldLoader
            welcomeFormed={welcomeFormed}
            welcomeComplete={welcomeComplete}
            blackHoleActive={blackHoleActive}
            transition={transition}
          />
        </div>
      )}
      {!loading && (
        <div className="main-content">
          <StarFieldBackground showGalaxy={showGalaxy} />
          {!showWelcome && (
            <TopNavBar
              onSelect={handleSectionSelect}
              activeSection={activeSection}
            />
          )}
          <ConstellationNavigation
            onSectionSelect={handleSectionSelect}
            activeSection={activeSection}
          />
          <PortfolioContent
            activeSection={activeSection}
            onClose={handleCloseSection}
            showWelcome={showWelcome}
            setShowWelcome={setShowWelcome}
          />
        </div>
      )}
    </div>
  );
}

export default App;
