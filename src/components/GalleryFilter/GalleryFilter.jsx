/* src/components/GalleryFilter/GalleryFilter.jsx */
import "./GalleryFilter.css";

export default function GalleryFilter({ filters, active, onFilter }) {
  return (
    <nav className="gallery-filter" aria-label="Gallery filters">
      {filters.map((f) => (
        <button
          key={f.id}
          className={`gallery-filter__tab${active === f.id ? " active" : ""}`}
          onClick={() => onFilter(f.id)}
          aria-current={active === f.id ? "true" : undefined}
        >
          {f.label}
        </button>
      ))}
    </nav>
  );
}