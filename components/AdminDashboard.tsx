
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminDashboard: React.FC = () => {
  const { settings, updateSettings, setView } = useAdmin();
  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await updateSettings(localSettings);
    setIsSaving(false);
    alert('Settings synced with Supabase successfully!');
    setView('home');
  };

  const updateImageUrl = (index: number, url: string) => {
    const newImages = [...localSettings.images];
    newImages[index] = url;
    setLocalSettings({ ...localSettings, images: newImages });
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-stone-900 font-serif">Admin Dashboard</h1>
            <p className="text-stone-500">Changes here will reflect for ALL users via Supabase</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setView('home')}
              className="px-6 py-3 bg-white text-stone-600 font-bold rounded-xl border border-stone-200 hover:bg-stone-100 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 py-3 text-white font-bold rounded-xl shadow-lg transition-all flex items-center ${
                isSaving ? 'bg-stone-400 cursor-not-allowed' : 'bg-stone-900 hover:bg-stone-800'
              }`}
            >
              {isSaving && <i className="fa-solid fa-spinner fa-spin mr-2"></i>}
              {isSaving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Section: Subscription & Redirects */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-stone-800">
                <i className="fa-solid fa-tags mr-3 text-rose-500"></i> Subscription Prices
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-widest">Free Trial Price ($)</label>
                  <input 
                    type="text" 
                    value={localSettings.prices.trial}
                    onChange={(e) => setLocalSettings({...localSettings, prices: {...localSettings.prices, trial: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 px-5 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-widest">Weekly Price ($)</label>
                  <input 
                    type="text" 
                    value={localSettings.prices.weekly}
                    onChange={(e) => setLocalSettings({...localSettings, prices: {...localSettings.prices, weekly: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 px-5 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-widest">Monthly Price ($)</label>
                  <input 
                    type="text" 
                    value={localSettings.prices.monthly}
                    onChange={(e) => setLocalSettings({...localSettings, prices: {...localSettings.prices, monthly: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 px-5 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-stone-800">
                <i className="fa-solid fa-share-from-square mr-3 text-rose-500"></i> Redirect URLs
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-widest">Trial Redirect URL</label>
                  <input 
                    type="url" 
                    value={localSettings.redirectUrls.trial}
                    onChange={(e) => setLocalSettings({...localSettings, redirectUrls: {...localSettings.redirectUrls, trial: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 px-5 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-widest">Premium Redirect URL</label>
                  <input 
                    type="url" 
                    value={localSettings.redirectUrls.premium}
                    onChange={(e) => setLocalSettings({...localSettings, redirectUrls: {...localSettings.redirectUrls, premium: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 px-5 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Gallery Images */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-stone-800">
              <i className="fa-solid fa-images mr-3 text-rose-500"></i> Gallery Images (URLs)
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {localSettings.images.map((url, i) => (
                <div key={i} className="flex flex-col space-y-2 pb-4 border-b border-stone-50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Image {i + 1}</span>
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-stone-200">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <input 
                    type="text" 
                    value={url}
                    onChange={(e) => updateImageUrl(i, e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 px-4 py-2 text-sm rounded-lg focus:ring-1 focus:ring-rose-500 outline-none"
                    placeholder="Enter image URL"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
