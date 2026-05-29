import monuments from '../../data/monuments.json';
import Button from '../Button/Button';
import { CustomNavLink } from '../CustomNavlink/CustomNavLink';
import LiveTicker from '../Ticker/Ticker';
import './Home.css';

const Home = ({ randomMonument, getNextMonument }) => {
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

  // //DO NOT TOUCH THIS!
  // const number = useMonumentNumber();
  // const randomMonument = monuments[number];
  // console.log('This is the random monument: %s', JSON.stringify(randomMonument));
  // const getNextMonument = (index) => {
  //   return monuments[index % monuments.length];
  // };

  return (
    <div className="home-page">
      <LiveTicker />

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="hero-section" style={{ backgroundImage: `url(${randomMonument.images[0]})` }}>
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
          {randomMonument && (
            <div className="main-monument-card">
              <div className="card-image-wrapper">
                <img src={randomMonument.images[0]} alt={randomMonument.name} />
              </div>

              <div className="card-body-content">
                <span className="card-location">
                  {randomMonument.city?.toUpperCase()}, {randomMonument.country?.toUpperCase()}
                </span>

                <h3>{randomMonument.name}</h3>

                <p>{randomMonument.description}</p>

                <span className="card-date-badge">{randomMonument.year}</span>

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
                  <img src={getNextMonument(1).images[1]} alt={getNextMonument(1).name} />
                </div>

                <div className="side-card-body">
                  <h3>{getNextMonument(1).name}</h3>

                  <p>{getNextMonument(1).description}</p>

                  <button className="text-link-btn" onClick={() => handleExploreRecord(getNextMonument(1).name)}>
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
              // src="https://tse3.mm.bing.net/th/id/OIP.vu3Xj7XVKFuWPRtrbYvc4QHaGW?rs=1&pid=ImgDetMain&o=7&rm=3"
              src={getNextMonument(2).images[0]}
              alt="The Echoes of Petra"
            />
          </div>

          <div className="exhibition-text-side">
            <span className="exhibition-badge">SPECIAL EXHIBITION</span>

            <h2>
              {/* The Echoes of Petra:
              <br />A City Carved from Time */}
              {getNextMonument(2).name}
              {/* <br /> */}
              {/* {getNextMonument(2).shortDescription} */}
            </h2>

            <p className="exhibition-intro">{getNextMonument(2).shortDescription}</p>

            <p className="exhibition-details">{getNextMonument(2).seo.metaDescription}</p>

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
          {monuments
            .sort((a, b) => parseInt(b.yearBuilt.split(' ')[0]) - a.yearBuilt.split(' ')[0])
            .slice(0, 3)
            .map((monument, index) => (
              <div className="timeline-row" key={monument.id}>
                {/* LEFT SIDE */}
                <div className="timeline-left">
                  {index % 2 === 0 ? (
                    <>
                      <span className="node-year">{monument.year}</span>

                      <CustomNavLink to={`/monument/${monument.id}`}>
                        <h4>{monument.name}</h4>
                      </CustomNavLink>
                    </>
                  ) : (
                    <CustomNavLink to={`/monument/${monument.id}`}>
                      <p>{monument.shortDescription}</p>
                    </CustomNavLink>
                  )}
                </div>

                {/* CENTER */}
                <div className="timeline-center">
                  <div className="timeline-dot"></div>
                </div>

                {/* RIGHT SIDE */}
                <div className="timeline-right">
                  {index % 2 === 0 ? (
                    <CustomNavLink to={`/monument/${monument.id}`}>
                      <p>{monument.shortDescription}</p>
                    </CustomNavLink>
                  ) : (
                    <>
                      <span className="node-year">{monument.year}</span>

                      <CustomNavLink to={`/monument/${monument.id}`}>
                        <h4>{monument.name}</h4>
                      </CustomNavLink>
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
