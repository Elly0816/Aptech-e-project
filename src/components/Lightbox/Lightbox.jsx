/* src/components/Lightbox/Lightbox.jsx */
import "./Lightbox.css";

export default function Lightbox({ item, imageIndex, onClose, onPrev, onNext }) {
  const totalImages = item.images.length;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${item.name}`}
      onClick={onClose}
    >
      {/* Only show nav arrows if the monument has more than one image */}
      {totalImages > 1 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      <div
        className="lightbox__inner"
        onClick={(e) => e.stopPropagation()}
      >
        <figure className="lightbox__figure">
          {/*
           * key={imageIndex} forces the <img> to remount on each
           * navigation so the fade-in animation replays every time.
           */}
          <img
            key={imageIndex}
            className="lightbox__img"
            src={item.images[imageIndex]}
            alt={`${item.name} — image ${imageIndex + 1} of ${totalImages}`}
          />

          <figcaption className="lightbox__meta">
            <p className="lightbox__eyebrow">
              {item.continent} · {item.yearBuilt}
            </p>
            <h2 className="lightbox__title">{item.name}</h2>
            <address className="lightbox__location">
              {item.city}, {item.country}
            </address>
            <p className="lightbox__desc">{item.shortDescription}</p>
            {item.ratings && (
              <p className="lightbox__rating">
                ★ {item.ratings.average} · {item.ratings.reviewCount.toLocaleString()} reviews
              </p>
            )}
          </figcaption>
        </figure>

        {/* Image counter — e.g. "3 / 8" */}
        {totalImages > 1 && (
          <p className="lightbox__counter">
            {imageIndex + 1} / {totalImages}
          </p>
        )}
      </div>

      {totalImages > 1 && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      <button
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>
    </div>
  );
}