/* src/components/GalleryFilter/GalleryFilter.jsx */
import './GalleryFilter.css';

export default function GalleryFilter({ filters, active, onFilter }) {
  return (
    <nav className="gallery-filter" aria-label="Gallery filters">
      {filters.map((f, i) => (
        <button
          key={i}
          className={`gallery-filter__tab${active === f ? ' active' : ''}`}
          onClick={() => onFilter(f)}
          aria-current={active === f.id ? 'true' : undefined}
        >
          {f}
        </button>
      ))}
    </nav>
  );
}
