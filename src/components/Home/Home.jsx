import { useState } from 'react';
import { useNavigate } from 'react-router';
import monuments from '../../data/monuments.json';
import { useDimensions } from '../../hooks/useDimensions';
import Button from '../Button/Button';
import { CustomNavLinkWithH3, CustomNavLinkWithH4, CustomNavlinkWithP } from '../CustomNavlink/CustomNavLink';
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

const normalizeYears = (m) => {
  return m.yearBuilt.toLowerCase().includes('bc') || m.yearBuilt.toLowerCase().includes('bce')
    ? { ...m, yearBuilt: parseInt(m.yearBuilt.split(' ')[0]) * -1 }
    : m.yearBuilt.toLowerCase().includes('ce') || m.yearBuilt.toLowerCase().includes('ad') || !isNaN(m.yearBuilt)
      ? { ...m, yearBuilt: parseInt(m.yearBuilt.split(' ')[0]) }
      : m;
};

const sortByYear = (a, b) => {
  console.log('a: ', a.yearBuilt);
  console.log('b: ', b.yearBuilt);
  if (isNaN(b.yearBuilt) && isNaN(a.yearBuilt)) {
    return 0;
  } else if (isNaN(b.yearBuilt)) {
    return 1;
  } else if (isNaN(a.yearBuilt)) {
    return -1;
  } else {
    return parseInt(a.yearBuilt) - parseInt(b.yearBuilt);
  }
};

const addEra = (m) => {
  return m.yearBuilt < 0
    ? { ...m, yearBuilt: `${m.yearBuilt * -1} BC` }
    : m.yearBuilt >= 0
      ? { ...m, yearBuilt: `${m.yearBuilt} CE` }
      : m;
};

const Home = ({ randomMonument, getNextMonument }) => {
  const [maxSize, setMaxSize] = useState(3);
  const navigate = useNavigate();
  const { isMobile } = useDimensions();

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

  const handleExpandChrono = () => {
    setMaxSize((prev) => {
      return Math.min(prev + 3, monuments.length);
    });
  };

  return (
    <div className="home-page">
      <LiveTicker />

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section
        className="hero-section"
        style={{ background: `url(${randomMonument.images[0]}) center/cover no-repeat, rgba(0, 0, 0, 0.5)` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-subtitle">{TAGLINES[randomMonument.continent.toLowerCase()].toUpperCase()}</span>

            <h1 className="hero-title">{randomMonument.seo.metaDescription.split(',')[0].replace('.', '')}</h1>

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

          {!isMobile && (
            <div className="trending-action-btn">
              <Button variant="btn-solid" text="VIEW ALL" onClick={handleViewAllMonuments} />
            </div>
          )}
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
                <div className="card-location-container">
                  <span className="card-location">
                    {getNextMonument(1).city?.toUpperCase()}, {getNextMonument(1).country?.toUpperCase()}
                  </span>
                  {!isMobile && (
                    <span className="card-year">
                      {getNextMonument(1).yearBuilt.toLowerCase() === 'unknown'
                        ? 'Natural Monument'
                        : `Built ${getNextMonument(1).yearBuilt} - ${getNextMonument(1).completedYear}`}
                    </span>
                  )}
                </div>

                <CustomNavLinkWithH3 monument={getNextMonument(1)} />

                {!isMobile && <CustomNavlinkWithP monument={getNextMonument(1)} />}

                <span className="card-date-badge">{getNextMonument(1).year}</span>

                {/* <button className="text-link-btn" onClick={() => handleExploreRecord(getNextMonument(1))}>
                  EXPLORE RECORD →
                </button> */}
              </div>
            </div>
          )}

          {/* =========================================================
              SIDE CARD && FEATURED CHAPTER
          ========================================================= */}
          {getNextMonument(2) && (
            <div className="side-discovery-card">
              <div className="side-card-inner">
                <span className="discovery-label-heading">
                  {!isMobile ? 'DISCOVERY OF THE WEEK' : 'FEATURED CHAPTER'}
                </span>

                {isMobile && (
                  <div className="side-card-body featured-chapter">
                    <h3>{getNextMonument(2).name}</h3>

                    <p>{getNextMonument(2).shortDescription}</p>

                    <div>
                      <h6>
                        {getNextMonument(2).builtBy}, {getNextMonument(2).yearBuilt}
                      </h6>
                      <h6>
                        {getNextMonument(2).city}, {getNextMonument(2).country}
                      </h6>
                      <Button
                        text={'READ THE CHAPTER'}
                        className={'read-chapter'}
                        onClick={() => handleExploreRecord(getNextMonument(2))}
                      />
                    </div>
                  </div>
                )}
                <div className="side-image-wrapper">
                  <img src={getNextMonument(2).images[1]} alt={getNextMonument(2).name} />
                </div>

                {!isMobile && (
                  <div className="side-card-body">
                    <h3>{getNextMonument(2).name}</h3>

                    <p>{getNextMonument(2).shortDescription}</p>

                    <button className="text-link-btn" onClick={() => handleExploreRecord(getNextMonument(2))}>
                      EXPLORE RECORD →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          SPECIAL EXHIBITION
      ========================================================= */}
      {!isMobile && (
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
      )}

      {/* =========================================================
          CHRONOLOGY TIMELINE
      ========================================================= */}
      {!isMobile ? (
        <section className="chronology-section">
          <h2 className="chronology-main-title">Chronology of Civilization</h2>

          <div className="timeline-vertical-container">
            {monuments
              .map(normalizeYears)
              .sort(sortByYear)
              .map(addEra)
              .slice(0, maxSize)
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
          {maxSize < monuments.length ? (
            <div className="show-more">
              <Button text={'Show more'} style={{ backgroundColor: '#c46311' }} onClick={handleExpandChrono} />
            </div>
          ) : (
            <div className="show-more">
              <Button text={'Show less'} style={{ backgroundColor: '#c46311' }} onClick={() => setMaxSize(3)} />
            </div>
          )}
        </section>
      ) : (
        <section className="chronology-section">
          <div className="chronology-mobile">
            <div className="timeline-vertical-container"></div>
            <h2 className="chronology-main-title">The Chronology of Civilization</h2>
          </div>
          <div className="mobile-timeline">
            <div className="mobile-timeline-line" />

            <div className="mobile-timeline-markers" aria-hidden="false">
              {['Antiquity', 'Classical', 'Medieval', 'Renaissance', 'Modern'].map((era) => (
                <div className="timeline-marker" key={era}>
                  <div className="timeline-dot" />
                  <div className="timeline-label">{era}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
