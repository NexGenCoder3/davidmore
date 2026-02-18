import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { AnalyticsEvent } from '@/types';

const STORAGE_KEY = 'dm_analytics_events';

function getEvents(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveEvent(event: AnalyticsEvent) {
  const events = getEvents();
  events.push(event);
  // Keep last 500 events
  if (events.length > 500) events.splice(0, events.length - 500);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    saveEvent({
      page: location.pathname,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    });
  }, [location.pathname]);
}

// Analytics data getters for the admin dashboard
export function getAnalyticsData() {
  const events = getEvents();
  const now = Date.now();
  const dayMs = 86400000;

  // Total views
  const totalViews = events.length;

  // Unique visitors (rough estimate via userAgent hash)
  const uniqueAgents = new Set(events.map(e => e.userAgent)).size;

  // Page breakdown
  const pageCounts: Record<string, number> = {};
  events.forEach(e => {
    pageCounts[e.page] = (pageCounts[e.page] || 0) + 1;
  });

  // Traffic over last 7 days
  const dailyTraffic: Array<{ date: string; views: number }> = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = now - i * dayMs;
    const dayEnd = dayStart + dayMs;
    const dateStr = new Date(dayStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const views = events.filter(e => e.timestamp >= dayStart && e.timestamp < dayEnd).length;
    dailyTraffic.push({ date: dateStr, views });
  }

  // Browser breakdown
  const browsers: Record<string, number> = {};
  events.forEach(e => {
    const ua = e.userAgent.toLowerCase();
    let browser = 'Other';
    if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
    else if (ua.includes('firefox')) browser = 'Firefox';
    else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
    else if (ua.includes('edg')) browser = 'Edge';
    browsers[browser] = (browsers[browser] || 0) + 1;
  });

  // Bounce rate (visits with only 1 page view in a "session" — simplified)
  const bounceRate = totalViews > 0 ? Math.round((Object.values(pageCounts).filter(c => c === 1).length / Object.keys(pageCounts).length) * 100) : 0;

  return { totalViews, uniqueVisitors: uniqueAgents, pageCounts, dailyTraffic, browsers, bounceRate };
}
