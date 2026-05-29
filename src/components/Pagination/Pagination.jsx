import './Pagination.css';

export const Pagination = ({ totalItems = 0, itemsPerPage = 6, currentPage = 1, onPageChange = () => {} }) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  if (totalPages <= 1) return null;

  const go = (p) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    onPageChange(p);
  };

  // Build condensed page list (1 ... n, with window around current)
  const pages = [];
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('left-ellipsis');
  }

  for (let p = start; p <= end; p++) pages.push(p);

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('right-ellipsis');
    pages.push(totalPages);
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="page" onClick={() => go(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous">
        ‹
      </button>

      {pages.map((p, i) =>
        p === 'left-ellipsis' || p === 'right-ellipsis' ? (
          <span key={`e-${i}`} className="ellipsis">
            …
          </span>
        ) : (
          <button
            key={p}
            className={`page ${p === currentPage ? 'active' : ''}`}
            onClick={() => go(p)}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {String(p).padStart(2, '0')}
          </button>
        )
      )}

      <button
        className="page"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
      >
        ›
      </button>
    </nav>
  );
};
