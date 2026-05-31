import { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ id, name, country, city, images, shortDescription, isWorldWonder }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    try {
      const saved = JSON.parse(localStorage.getItem('savedMonuments') || '[]');
      setIsSaved(saved.includes(id.toString()) || saved.includes(Number(id)));
    } catch {
      setIsSaved(false);
    }
  }, [id]);

  const handleSave = () => {
    if (!id) return;
    try {
      const saved = JSON.parse(localStorage.getItem('savedMonuments') || '[]');
      let newSaved;
      if (isSaved) {
        newSaved = saved.filter((x) => x.toString() !== id.toString() && Number(x) !== Number(id));
      } else {
        newSaved = [...saved, id.toString()];
      }
      localStorage.setItem('savedMonuments', JSON.stringify(newSaved));
      setIsSaved(!isSaved);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="mon-hero"
      style={{ backgroundImage: `url(${images[0]})` }}
    >
      {/* Gradient overlay */}
      <div className="mon-hero__overlay" />

      {/* Bottom-aligned content card */}
      <div className="mon-hero__content">
        <div className="mon-hero__mobile-label">
          {isWorldWonder ? 'Iconic Monument' : 'Historical Landmark'}
        </div>

        <div className="mon-hero__badges">
          {isWorldWonder && (
            <span className="mon-hero__badge mon-hero__badge--unesco">
              UNESCO World Heritage
            </span>
          )}
          <span className="mon-hero__badge mon-hero__badge--location">
            {country}{city ? `, ${city}` : ''}
          </span>
        </div>

        <h1 className="mon-hero__title">{name}</h1>
        <p className="mon-hero__subtitle">{shortDescription}</p>

        <div className="mon-hero__location-mobile">
          <span className="mon-hero__pin-icon">📍</span>
          <span className="mon-hero__location-text">{city}, {country}</span>
        </div>

        <button
          className={`mon-hero__save-btn ${isSaved ? 'is-saved' : ''}`}
          onClick={handleSave}
        >
          {isSaved ? 'Saved to Collection' : 'Save to Collection'}
        </button>
      </div>
    </div>
  );
};

export default Hero;
