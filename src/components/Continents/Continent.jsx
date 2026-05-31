import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDimensions } from '../../hooks/useDimensions';
import Button from '../Button/Button';
import './Continent.css';
import { ContinentCard } from './ContinentCard';
import { ContinentModal } from './ContinentModal';

const random = Math.random();

export const Continent = ({ representative, continents }) => {
  const navigate = useNavigate();
  const [selectedContinent, setSelectedContinent] = useState(null);
  const { isMobile } = useDimensions();

  console.log('Continents: ');
  console.log(continents);
  const chosenContinent = continents[Math.floor(random * continents.length)];

  console.log('Chosen Continent: %s', JSON.stringify(chosenContinent));
  return (
    <>
      <main className="continents-page wg-grid-item">
        <section className="continents-hero">
          <div className="hero-text">
            {isMobile ? (
              <h1 className="hero-text-mobile">Discover by Continent</h1>
            ) : (
              <h1>Embark on a Journey Through Time</h1>
            )}

            {isMobile ? (
              <p className="hero-text-mobile">
                Embark on a journey through time, exploring the architectural and natural wonders and historical
                legacies across the globe's seven continents
              </p>
            ) : (
              <p className="hero-intro">
                Traverse the short echoes of history. From the cradle of civilization to the peaks of architectural
                mastery, explore the cultural pathways that shaped our collective human narrative.
              </p>
            )}

            {!isMobile && (
              <div className="hero-actions">
                <Button variant="btn-solid" text="START THE EXPEDITION" onClick={() => navigate('/gallery')} />
              </div>
            )}
          </div>

          {!isMobile && (
            <div className="hero-image">
              {/* <img src={representative['Asia'] ?? continents[0]?.image} alt="Hero" /> */}
              <img src={representative[chosenContinent.name] ?? continents[0]?.image} alt="Hero" />
            </div>
          )}
        </section>

        <section
          className={`continents-grid ${isMobile && 'continents-grid-mobile'} wg-grid-item`}
          aria-label="Continents"
        >
          {continents.map((c) => (
            <ContinentCard key={c.name} name={c.name} image={c.image} onOpen={(name) => setSelectedContinent(name)} />
          ))}
        </section>

        {/* {!isMobile && (
          <section className="pulse-of-progress">
            <h2>The Pulse of Progress</h2>
            <p></p>
            <div className="pulse-timeline" role="presentation">
              {['Antiquity', 'Classical', 'Medieval', 'Renaissance', 'Modern'].map((_, i) => (
                <span key={i} className="pulse-dot" />
              ))}
            </div>
          </section>
        )} */}
      </main>
      <ContinentModal
        open={!!selectedContinent}
        continentName={selectedContinent}
        onClose={() => setSelectedContinent(null)}
      />
    </>
  );
};
