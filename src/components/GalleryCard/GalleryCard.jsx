/* src/components/GalleryCard/GalleryCard.jsx */
import { useLocation, useNavigate } from 'react-router';
import './GalleryCard.css';
import { useDimensions } from '../../hooks/useDimensions';

function getLabel(item) {
  if (item.isWorldWonder) return 'World Wonder';
  const naturalTags = ['nature', 'mountain', 'adventure', 'volcanic'];
  if (item.tags?.some((t) => naturalTags.includes(t))) return 'Natural';
  return 'Historical';
}

const randomNumber = Math.random();

export default function GalleryCard({ item, onOpen }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useDimensions();

  const inGallery = pathname.toLocaleLowerCase().includes('gallery');

  return (
    <article className="gallery-card wg-grid-item" onClick={onOpen}>
      <figure className="gallery-card__figure">
        <img
          className="gallery-card__img"
          src={item.images[Math.floor(item.images.length * randomNumber)]}
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
          {inGallery && (
            <button
              className={`gallery-card__btn ${isMobile ? 'gallery_card_btn_mobile' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                // onOpen();
                navigate(`/monument/${item.id}`);
              }}
            >
              View Monument
            </button>
          )}
        </figcaption>
      </figure>
    </article>
  );
}
