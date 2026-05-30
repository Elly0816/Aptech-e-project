import { useNavigate } from 'react-router';
import monuments from '../../data/monuments.json';
import Button from '../Button/Button';
import { CustomNavLinkWithH4, CustomNavlinkWithP } from '../CustomNavlink/CustomNavLink';
import LiveTicker from '../Ticker/Ticker';
import './Home.css';

const TAGLINES = {
  africa: 'The Cradle of Civilization',
  asia: 'The Forge of Empires',
  europe: 'The Age of Exploration',
  'north america': 'The Frontier of Innovation',
  'south america': 'The Continent of Living Wonders',
  oceania: 'The Ancient Island Continent',
  antarctica: 'The Last Great Wilderness',
};

const Home = ({ randomMonument, getNextMonument }) => {
  const navigate = useNavigate();

  const handleBeginJourney = (monument) => {
    console.log('Journey initiated...');
    navigate(`/monument/${monument.id}`);
  };

  const handleViewAllMonuments = () => {
    console.log('Loading all monuments gallery...');
    navigate('/gallery');
  };

  const handleExploreRecord = (monument) => {
    console.log(`Exploring ${monument.name}...`);
    navigate(`/monument/${monument.id}`);
  };

  const handleReadChapter = (id) => {
    console.log(`Opening featured chapter %s...`, id);
    navigate(`/monument/${id}`);
  };

  return (
    <div className="home-page">
      <LiveTicker />

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="hero-section" style={{ backgroundImage: `url(${randomMonument.images[0]})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-subtitle">{TAGLINES[randomMonument.continent.toLowerCase()]}</span>

            <h1 className="hero-title">{randomMonument.seo.metaDescription.split(',')[0]}.</h1>

            <div className="hero-action">
              <Button variant="btn-solid" text="Begin Journey" onClick={() => handleBeginJourney(randomMonument)} />
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
          {getNextMonument(1) && (
            <div className="main-monument-card">
              <div className="card-image-wrapper">
                <img src={getNextMonument(1).images[0]} alt={getNextMonument(1).name} />
              </div>

              <div className="card-body-content">
                <span className="card-location">
                  {getNextMonument(1).city?.toUpperCase()}, {getNextMonument(1).country?.toUpperCase()}
                </span>

                <h3>{getNextMonument(1).name}</h3>

                <p>{getNextMonument(1).description}</p>

                <span className="card-date-badge">{getNextMonument(1).year}</span>

                <button className="text-link-btn" onClick={() => handleExploreRecord(getNextMonument(1))}>
                  EXPLORE RECORD →
                </button>
              </div>
            </div>
          )}

          {/* =========================================================
              SIDE CARD
          ========================================================= */}
          {getNextMonument(2) && (
            <div className="side-discovery-card">
              <span className="discovery-label-heading">DISCOVERY OF THE WEEK</span>

              <div className="side-card-inner">
                <div className="side-image-wrapper">
                  <img src={getNextMonument(2).images[1]} alt={getNextMonument(2).name} />
                </div>

                <div className="side-card-body">
                  <h3>{getNextMonument(2).name}</h3>

                  <p>{getNextMonument(2).description}</p>

                  <button className="text-link-btn" onClick={() => handleExploreRecord(getNextMonument(2))}>
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
              src={getNextMonument(3).images[0]}
              alt={getNextMonument(3).name}
            />
          </div>

          <div className="exhibition-text-side">
            <span className="exhibition-badge">SPECIAL EXHIBITION</span>

            <h2>
              {/* The Echoes of Petra:
              <br />A City Carved from Time */}
              {getNextMonument(3).name}
              {/* <br /> */}
              {/* {getNextMonument(2).shortDescription} */}
            </h2>

            <p className="exhibition-intro">{getNextMonument(3).shortDescription}</p>

            <p className="exhibition-details">{getNextMonument(3).seo.metaDescription}</p>

            <div className="exhibition-action">
              <Button
                variant="btn-solid"
                text="READ FEATURED CHAPTER"
                onClick={() => handleReadChapter(getNextMonument(3).id)}
              />
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
                      {/* <span className="node-year">{monument.year}</span> */}

                      <CustomNavLinkWithH4 monument={monument} />
                    </>
                  ) : (
                    <CustomNavlinkWithP monument={monument} />
                  )}
                </div>

                {/* CENTER */}
                <div className="timeline-center">
                  <div className="timeline-dot"></div>
                </div>

                {/* RIGHT SIDE */}
                <div className="timeline-right">
                  {index % 2 === 0 ? (
                    <CustomNavlinkWithP monument={monument} />
                  ) : (
                    <>
                      <span className="node-year">{monument.year}</span>

                      <CustomNavLinkWithH4 monument={monument} />
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
