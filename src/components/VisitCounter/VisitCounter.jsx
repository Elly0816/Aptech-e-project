import './VisitCounter.css';
import { useVisit } from '../../context/VisitCountContext';

export const VisitCounter = () => {
  const { visits } = useVisit();

  return (
    <div className="ticker-status-section">
      <span className="live-pulse-dot"></span>
      <span className="status-label">TIMES VISITED:</span>
      <span className="status-count">{visits.toLocaleString()}</span>
    </div>
  );
};
