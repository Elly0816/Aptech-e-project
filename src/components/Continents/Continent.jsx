import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import './Continent.css';
import { ContinentCard } from './ContinentCard';

export const Continent = ({ representative, continents, openContinent }) => {
  const navigate = useNavigate();

  return (
    <>
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
    </>
  );
};
