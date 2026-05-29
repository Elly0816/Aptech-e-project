import { useState, useEffect } from 'react';
import './thicker.css';

const LiveTicker = () => {
  const [times, setTimes] = useState({ london: '', cairo: '', rome: '' });
  const [visitors, setVisitors] = useState(12842); // Seed match value from your image

  useEffect(() => {
    const updateTimeZones = () => {
      const now = new Date();

      // Explicit target formatting for regional time standards
      const formatOptions = (timeZone, timeZoneName) => ({
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone,
        timeZoneName,
      });

      const lonString = now.toLocaleTimeString('en-GB', formatOptions('Europe/London', 'short'));
      const caiString = now.toLocaleTimeString('en-GB', formatOptions('Africa/Cairo', 'short'));
      const romString = now.toLocaleTimeString('en-GB', formatOptions('Europe/Rome', 'short'));

      setTimes({
        london: lonString.replace('BST', 'GMT'), // Normalize daylight labels to standard baseline
        cairo: caiString,
        rome: romString,
      });
    };

    // Initialize clock values immediately on mount
    updateTimeZones();
    const clockInterval = setInterval(updateTimeZones, 60000);

    // Minor random counter shifts for dynamic visitor simulation
    const visitorInterval = setInterval(() => {
      setVisitors((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // Modulate shifts up/down slightly
        return Math.min(Math.max(prev + delta, 12500), 13200);
      });
    }, 4000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(visitorInterval);
    };
  }, []);

  return (
    <div className="live-ticker-bar">
      <div className="ticker-wrapper">
        
        {/* Left Side Clocks Grid */}
        <div className="ticker-time-section">
          <div className="ticker-item">
            <span className="location">LONDON:</span> <span className="time-val">{times.london}</span>
          </div>
          <span className="ticker-dot">•</span>
          
          <div className="ticker-item">
            <span className="location">CAIRO:</span> <span className="time-val">{times.cairo}</span>
          </div>
          <span className="ticker-dot">•</span>
          
          <div className="ticker-item">
            <span className="location">ROME:</span> <span className="time-val">{times.rome}</span>
          </div>
        </div>

        {/* Right Side Concurrent Counts Status Indicator */}
        <div className="ticker-status-section">
          <span className="live-pulse-dot"></span>
          <span className="status-label">GLOBAL EXPLORERS ONLINE:</span>
          <span className="status-count">{visitors.toLocaleString()}</span>
        </div>

      </div>
    </div>
  );
};

export default LiveTicker;