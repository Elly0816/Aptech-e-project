import { useDimensions } from '../../hooks/useDimensions';
import './Mon.css';
import Geo from '../Geo/Geo';
import Button from '../Button/Button';

const randNum = Math.random();

const getTimelineData = (name = '', yearBuilt = '', completedYear = '', builtBy = '', historicalSignificance = []) => {
  // If Colosseum, use the specific timeline from the json
  if (name && (name.toLowerCase().includes('colosseum') || name.toLowerCase().includes('colleseum'))) {
    return [
      { year: '72 AD', text: 'Construction begins under Vespasian' },
      { year: '80 AD', text: 'Completed by Emperor Titus' },
      { year: '1349 AD', text: 'Major earthquake damage' },
    ];
  }

  // Otherwise, construct dynamically
  const timeline = [];
  if (yearBuilt) {
    const yearStr = String(yearBuilt);
    // console.log(yearStr);
    timeline.push({
      year:
        yearStr.toLowerCase().includes('bce') || yearStr.toLowerCase().includes('bc')
          ? -1 * parseInt(yearStr.split(' ')[0])
          : parseInt(yearStr.split(' ')[0]),
      text: `Construction begins${builtBy ? ` under ${builtBy}` : ''}`,
    });
  }
  if (completedYear) {
    const compStr = String(completedYear);
    // console.log(compStr);
    timeline.push({
      year:
        compStr.toLowerCase().includes('bce') || compStr.toLowerCase().includes('bc')
          ? -1 * parseInt(compStr.split(' ')[0])
          : parseInt(compStr.split(' ')[0]),
      text: 'Completed and opened to the public',
    });
  }

  // console.log(timeline);

  if (historicalSignificance && historicalSignificance.length > 0) {
    historicalSignificance.forEach((item, i) => {
      if (!item || typeof item !== 'string') return;
      const match = item.match(/^(\d{3,4}(?:\s*(?:BCE|CE|AD))?)\b/i);
      if (match) {
        timeline.push({
          year: match[1],
          text: item.replace(match[0], '').replace(/^\s*[:-]\s*/, ''),
        });
      } else {
        timeline.push({
          year: `Legacy`,
          text: item,
        });
      }
    });
  }

  timeline.sort((a, b) => {
    if (isNaN(a.year) && isNaN(b.year)) return 0;
    if (isNaN(a.year)) return 1;
    if (isNaN(b.year)) return -1;
    return a.year - b.year;
  });

  timeline.map((t) =>
    isNaN(t.year) ? t : t.year < 0 ? (t.year = -1 * t.year + ' BCE') : t.year > 0 ? (t.year = t.year + ' CE') : t
  );
  return timeline;
};

export const Mon = ({
  historicalSignificance,
  fullDescription,
  images,
  shortDescription,
  name,
  location,
  architecturalStyle,
  facts,
  visitingInfo,
  theme,
  yearBuilt,
  completedYear,
  builtBy,
  country,
  city,
}) => {
  const { openingHours, closingHours, entryFee, entryFeeForForeigners, entryFeeForLocals } = visitingInfo;
  const { address, coordinates } = location;
  const { isMobile } = useDimensions();

  const timelineData = getTimelineData(name, yearBuilt, completedYear, builtBy, historicalSignificance);

  const getAdmissionFee = () => {
    if (!entryFee) {
      if (entryFeeForLocals && entryFeeForLocals.adults) {
        return `€${entryFeeForLocals.adults} (Standard Entry)`;
      }
      return 'Free Entry';
    }
    if (typeof entryFee === 'string') return entryFee;
    if (entryFee.local) return `${entryFee.local} (Standard Entry)`;
    if (entryFee.generalEntry) return `${entryFee.generalEntry} (Standard Entry)`;
    if (entryFee.foreign) return `${entryFee.foreign} (Foreign Entry)`;
    return 'Free Entry';
  };

  const getEstablishedYear = () => {
    if (yearBuilt && completedYear) {
      const start = yearBuilt.replace(/\s*AD/i, '');
      const end = completedYear.replace(/\s*AD/i, '');
      return `${start}–${end} AD`;
    }
    return yearBuilt || 'N/A';
  };

  const handleBookOfficialTour = () => {
    const term = `Book tour of ${name} in ${city}`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(term)}`;
    window.open(url, '_blank');
  };

  if (isMobile) {
    return (
      <div className="mon-content is-mobile-view">
        {/* ── 1. Historical Narrative ── */}
        <article className="mon-narrative">
          <h2 className="mon-section-title">Historical Narrative</h2>
          <p className="mon-body-text">{shortDescription}</p>
          <p className="mon-body-text">{fullDescription}</p>
        </article>

        {/* ── 2. Geographic Context ── */}
        <Geo coordinates={coordinates} address={address} />

        {/* ── 3. Visitor Facts ── */}
        <section className="mon-visitor-section">
          <div className="mon-card mon-visitor-card">
            <h2 className="mon-section-title">Visitor Facts</h2>

            <div className="mon-visitor-row">
              <span className="mon-visitor-icon">🕒</span>
              <div>
                <h4 className="mon-visitor-heading">Opening Hours</h4>
                <p className="mon-visitor-detail">
                  Daily: {openingHours} – {closingHours}
                </p>
              </div>
            </div>

            <div className="mon-visitor-row">
              <span className="mon-visitor-icon">🎫</span>
              <div>
                <h4 className="mon-visitor-heading">Admission</h4>
                <p className="mon-visitor-detail">{getAdmissionFee()}</p>
              </div>
            </div>

            <div className="mon-visitor-row">
              <span className="mon-visitor-icon">📜</span>
              <div>
                <h4 className="mon-visitor-heading">Established</h4>
                <p className="mon-visitor-detail">{getEstablishedYear()}</p>
              </div>
            </div>

            <div className="mon-visitor-row">
              <span className="mon-visitor-icon">🏛️</span>
              <div>
                <h4 className="mon-visitor-heading">Style</h4>
                <p className="mon-visitor-detail">{architecturalStyle}</p>
              </div>
            </div>

            {/* <button className="mon-visitor-card__btn">BOOK OFFICIAL TOUR</button> */}
            <Button className={`mon-visitor-card__btn`} text={`BOOK OFFICIAL TOUR`} onClick={handleBookOfficialTour} />
          </div>
        </section>

        {/* ── 4. Chronicle ── */}
        <section className="mon-chronicle">
          <span className="mon-chronicle-label">CHRONICLE</span>
          <div className="mon-timeline">
            {timelineData.map((item, i) => (
              <div className="mon-timeline-entry" key={`sig-${i}`}>
                <div className="mon-timeline-dot" />
                <div className="mon-timeline-body">
                  <h3 className="mon-timeline-heading">{item.year}</h3>
                  <p className="mon-timeline-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // DESKTOP LAYOUT
  return (
    <>
      <div className="mon-content">
        {/* ── LEFT COLUMN: Historical Narrative ── */}
        <article className="mon-narrative">
          <h2 className="mon-section-title">Historical Narrative</h2>

          <p className="mon-body-text">{shortDescription}</p>
          <p className="mon-body-text">{fullDescription}</p>

          {/* Dual image grid */}
          <div className="mon-image-grid">
            <div className="mon-image-wrapper">
              <img src={images[1]} alt={`${name} view 1`} loading="lazy" />
            </div>
            <div className="mon-image-wrapper">
              <img src={images[2] || images[0]} alt={`${name} view 2`} loading="lazy" />
            </div>
          </div>

          {/* ── CHRONICLE / TIMELINE ── */}
          <section className="mon-chronicle">
            <h2 className="mon-section-title">Chronicle</h2>

            <div className="mon-timeline">
              {timelineData.map((item, i) => (
                <div className="mon-timeline-entry" key={`sig-${i}`}>
                  <div className="mon-timeline-dot" />
                  <div className="mon-timeline-body">
                    <h3 className="mon-timeline-heading">{item.year}</h3>
                    <p className="mon-timeline-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FACTS ── */}
          <section className="mon-facts-section">
            <h2 className="mon-section-title">Key Facts</h2>

            <div className="mon-timeline">
              {facts.map((fact, i) => (
                <div className="mon-timeline-entry" key={`fact-${i}`}>
                  <div className="mon-timeline-dot" />
                  <div className="mon-timeline-body">
                    <p className="mon-timeline-text">{fact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* ── RIGHT COLUMN: Sidebar ── */}
        <aside className="mon-sidebar">
          {/* Geographic Context Card */}
          <div className="mon-card mon-geo-card">
            <span className="mon-card-label">Geographic Context</span>
            <div className="mon-geo-image-wrap">
              <img src={images[Math.floor(randNum * images.length)]} alt={name} />
            </div>
            <p className="mon-geo-address">{address}</p>
          </div>

          {/* Visitor Facts Card */}
          <div className="mon-card mon-visitor-card">
            <span className="mon-card-label">Visitor Facts</span>

            <div className="mon-visitor-row">
              <span className="mon-visitor-icon">🕐</span>
              <div>
                <h4 className="mon-visitor-heading">Opening Hours</h4>
                {openingHours.toLowerCase().includes('open') ? (
                  <p className="mon-visitor-detail">{openingHours}</p>
                ) : (
                  <p className="mon-visitor-detail">
                    Daily: {openingHours} – {closingHours}
                  </p>
                )}
              </div>
            </div>

            <div className="mon-visitor-row">
              <span className="mon-visitor-icon">🎫</span>
              <div>
                <h4 className="mon-visitor-heading">Admission</h4>
                <p className="mon-visitor-detail">{getAdmissionFee()}</p>
              </div>
            </div>

            <div className="mon-visitor-row">
              <span className="mon-visitor-icon">🏛️</span>
              <div>
                <h4 className="mon-visitor-heading">Architectural Style</h4>
                <p className="mon-visitor-detail">{architecturalStyle}</p>
              </div>
            </div>
          </div>

          {/* geographic context card */}
          <Geo coordinates={coordinates} address={address} />

          {/* Book Official Tour CTA */}
          <div className="mon-tour-cta">
            <div className="mon-tour-icon">⏳</div>
            <h2 className="mon-tour-heading">Book Official Tour</h2>
            <p className="mon-tour-description">
              Experience the arena floor and underground chambers with expert historians.
            </p>
            <Button className={`mon-tour-button`} text={`BOOK OFFICIAL TOUR`} onClick={handleBookOfficialTour} />
            <small className="mon-tour-partner">Official Partner of Roma Capitale</small>
          </div>
        </aside>
      </div>
    </>
  );
};
