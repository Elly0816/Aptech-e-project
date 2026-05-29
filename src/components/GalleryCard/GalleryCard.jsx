/* src/components/GalleryCard/GalleryCard.jsx */
import "./GalleryCard.css";

function getLabel(item) {
  if (item.isWorldWonder) return "World Wonder";
  const naturalTags = ["nature", "mountain", "adventure", "volcanic"];
  if (item.tags?.some((t) => naturalTags.includes(t))) return "Natural";
  return "Historical";
}

export default function GalleryCard({ item, onOpen }) {
  return (
    <article className="gallery-card wg-grid-item" onClick={onOpen}>
      <figure className="gallery-card__figure">
        <img
          className="gallery-card__img"
          src={item.images[0]}
          alt={item.name}
          loading="lazy"
        />

        {/* Category badge */}
        <span className="gallery-card__label">{getLabel(item)}</span>

        {/* Overlay with name + button */}
        <figcaption className="gallery-card__overlay">
          <address className="gallery-card__location">
            {item.city}, {item.country}
          </address>
          <h3 className="gallery-card__name">{item.name}</h3>
          <button
            className="gallery-card__btn"
            onClick={(e) => { e.stopPropagation(); onOpen(); }}
          >
            View Chapter
          </button>
        </figcaption>
      </figure>
    </article>
  );
}