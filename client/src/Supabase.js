import { createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ugcmvtrmagwvtywyijbc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnY212dHJtYWd3dnR5d3lpamJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwMzk3MjQsImV4cCI6MjAxMzYxNTcyNH0.Mq28_3426TTuyOJZVweiSOg-rSvwtvZLXrqGUHq5Afk'
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const SupabaseContext = createContext(supabase);

export function useSupabase() {
  return useContext(SupabaseContext);
}
