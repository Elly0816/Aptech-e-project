import { TAGLINES } from '../../helpers/helpers';
import './ContinentCard.css';

export const ContinentCard = ({ name, image, onOpen }) => {
  return (
    <button className="continent-card" onClick={() => onOpen(name)} aria-label={`Explore ${name}`}>
      <div
        className="continent-card__bg"
        //   style={{ backgroundImage: `url(${image})` }}
        style={{ background: `url(${image}) center/cover no-repeat, rgba(0, 0, 0, 0.7)` }}
      />

      <div className="continent-card__meta">
        <span className="continent-tag">{TAGLINES[name.toLowerCase()]}</span>
        <h3 className="continent-title">{name}</h3>
      </div>
    </button>
  );
};
