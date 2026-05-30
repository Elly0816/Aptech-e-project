import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import { ContinentCard } from '../../components/Continents/ContinentCard';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import monuments from '../../data/monuments.json';
import './Continents.css';

const DISPLAY_ORDER = ['Africa', 'Europe', 'Asia', 'South America', 'North America', 'Oceania', 'Antarctica'];

export const Continents = () => {
  const navigate = useNavigate();

  // Pick a representative image for each continent (first monument encountered)
  const representative = useMemo(() => {
    const map = {};
    for (const m of monuments) {
      const c = m.continent ?? 'Unknown';
      if (!map[c]) map[c] = m.images?.[0] ?? '';
    }
    return map;
  }, []);

  const continents = DISPLAY_ORDER.filter((c) => representative[c]).map((c) => ({ name: c, image: representative[c] }));

  const openContinent = (name) => {
    // const slug = name.toLowerCase().replace(/\s+/g, '-');
    const slug = name.replace('-', '+');
    navigate(`/gallery?filter=${encodeURIComponent(slug)}`);
  };

  return (
    <>
      <Header />

      <main className="continents-page">
        <section className="continents-hero">
          <div className="hero-text">
            <h1>Embark on a Journey Through Time</h1>

            <p className="hero-intro">
              Traverse the short echoes of history. From the cradle of civilization to the peaks of architectural
              mastery, explore the cultural pathways that shaped our collective human narrative.
            </p>

            <div className="hero-actions">
              <Button variant="btn-solid" text="START THE EXPEDITION" onClick={() => navigate('/gallery')} />
            </div>
          </div>

          <div className="hero-image">
            <img src={representative['Asia'] ?? continents[0]?.image} alt="Hero" />
          </div>
        </section>

        <section className="continents-grid" aria-label="Continents">
          {continents.map((c) => (
            <ContinentCard key={c.name} name={c.name} image={c.image} onOpen={openContinent} />
          ))}
        </section>

        <section className="pulse-of-progress">
          <h2>The Pulse of Progress</h2>
          <div className="pulse-timeline" role="presentation">
            {['Antiquity', 'Classical', 'Medieval', 'Renaissance', 'Modern'].map((_, i) => (
              <span key={i} className="pulse-dot" />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
