/* src/components/GalleryGrid/GalleryGrid.jsx */
import "./GalleryGrid.css";
import GalleryCard from "../GalleryCard/GalleryCard";

export default function GalleryGrid({ items, onOpen }) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push({ pair: items.slice(i, i + 2), rowIdx: Math.floor(i / 2) });
  }

  return (
    <section className="gallery-grid" aria-label="Heritage sites gallery">
      {rows.map(({ pair, rowIdx }) => {
        const isEven = rowIdx % 2 === 0;
        const cols   = pair.length === 1 ? "1fr" : isEven ? "2fr 1fr" : "1fr 2fr";
        const h      = isEven ? "clamp(190px, 22vw, 300px)" : "clamp(170px, 20vw, 270px)";

        return (
          <div
            key={rowIdx}
            className="gallery-grid__row"
            style={{ gridTemplateColumns: cols, height: h }}
          >
            {pair.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onOpen={() => onOpen(item)}
              />
            ))}
          </div>
        );
      })}
    </section>
  );
}