import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Overview } from './pages/Overview';
import { TunnelInventory } from './pages/TunnelInventory';
import { SATimeline } from './pages/SATimeline';
import { ThreatMatrix } from './pages/ThreatMatrix';
import { MetadataExposure } from './pages/MetadataExposure';
import { Reports } from './pages/Reports';
import { SystemArchitecture } from './pages/SystemArchitecture';
import { Settings } from './pages/Settings';
import { Policies } from './pages/Policies';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { TunnelDetailModal } from './components/TunnelDetailModal';
import { NewAssessmentModal } from './components/NewAssessmentModal';
import { GlossaryModal } from './components/GlossaryModal';
import { mockTunnels } from './data/mockData';
import { Tunnel } from './types';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [selectedTunnel, setSelectedTunnel] = useState<Tunnel | null>(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState<boolean>(false);

  // Full-screen pages check (Showcase Landing & Login)
  const isFullScreenPage = ['/login', '/landing', '/showcase'].includes(location.pathname);

  // Check URL query parameters (e.g. ?detail=tun-02)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const detailId = params.get('detail');
    if (detailId) {
      const found = mockTunnels.find(t => t.id === detailId);
      if (found) {
        setSelectedTunnel(found);
      }
    }
  }, [location.search]);

  const handleSelectTunnelById = (tunnelId: string) => {
    const found = mockTunnels.find(t => t.id === tunnelId);
    if (found) {
      setSelectedTunnel(found);
    }
  };

  if (isFullScreenPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/showcase" element={<Landing />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-navy-900 text-slate-100 overflow-hidden font-sans">
      {/* Fixed Left Sidebar */}
      <Sidebar onOpenGlossary={() => setIsGlossaryModalOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky Top Header */}
        <Header
          onOpenNewAssessment={() => setIsAssessmentModalOpen(true)}
          onOpenGlossary={() => setIsGlossaryModalOpen(true)}
        />

        {/* Scrollable Dashboard View */}
        <main className="flex-1 overflow-y-auto px-6 py-6 cyber-grid">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <Overview
                    onOpenTunnelDetail={handleSelectTunnelById}
                    onOpenNewAssessment={() => setIsAssessmentModalOpen(true)}
                  />
                }
              />
              <Route
                path="/overview"
                element={
                  <Overview
                    onOpenTunnelDetail={handleSelectTunnelById}
                    onOpenNewAssessment={() => setIsAssessmentModalOpen(true)}
                  />
                }
              />
              <Route
                path="/tunnels"
                element={<TunnelInventory onSelectTunnel={handleSelectTunnelById} />}
              />
              <Route path="/sa-timeline" element={<SATimeline />} />
              <Route path="/threat-matrix" element={<ThreatMatrix />} />
              <Route path="/metadata-exposure" element={<MetadataExposure />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/architecture" element={<SystemArchitecture />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>

        {/* Global Footer */}
        <footer className="h-8 bg-navy-950/80 border-t border-navy-800 px-6 flex items-center justify-between text-[11px] text-slate-500 font-mono select-none">
          <div className="flex items-center space-x-3">
            <span>VAJRANET AI • SOVEREIGN IPSEC SECURITY FRAMEWORK</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-500/90 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>100% Zero-Decryption</span>
            </span>
          </div>
          <div>
            Authorized Defensive Analysis Only • Synthetic Demo Data (SIH 2026)
          </div>
        </footer>
      </div>

      {/* Modals */}
      <TunnelDetailModal
        tunnel={selectedTunnel}
        onClose={() => setSelectedTunnel(null)}
      />

      <NewAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
      />

      <GlossaryModal
        isOpen={isGlossaryModalOpen}
        onClose={() => setIsGlossaryModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
