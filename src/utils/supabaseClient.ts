import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tydulzuulginmmqtchog.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZHVsenV1bGdpbm1tcXRjaG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4MjM5MzMsImV4cCI6MjA1NDM5OTkzM30.CdAlLtYw1UCzMPfSdSSCEvftXSJeztaFdA4AdaMB550';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Amazing Daily Planner';

// Initialize the Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'x-application-name': siteName
    }
  }
});

// Log URL and name for debugging
if (typeof window !== 'undefined') {
  console.log('Site URL:', window.location.origin);
  console.log('Site Name:', siteName);
}