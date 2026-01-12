
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import SubscriptionPlans from './components/SubscriptionPlans';
import VideoCallModal from './components/VideoCallModal';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { AdminProvider, useAdmin } from './context/AdminContext';

const MainContent: React.FC = () => {
  const { view, isLoading } = useAdmin();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleOpenCall = (planName: string) => {
    setSelectedPlan(planName);
    setIsVideoModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mb-4"></div>
        <p className="text-stone-500 font-serif italic">Loading your profile...</p>
      </div>
    );
  }

  if (view === 'login') return <AdminLogin />;
  if (view === 'admin') return <AdminDashboard />;

  return (
    <div className="min-h-screen flex flex-col selection:bg-rose-200">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <div id="subscriptions" className="py-20 bg-stone-50 border-b border-stone-100">
          <SubscriptionPlans onSelectPlan={handleOpenCall} />
        </div>

        <div id="gallery" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 font-serif">A Glimpse into My Life</h2>
              <p className="text-stone-500 max-w-2xl mx-auto text-lg">Authentic moments shared only with you.</p>
            </div>
            <PhotoGallery />
          </div>
        </div>
      </main>

      <Footer />

      {isVideoModalOpen && (
        <VideoCallModal 
          isOpen={isVideoModalOpen} 
          onClose={() => setIsVideoModalOpen(false)} 
          planName={selectedPlan || 'Trial'}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <MainContent />
    </AdminProvider>
  );
};

export default App;
