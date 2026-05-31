/* src/components/Lightbox/Lightbox.jsx */
import { useLayoutEffect, useRef, useState } from 'react';
import './Lightbox.css';

export default function Lightbox({ item, imageIndex, onClose, onPrev, onNext }) {
  const totalImages = item.images.length;

  // Swipe / drag state
  const startXRef = useRef(0);
  const pointerIdRef = useRef(null);
  const wrapperRef = useRef(null);
  // const containerWidthRef = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  // const

  // Measure the slider wrapper width on mount and when it resizes so
  // slide positions are calculated reliably (prevents overlap).
  useLayoutEffect(() => {
    const measure = () => {
      const w = wrapperRef.current?.clientWidth || window.innerWidth;
      setContainerWidth(w);
    };

    measure();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      if (wrapperRef.current) ro.observe(wrapperRef.current);
    }

    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
    };
  }, []);

  const onPointerDown = (e) => {
    // ignore non-primary mouse buttons
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerIdRef.current = e.pointerId;
    // measure visible width for pixel-based translation
    // containerWidthRef.current = wrapperRef.current?.clientWidth || e.currentTarget.clientWidth || window.innerWidth;
    setContainerWidth(wrapperRef.current?.clientWidth || e.currentTarget.clientWidth || window.innerWidth);
    startXRef.current = e.clientX;
    setIsDragging(true);
    setTranslateX(0);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;
    const delta = e.clientX - startXRef.current;
    setTranslateX(delta);
  };

  const finishDrag = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = translateX;
    const threshold = 80; // pixels to trigger swipe
    if (delta > threshold) {
      onPrev();
    } else if (delta < -threshold) {
      onNext();
    }
    setTranslateX(0);
    try {
      e.currentTarget.releasePointerCapture?.(pointerIdRef.current);
    } catch (err) {
      console.error(err);
    }
    pointerIdRef.current = null;
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Viewing ${item.name}`} onClick={onClose}>
      {/* Only show nav arrows if the monument has more than one image */}
      {totalImages > 1 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      <div
        className="lightbox__inner"
        onClick={(e) => {
          // Close when clicking anywhere inside the inner area except the image slider.
          const slider = wrapperRef.current;
          if (slider && slider.contains(e.target)) {
            // click inside the images area — don't close
            e.stopPropagation();
            return;
          }
          // click outside images (e.g., meta area) — close lightbox
          e.stopPropagation();
          onClose();
        }}
      >
        <div
          className="lightbox__slider-wrapper"
          ref={wrapperRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <div
            className="lightbox__slider"
            style={{
              // transform: `translateX(${-imageIndex * (containerWidthRef.current || window.innerWidth) + translateX}px)`,
              transform: `translateX(${-imageIndex * (containerWidth || window.innerWidth) + translateX}px)`,
              transition: isDragging ? 'none' : 'transform 300ms ease',
            }}
          >
            {item.images.map((src, idx) => (
              <figure className="lightbox__figure lightbox__slide" key={idx}>
                <img
                  className="lightbox__img"
                  src={src}
                  alt={`${item.name} — image ${idx + 1} of ${totalImages}`}
                  draggable={false}
                />
              </figure>
            ))}
          </div>
        </div>

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
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      <button
        className="lightbox__close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
      >
        ✕
      </button>
    </div>
  );
}
