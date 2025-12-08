import { useState, useEffect } from 'react';
import { fetchDayRoutes, formatDuration } from '../utils/routeUtils';

/**
 * Custom hook for fetching and managing routes for a day's activities
 */
export function useRoutes(activities, dayId) {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalStats, setTotalStats] = useState({ miles: 0, time: 0, formatted: '' });
  
  useEffect(() => {
    if (!activities || activities.length < 2) {
      setRoutes([]);
      setTotalStats({ miles: 0, time: 0, formatted: '' });
      return;
    }
    
    const fetchRoutes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const routeData = await fetchDayRoutes(activities);
        setRoutes(routeData);
        
        // Calculate totals
        const totalMiles = routeData.reduce((sum, r) => sum + parseFloat(r.distanceMiles), 0);
        const totalSeconds = routeData.reduce((sum, r) => sum + r.duration, 0);
        
        setTotalStats({
          miles: totalMiles.toFixed(1),
          time: Math.round(totalSeconds / 60),
          formatted: formatDuration(totalSeconds),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoutes();
  }, [activities, dayId]);
  
  return { routes, loading, error, totalStats };
}
