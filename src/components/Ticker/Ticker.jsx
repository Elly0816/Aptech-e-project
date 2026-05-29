import { useEffect, useState } from 'react';
import './Ticker.css'; // Just use a single dot '.' because they are in the same folder
// A rich list of global cities grouped into batches of 3
const CITY_GROUPS = [
  [
    { name: 'LONDON', zone: 'Europe/London', label: 'GMT' },
    { name: 'CAIRO', zone: 'Africa/Cairo', label: 'EET' },
    { name: 'ROME', zone: 'Europe/Rome', label: 'CET' },
  ],
  [
    { name: 'LAGOS', zone: 'Africa/Lagos', label: 'WAT' },
    { name: 'NEW YORK', zone: 'America/New_York', label: 'EST' },
    { name: 'TOKYO', zone: 'Asia/Tokyo', label: 'JST' },
  ],
  [
    { name: 'PARIS', zone: 'Europe/Paris', label: 'CET' },
    { name: 'DUBAI', zone: 'Asia/Dubai', label: 'GST' },
    { name: 'SYDNEY', zone: 'Australia/Sydney', label: 'AEST' },
  ],
  [
    { name: 'N_DELHI', zone: 'Asia/Kolkata', label: 'IST' },
    { name: 'RIO', zone: 'America/Sao_Paulo', label: 'BRT' },
    { name: 'CAPE TOWN', zone: 'Africa/Johannesburg', label: 'SAST' },
  ],
];

const LiveTicker = () => {
  const [groupIndex, setGroupIndex] = useState(0);
  const [times, setTimes] = useState([]);
  const [visitors, setVisitors] = useState(12842);
  const [fade, setFade] = useState(true); // Handles smooth transition blending

  // Effect 1: Handle time calculation ticks every second
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const currentGroup = CITY_GROUPS[groupIndex];

      const formatted = currentGroup.map((city) => {
        try {
          const timeString = now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: city.zone,
          });
          return {
            name: city.name,
            time: timeString,
            label: city.label,
          };
        } catch (e) {
          console.error(`Error formatting timezone for ${city.name}:`, e); // Resolves "defined but never used" warning
          return { name: city.name, time: '12:00', label: city.label };
        }
      });

      setTimes(formatted);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [groupIndex]);

  // Effect 2: Cycle to the next country group every 7 seconds + visitor simulation
  useEffect(() => {
    const groupInterval = setInterval(() => {
      setFade(false); // Trigger fade-out animation

      setTimeout(() => {
        setGroupIndex((prevIndex) => (prevIndex + 1) % CITY_GROUPS.length);
        setFade(true); // Trigger fade-in with new data
      }, 500); // Wait for fade-out to finish before changing data
    }, 7000);

    // Organic visitor count simulation
    const visitorInterval = setInterval(() => {
      setVisitors((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.min(Math.max(prev + delta, 12500), 13200);
      });
    }, 4000);

    return () => {
      clearInterval(groupInterval);
      clearInterval(visitorInterval);
    };
  }, []);

  return (
    <div className="live-ticker-bar">
      <div className="ticker-wrapper">
        {/* Left Side: Dynamic Rotating Clocks Grid */}
        <div className={`ticker-time-section ${fade ? 'fade-in' : 'fade-out'}`}>
          {times && times.length > 0 ? (
            times.map((item, index) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="ticker-item">
                  <span className="location">{item.name}:</span>{' '}
                  <span className="time-val">
                    {item.time} {item.label}
                  </span>
                </div>
                {index < times.length - 1 && <span className="ticker-dot">•</span>}
              </div>
            ))
          ) : (
            <div className="ticker-item">
              <span className="location">LOADING GLOBAL CLOCKS...</span>
            </div>
          )}
        </div>

        {/* Right Side: Concurrent Counts Status Indicator */}
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
