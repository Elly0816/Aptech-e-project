import './Mon.css';

export const Mon = ({
  historicalSignificance,
  fullDescription,
  images,
  shortDescription,
  name,
  address,
  openingHours,
  closingHours,
  local,
  foreign,
  architecturalStyle,
  facts,
}) => {
  return (
    <>
      <div className="container2">
        <div className="firstdiv">
          <div className="firsth2p">
            <h2>Description</h2>
            <p>{shortDescription}</p>
          </div>

          <div className="imgag">
            <img src={images[1]} alt={name} />
            <img src={images[0]} alt={name} />
          </div>
          <p>{fullDescription}</p>

          <div className="timeline">
            <h2>Historical Significance</h2>
            {historicalSignificance.map((h) => (
              <div className="timeline-item">
                <p>{h}</p>
              </div>
            ))}

            <h2>Facts</h2>
            {facts.map((f) => (
              <div className="timeline-item">
                <p>{f}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="sidebar">
          <div className="card-mon">
            <h3>{name}</h3>
            <img src={images[2]} alt={name} />
            <p>{address}</p>
          </div>

          <div className="card-mon">
            <h3>Visitor Facts</h3>
            <h4>Opening Hours</h4>
            <p>
              Daily {openingHours} - {closingHours}
            </p>
            <h4>Admission</h4>
            <p>Local Price: {local}</p>
            <p>Foreign Price: {foreign}</p>
            <h4>Architecture Style</h4>
            <p>{architecturalStyle}</p>
          </div>
          <div className="tour-box">
            <div className="tour-icon">⌛</div>

            <h2>Book Official Tour</h2>

            <p>Experience the arena floor and underground chambers with expert historians.</p>

            <button>RESERVE YOUR ACCESS</button>

            <small>Official Partner of Roma Capitale</small>
          </div>
        </div>
      </div>
    </>
  );
};
