/* eslint-disable react-hooks/immutability */
import { useEffect, useRef, useState } from 'react';
import { Card } from '../../components/Card/Card';
import Filters from '../../components/Filters/Filters';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Pagination } from '../../components/Pagination/Pagination';
import { useMonuments } from '../../hooks/useMonuments';
import './Saved.css';
// import {useDimensions} from '../../hooks/useDimensions';

export const Saved = () => {
  const { filters, addToFilters, removeFromFilters, monuments = [], activeFilters } = useMonuments();

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

  return (
    <>
      <Header />
      <div className='saved-container'>
        <div className="hero">
          <h1>Your Collection</h1>
          <p>
            A definitive digital repository encompassing millennia of human achievement. Explore high-fidelity records,
            architectural documentation, and historical narratives from the world's most significant cultural sites.
          </p>
        </div>

        <div className="middle">
          <Filters
            filters={filters}
            addToFilters={addToFilters}
            removeFromFilters={removeFromFilters}
            activeFilters={activeFilters}
          />

          <div className="content">
            <div className="cards">
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
          </div>
        </div> 
      </div>
      <Footer />
    </>
  );
};
