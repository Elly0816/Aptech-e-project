import monuments from '../../data/monuments';
import { useMonumentNumber } from '../../hooks/useRandomMonument';
import Button from '../Button/Button';
import LiveTicker from '../Ticker/Ticker';
import './Home.css';

const Home = () => {
  const handleBeginJourney = () => {
    console.log('Journey initiated...');
  };

  const handleViewAllMonuments = () => {
    console.log('Loading all monuments gallery...');
  };

  const handleExploreRecord = (monument) => {
    console.log(`Exploring ${monument}...`);
  };

  const handleReadChapter = () => {
    console.log('Opening featured chapter...');
  };

  // const { randomMonument } = useMonuments();

  //DO NOT TOUCH THIS!
  const number = useMonumentNumber();
  const randomMonument = monuments[number];
  const getNextMonument = (index) => {
    return monuments[index % monuments.length];
  };

  return (
    <div className="home-page">
      <LiveTicker />

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="hero-section" style={{ backgroundImage: randomMonument.images[0] }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-subtitle">THE CRADLE OF CIVILIZATION</span>

            <h1 className="hero-title">
              Witness the Majesty of
              <br />
              the {randomMonument.name}.
            </h1>

            <div className="hero-action">
              <Button variant="btn-solid" text="Begin Journey" onClick={handleBeginJourney} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRENDING MONUMENTS
      ========================================================= */}
      <section className="trending-section">
        <div className="trending-header">
          <div>
            <h2>Trending Monuments</h2>

            <p>Explore the destinations capturing the imagination of historians and travelers worldwide this season.</p>
          </div>

          <div className="trending-action-btn">
            <Button variant="btn-solid" text="VIEW ALL" onClick={handleViewAllMonuments} />
          </div>
        </div>

        <div className="monuments-layout-grid">
          {/* =========================================================
              MAIN CARD
          ========================================================= */}
          {monuments[0] && (
            <div className="main-monument-card">
              <div className="card-image-wrapper">
                <img src={monuments[0].image} alt={monuments[0].name} />
              </div>

              <div className="card-body-content">
                <span className="card-location">
                  {monuments[0].city?.toUpperCase()}, {monuments[0].country?.toUpperCase()}
                </span>

                <h3>{monuments[0].name}</h3>

                <p>{monuments[0].description}</p>

                <span className="card-date-badge">{monuments[0].year}</span>

                <button className="text-link-btn" onClick={() => handleExploreRecord(monuments[0].name)}>
                  EXPLORE RECORD →
                </button>
              </div>
            </div>
          )}

          {/* =========================================================
              SIDE CARD
          ========================================================= */}
          {getNextMonument(1) && (
            <div className="side-discovery-card">
              <span className="discovery-label-heading">DISCOVERY OF THE WEEK</span>

              <div className="side-card-inner">
                <div className="side-image-wrapper">
                  <img src={monuments[1].image} alt={monuments[1].name} />
                </div>

                <div className="side-card-body">
                  <h3>{monuments[1].name}</h3>

                  <p>{monuments[1].description}</p>

                  <button className="text-link-btn" onClick={() => handleExploreRecord(monuments[1].name)}>
                    EXPLORE RECORD →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          SPECIAL EXHIBITION
      ========================================================= */}
      <section className="exhibition-section">
        <div className="exhibition-container">
          <div className="exhibition-image-side">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.vu3Xj7XVKFuWPRtrbYvc4QHaGW?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="The Echoes of Petra"
            />
          </div>

          <div className="exhibition-text-side">
            <span className="exhibition-badge">SPECIAL EXHIBITION</span>

            <h2>
              The Echoes of Petra:
              <br />A City Carved from Time
            </h2>

            <p className="exhibition-intro">In the heart of the Jordanian desert lies a marvel of the ancient world.</p>

            <p className="exhibition-details">
              Our latest digital chapter explores the Nabataean civilization's mastery of water management and trade.
            </p>

            <div className="exhibition-action">
              <Button variant="btn-solid" text="READ FEATURED CHAPTER" onClick={handleReadChapter} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CHRONOLOGY TIMELINE
      ========================================================= */}
      <section className="chronology-section">
        <h2 className="chronology-main-title">Chronology of Civilization</h2>

        <div className="timeline-vertical-container">
          {monuments.slice(0, 3).map((monument, index) => (
            <div className="timeline-row" key={monument.id}>
              {/* LEFT SIDE */}
              <div className="timeline-left">
                {index % 2 === 0 ? (
                  <>
                    <span className="node-year">{monument.year}</span>

                    <h4>{monument.name}</h4>
                  </>
                ) : (
                  <p>{monument.description}</p>
                )}
              </div>

              {/* CENTER */}
              <div className="timeline-center">
                <div className="timeline-dot"></div>
              </div>

              {/* RIGHT SIDE */}
              <div className="timeline-right">
                {index % 2 === 0 ? (
                  <p>{monument.description}</p>
                ) : (
                  <>
                    <span className="node-year">{monument.year}</span>

                    <h4>{monument.name}</h4>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
