import './Hero.css';

const Hero = ({ name, country, city, images, shortDescription }) => {
  return (
    <>
      <div className="container" style={{ background: `url(${images[0]}) center/cover no-repeat, rgba(0, 0, 0, 0.5)` }}>
        <div className="h4s">
          <h4 className="abc">{country}</h4>
          <h4 className="acb">{city}</h4>
        </div>
        <h1>{name}</h1>
        <p className="shortp">{shortDescription}</p>
      </div>
    </>
  );
};

export default Hero;
