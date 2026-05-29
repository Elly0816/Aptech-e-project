import { useEffect, useState } from 'react';
import './Filters.css';

const buckets = {
  era: [
    'historical',
    'ancient architecture',
    'roman empire',
    'maya',
    'inca',
    'polynesian',
    'indigenous',
    'native american',
    'buddhist',
    'religious',
  ],
  region: [
    'egypt',
    'ethiopia',
    'zimbabwe',
    'libya',
    'tanzania',
    'africa',
    'china',
    'india',
    'jordan',
    'cambodia',
    'indonesia',
    'myanmar',
    'sri lanka',
    'mexico',
    'usa',
    'peru',
    'chile',
    'colombia',
    'argentina',
    'south america',
  ],
  unesco_status: ['unesco', 'world wonder', 'natural wonder'],
  uncategorized: [
    'architecture',
    'temple',
    'temples',
    'fortress',
    'monument',
    'rock art',
    'geoglyphs',
    'nature',
    'mountain',
    'geology',
    'adventure',
    'archaeology',
  ],
};

function Filters({
  filters = [],
  addToFilters = () => {},
  removeFromFilters = () => {},
  activeFilters: activeFiltersProp, // if parent supplies this, component is controlled
}) {
  const isControlled = Array.isArray(activeFiltersProp);
  const [localActive, setLocalActive] = useState([]);

  // activeFilters used for rendering (controlled or local)
  const activeFilters = isControlled ? activeFiltersProp : localActive;

  // Dropdown open/close behavior (one handler per dropdown + outside click)
  useEffect(() => {
    const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
    if (!dropdowns.length) return;

    const onDocumentClick = (e) => {
      dropdowns.forEach((dd) => {
        if (!dd.contains(e.target)) dd.classList.remove('active');
      });
    };

    const handlers = dropdowns
      .map((dd) => {
        const button = dd.querySelector('.dropdown-toggle');
        if (!button) return null;

        const onToggle = (e) => {
          e.stopPropagation();
          // optional accordion behavior: close others
          dropdowns.forEach((d) => d !== dd && d.classList.remove('active'));
          dd.classList.toggle('active');
          button.setAttribute('aria-expanded', dd.classList.contains('active'));
        };

        button.addEventListener('click', onToggle);
        return { button, onToggle };
      })
      .filter(Boolean);

    document.addEventListener('click', onDocumentClick);

    return () => {
      handlers.forEach(({ button, onToggle }) => button.removeEventListener('click', onToggle));
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  // helper id generator (no duplicate ids)
  const buildId = (section, index, item) => `${section}-${index}-${item.replace(/\s+/g, '-').toLowerCase()}`;

  const toggleFilter = (item) => {
    const currently = activeFilters.includes(item);
    if (isControlled) {
      // controlled: delegate to parent handlers
      if (currently) removeFromFilters(item);
      else addToFilters(item);
    } else {
      // uncontrolled: keep local state and optionally inform parent
      setLocalActive((prev) => (currently ? prev.filter((i) => i !== item) : [...prev, item]));
      if (currently) removeFromFilters(item);
      else addToFilters(item);
    }
  };

  const renderGroup = (sectionKey, title) => (
    <div className="dropdown" data-section={sectionKey}>
      <button type="button" className="dropdown-toggle" aria-expanded="false">
        <h3>{title}</h3>
      </button>
      <div className="dropdown-menu" role="menu">
        {filters
          .filter((item) => buckets[sectionKey].includes(item))
          .map((item, index) => {
            const id = buildId(sectionKey, index, item);
            return (
              <label key={id} className="filter-label" htmlFor={id}>
                <input
                  id={id}
                  type="checkbox"
                  value={item}
                  checked={activeFilters.includes(item)}
                  onChange={() => toggleFilter(item)}
                />
                <span className="filter-text">{item}</span>
              </label>
            );
          })}
      </div>
    </div>
  );

  const handleClear = () => {
    const toClear = [...activeFilters];
    if (isControlled) {
      toClear.forEach((f) => removeFromFilters(f));
    } else {
      setLocalActive([]);
      toClear.forEach((f) => removeFromFilters(f));
    }
  };

  return (
    <div className="filters">
      <h2>FILTERS</h2>

      

      {renderGroup('era', 'ERA')}
      {renderGroup('region', 'REGION')}
      {renderGroup('unesco_status', 'UNESCO STATUS')}

      <div className="dropdown" data-section="other">
        <button type="button" className="dropdown-toggle" aria-expanded="false">
          <h3>OTHER</h3>
        </button>
        <div className="dropdown-menu">
          {filters
            .filter((m) => m !== 'temples')
            .filter((item) => buckets.uncategorized.includes(item))
            .map((item, index) => {
              const id = buildId('other', index, item);
              return (
                <label key={id} className="filter-label" htmlFor={id}>
                  <input
                    id={id}
                    type="checkbox"
                    value={item}
                    checked={activeFilters.includes(item)}
                    onChange={() => toggleFilter(item)}
                  />
                  <span className="filter-text">{item}</span>
                </label>
              );
            })}
        </div>
      </div>

      <button className="btn clear-btn" type="button" onClick={handleClear}>
        CLEAR FILTERS
      </button>
    </div>
  );
}

export default Filters;
