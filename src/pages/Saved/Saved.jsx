/* eslint-disable react-hooks/immutability */
import { useEffect, useRef, useState, useMemo } from 'react';
import { Card } from '../../components/Card/Card';
import Filters from '../../components/Filters/Filters';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Pagination } from '../../components/Pagination/Pagination';
import { useMonuments } from '../../hooks/useMonuments';
import './Saved.css';
import { useDimensions } from '../../hooks/useDimensions';

export const Saved = () => {
  const { filters, addToFilters, removeFromFilters, monuments: allMonuments = [], activeFilters } = useMonuments();

  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedMonuments') || '[]');
    } catch {
      return [];
    }
  });

  const monuments = useMemo(() => {
    return allMonuments.filter((m) => savedIds.includes(m.id.toString()) || savedIds.includes(Number(m.id)));
  }, [allMonuments, savedIds]);

  const itemsPerPage = 6;
  const [page, setPage] = useState(1);

  // derive displayed page without calling setState inside an effect
  const prevDeps = useRef({ monuments, activeFilters });
  const depsChanged = useRef(false);

  useEffect(() => {
    depsChanged.current = prevDeps.current.monuments !== monuments || prevDeps.current.activeFilters !== activeFilters;
    // update the ref after render (no setState)
    prevDeps.current = { monuments, activeFilters };
  }, [monuments, activeFilters]);

  // eslint-disable-next-line react-hooks/refs
  const effectivePage = depsChanged.current ? 1 : page;
  const total = monuments.length;
  const start = (page - 1) * itemsPerPage;
  const paged = monuments.slice(start, start + itemsPerPage);

  const hasSaved = total > 0;

  const { isMobile } = useDimensions();

  return (
    <>
      <Header />
      <div className="saved-container">
        <div className={` ${isMobile ? 'hero-mobile' : 'hero'}`}>
          <h1>Your Collection</h1>
          <p>Preserving personal discoveries from across the globe, curated by you for future exploration.</p>
        </div>

        <div className="middle">
          <Filters
            filters={filters}
            addToFilters={addToFilters}
            removeFromFilters={removeFromFilters}
            activeFilters={activeFilters}
          />

          <div className={`content ${isMobile ? 'content-mobile' : ''}`}>
            {hasSaved ? (
              <>
                <div className="cards wg-grid-item">
                  {paged.map((item) => (
                    <Card
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      country={item.country}
                      city={item.city}
                      images={item.images}
                    />
                  ))}
                </div>

                <Pagination
                  totalItems={total}
                  itemsPerPage={itemsPerPage}
                  currentPage={effectivePage}
                  onPageChange={setPage}
                />
              </>
            ) : (
              <div className="saved-empty-state">
                <div className="saved-empty-icon">🏛️</div>
                <h3>Your Collection is Empty</h3>
                <p>
                  You haven't saved any heritage monuments yet. Explore historical landmarks and add them to your
                  personal repository.
                </p>
                <a href="/" className="explore-btn">
                  Explore Landmarks
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
