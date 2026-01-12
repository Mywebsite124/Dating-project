
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Your Supabase credentials
const supabaseUrl = 'https://ctsrjxhzolikvkrzfdpp.supabase.co';
const supabaseAnonKey = 'sb_publishable_33K56t9UChx6ysbkUZ_bpg_P0MFNx7T';

// Helper to check if URL is valid
const isValidUrl = (url: string) => {
  try {
    return url.startsWith('https://') || url.startsWith('http://');
  } catch {
    return false;
  }
};

// Create client only if URL is valid, otherwise return null
// Fix: Assert supabaseAnonKey as string to prevent TypeScript from complaining about non-overlapping literal types in the placeholder check
export const supabase = isValidUrl(supabaseUrl) && (supabaseAnonKey as string) !== 'YOUR_SUPABASE_ANON_KEY'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn('Supabase is not configured correctly. Check your URL and Key.');
}
