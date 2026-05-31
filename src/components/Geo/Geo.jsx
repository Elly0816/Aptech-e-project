import './Geo.css';

const Geo = ({ coordinates, address }) => {
  const mapPinCompassSvg = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mon-geo-compass-icon">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" />
    </svg>
  );

  return (
    <section className="mon-geo-section">
      <div className="mon-section-header">
        <h2 className="mon-section-title">Geographic Context</h2>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mon-open-maps-link"
        >
          OPEN IN MAPS
        </a>
      </div>

      <div className="mon-geo-map">
        <div className="mon-geo-map-pin">{mapPinCompassSvg}</div>
        <div className="mon-geo-coords-card">
          <span className="mon-geo-coords-text">
            <strong>
              {coordinates.latitude.toFixed(4)}° N, {coordinates.longitude.toFixed(4)}° E
            </strong>
          </span>
          <span className="mon-geo-coords-sep">|</span>
          <span className="mon-geo-coords-address">{address}</span>
        </div>
      </div>
    </section>
  );
};

export default Geo;
