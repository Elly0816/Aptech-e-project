import './Mon.css';

const randNum = Math.random();

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
}) => {
  const { openingHours, closingHours, entryFee, entryFeeForForeigners, entryFeeForLocals } = visitingInfo;
  const { address, coordinates } = location;

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

          {/**
        
            HISTORICAL SIGNIFICANCE
        
         */}
          <div className="timeline">
            <h2>Historical Significance</h2>
            {historicalSignificance.map((h, i) => (
              <div className="timeline-item" key={`historical significance ` + i}>
                <p>{h}</p>
              </div>
            ))}

            {/**
            
                FACTS
            
             */}

            <h2>Facts</h2>
            {facts.map((f, i) => (
              <div className="timeline-item" key={`facts ` + i}>
                <p>{f}</p>
              </div>
            ))}
          </div>
        </div>

        {/** 
        
            SIDEBAR
        */}
        <div className="sidebar">
          <div className="card-mon" style={{ backgroundColor: theme.primaryColor, color: theme.accentColor }}>
            <h3>{name}</h3>
            <img src={images[Math.floor(randNum * images.length)]} alt={name} />
            <p style={{ color: theme.accentColor }}>{address}</p>
          </div>

          <div className="card-mon" style={{ backgroundColor: theme.primaryColor, color: theme.accentColor }}>
            <h3>Visitor Facts</h3>
            <h4>Opening Hours</h4>
            {openingHours.toLowerCase().includes('open') ? (
              <p style={{ color: theme.accentColor }}>{openingHours}</p>
            ) : (
              <p style={{ color: theme.accentColor }}>
                {openingHours} - {closingHours}
              </p>
            )}
            <h4>Admission</h4>
            {entryFee ? (
              <>
                <p style={{ color: theme.accentColor }}>Local Price: {entryFee.local}</p>
                <p style={{ color: theme.accentColor }}>Foreign Price: {entryFee.foreign}</p>
              </>
            ) : (
              <>
                <p style={{ color: theme.accentColor }}>
                  Local price: {entryFeeForLocals.children} (children), {entryFeeForLocals.adults} (adults)
                </p>
                <p style={{ color: theme.accentColor }}>
                  Foreign price: {entryFeeForForeigners.children} (children), {entryFeeForForeigners.adults} (adults)
                </p>
              </>
            )}

            <h4>Architecture Style</h4>
            <p style={{ color: theme.accentColor }}>{architecturalStyle}</p>

            <h4>Location</h4>
            <p style={{ color: theme.accentColor }}>
              Long: {coordinates.longitude}, Lat: {coordinates.latitude}
            </p>
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
