
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

interface AppSettings {
  images: string[];
  prices: { trial: string; weekly: string; monthly: string };
  redirectUrls: { trial: string; premium: string };
}

interface AdminContextType {
  settings: AppSettings;
  updateSettings: (newSettings: AppSettings) => Promise<void>;
  view: 'home' | 'login' | 'admin';
  setView: (view: 'home' | 'login' | 'admin') => void;
  isLoading: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  images: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/seed/${i + 150}/600/800`),
  prices: { trial: "0", weekly: "20", monthly: "100" },
  redirectUrls: { 
    trial: "https://example.com/trial-redirect", 
    premium: "https://example.com/subscribe-redirect" 
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [view, setView] = useState<'home' | 'login' | 'admin'>('home');
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from Supabase on mount
  useEffect(() => {
    const fetchSettings = async () => {
      // If supabase isn't configured, just use default settings
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('data')
          .eq('id', 1)
          .single();

        if (error) {
          console.warn('Could not fetch from Supabase (maybe table is missing?):', error.message);
        } else if (data) {
          setSettings(data.data as AppSettings);
        }
      } catch (err) {
        console.error('Error fetching settings from Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: AppSettings) => {
    if (!supabase) {
      alert('Supabase is not configured in services/supabase.ts. Changes cannot be saved to the database.');
      setSettings(newSettings);
      return;
    }

    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ data: newSettings })
        .eq('id', 1);

      if (error) throw error;
      setSettings(newSettings);
    } catch (err) {
      console.error('Error updating settings in Supabase:', err);
      alert('Failed to save settings. Check your Supabase configuration and Table/RLS policies.');
    }
  };

  return (
    <AdminContext.Provider value={{ settings, updateSettings, view, setView, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
