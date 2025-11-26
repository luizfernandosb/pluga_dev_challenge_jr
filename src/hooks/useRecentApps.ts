import { useState, useEffect } from 'react';
import { App } from '@/types/app';

const RECENT_APPS_KEY = import.meta.env.VITE_RECENT_APPS_KEY;
const MAX_RECENT_APPS = import.meta.env.VITE_MAX_RECENT_APPS;

export const useRecentApps = () => {
  const [recentApps, setRecentApps] = useState<App[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_APPS_KEY);
    if (stored) {
      try {
        setRecentApps(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recent apps:', e);
      }
    }
  }, []);

  const addRecentApp = (app: App) => {
    setRecentApps((prev) => {
      const filtered = prev.filter((a) => a.app_id !== app.app_id);
      const updated = [app, ...filtered].slice(0, MAX_RECENT_APPS);
      localStorage.setItem(RECENT_APPS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { recentApps, addRecentApp };
};
