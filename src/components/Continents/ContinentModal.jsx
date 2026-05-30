import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import monuments from '../../data/monuments.json';
import GalleryCard from '../GalleryCard/GalleryCard';
import './Continent.css';

export const ContinentModal = ({ open, onClose, continentName }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const items = monuments.filter((m) => (m.continent || '').toLowerCase() === (continentName || '').toLowerCase());

  return (
    <div className="continent-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="continent-modal" onClick={(e) => e.stopPropagation()}>
        <div className="continent-modal-header">
          <h3>{continentName}</h3>
          <div>
            <button className="continent-modal-close" aria-label="Close" onClick={onClose}>
              ×
            </button>
          </div>
        </div>

        <p className="continent-modal-intro">Explore notable monuments from {continentName}.</p>

        <div className="continent-modal-grid">
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} onOpen={() => navigate(`/monument/${item.id}`)} />
          ))}
        </div>

        <div className="continent-modal-footer">
          <button
            className="text-link-btn"
            onClick={() =>
              navigate(`/gallery?filter=${encodeURIComponent((continentName || '').replace(/\s+/g, '+'))}`)
            }
          >
            View full gallery for {continentName} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinentModal;
