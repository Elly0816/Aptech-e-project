/* src/pages/Gallery/Gallery.jsx */
import { useCallback, useEffect, useState } from 'react';
import './Gallery.css';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import GalleryFilter from '../../components/GalleryFilter/GalleryFilter';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import GalleryHero from '../../components/GalleryHero/GalleryHero';
import Lightbox from '../../components/Lightbox/Lightbox';

import { useSearchParams } from 'react-router';
import monuments from '../../data/monuments.json';

// const FILTERS = [
//   { id: 'all', label: 'All Works' },
// { id: 'north', label: 'North Africa' },
// { id: 'east', label: 'East Africa' },
// { id: 'south', label: 'South Africa' },
// ];

const FILTERS = ['All Works'];

const ContinentSet = new Set();

monuments.map((m) => ContinentSet.add(m.continent));

ContinentSet.forEach((c) => FILTERS.push(c));

export const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('filter');
  useEffect(() => {
    if (!activeFilter) setSearchParams({ filter: 'All Works' });
  });

  // const [activeFilter, setActiveFilter] = useState('All Works');
  const [gridKey, setGridKey] = useState(0);

  /*
   * lightbox tracks WHICH monument was clicked AND which
   * image within that monument is currently showing.
   *
   * { item: object, imageIndex: number } | null
   */
  const [lightbox, setLightbox] = useState(null);

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const filtered =
    activeFilter === 'All Works' ? monuments : monuments.filter((item) => item.continent === activeFilter);

  const handleFilter = (id) => {
    // setActiveFilter(id);
    setSearchParams({ filter: id });
    setGridKey((k) => k + 1);
    setLightbox(null);
  };

  /* Open lightbox on the first image of the clicked monument */
  const openLb = useCallback((item) => {
    setLightbox({ item, imageIndex: 0 });
  }, []);

  const closeLb = useCallback(() => setLightbox(null), []);

  /* Navigate through the clicked monument's images array */
  const prevImage = useCallback(() => {
    setLightbox((lb) => ({
      ...lb,
      imageIndex: (lb.imageIndex - 1 + lb.item.images.length) % lb.item.images.length,
    }));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((lb) => ({
      ...lb,
      imageIndex: (lb.imageIndex + 1) % lb.item.images.length,
    }));
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLb, prevImage, nextImage]);

  return (
    <>
      <Header />

      <main className="gallery-page">
        <div className="gallery-page__content">
          <GalleryHero />

          <GalleryFilter filters={FILTERS} active={activeFilter} onFilter={handleFilter} />

          {/* Pass the full item object to openLb, not just an index */}
          <GalleryGrid key={gridKey} items={filtered} onOpen={openLb} />

          <section className="gallery-cta" aria-label="Call to action">
            <h2 className="gallery-cta__title">Preserve the Legacy</h2>
            <p className="gallery-cta__text">
              Our global community of historians and explorers document and celebrate the architectural triumphs of
              civilization.
            </p>
          </section>
        </div>
      </main>

      <Footer />

      {lightbox !== null && (
        <Lightbox
          item={lightbox.item}
          imageIndex={lightbox.imageIndex}
          onClose={closeLb}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
};
