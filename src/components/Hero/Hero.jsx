import "./Hero.css";


const Hero = ({ name, country, city, images, shortDescription}) => {
  return (
    <>
      <div
        className="container"
       style={{
    backgroundImage: `
    linear-gradient(
      rgba(30, 80, 180, 0.35),
      rgba(30, 80, 180, 0.35)
    ),
    url(${images[4]})
    `,

    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
}}
      >
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