import { NavLink } from 'react-router';
import './Card.css';

export const Card = ({ id = '', name, country, city, images = [] }) => {
  const img = images?.[0] ?? images?.[3] ?? '';

  return (
    <article className="card">
      <div className="card-media">{img ? <img src={img} alt={name} /> : <div className="card-placeholder" />}</div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-code">{id}</span>
        </div>

        <h3 className="card-title">{name}</h3>

        <div className="card-location">
          📍 {city}, {country}
        </div>

        <div className="card-cta">
          <NavLink to={`/monument/${id}`} style={{ textDecoration: 'none', color: '#ee2242' }}>
            VIEW FULL RECORD
          </NavLink>
        </div>
      </div>
    </article>
  );
};
