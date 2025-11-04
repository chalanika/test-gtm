import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { About } from "./components/About";
import { ConsentBanner } from "./components/ConsentBanner";
import { Contact } from "./components/Contact";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";

declare global {
  interface Window {
    gtag: (command: string, action: string, parameters: unknown) => void;
  }
}

function App() {
  const [showConsentBanner, setShowConsentBanner] = useState(true);

  // Check if consent has already been given
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const consentCookie = getCookie("CookieConsent");
    if (consentCookie) {
      try {
        const consent = JSON.parse(consentCookie);
        // Hide banner if all required consents are true
        if (consent.necessary && consent.statistics && consent.marketing) {
          setShowConsentBanner(false);
        }
      } catch (error) {
        console.error("Error parsing consent cookie:", error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const consentValue = JSON.stringify({
      necessary: true,
      statistics: true,
      marketing: true,
    });
    document.cookie = "CookieConsent=" + consentValue;
    setShowConsentBanner(false); // Hide banner after accepting
  };

  const handleRejectAll = () => {
    const consentValue = JSON.stringify({
      necessary: true, // Necessary cookies are always required
      statistics: false,
      marketing: false,
    });
    document.cookie = "CookieConsent=" + consentValue;
    setShowConsentBanner(false); // Hide banner after rejecting
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        {showConsentBanner && (
          <ConsentBanner
            onAcceptAll={handleAcceptAll}
            onRejectAll={handleRejectAll}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
