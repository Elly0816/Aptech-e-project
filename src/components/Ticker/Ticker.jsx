import { useEffect, useState } from 'react';
import './Ticker.css';
import { VisitCounter } from '../VisitCounter/VisitCounter';
import { useDimensions } from '../../hooks/useDimensions';

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
  const [fade, setFade] = useState(true);
  const { isMobile } = useDimensions();

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

  // Effect 2: Cycle to the next country group every 7 seconds
  useEffect(() => {
    const groupInterval = setInterval(() => {
      setFade(false); // Trigger fade-out animation

      setTimeout(() => {
        setGroupIndex((prevIndex) => (prevIndex + 1) % CITY_GROUPS.length);
        setFade(true); // Trigger fade-in with new data
      }, 500); // Wait for fade-out to finish before changing data
    }, 7000);

    return () => {
      clearInterval(groupInterval);
    };
  }, []);

  return (
    <div className="live-ticker-bar">
      <div className={`ticker-wrapper ${isMobile ? 'ticker-wrapper-mobile' : ''}`}>
        {/* Left Side: Dynamic Rotating Clocks Grid */}
        <div
          className={`ticker-time-section ${fade ? 'fade-in' : 'fade-out'}`}
          style={{
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'flex-start' : 'center',
          }}
        >
          {times && times.length > 0 ? (
            times.map((item, index) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: isMobile ? '1px' : '11px',
                }}
              >
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
        <VisitCounter />
      </div>
    </div>
  );
};

export default LiveTicker;
