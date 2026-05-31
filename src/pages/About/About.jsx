import ContactUs from '../../components/Contactus/ContactUs';
import Feedback from '../../components/Feedback/Feedback';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useDimensions } from '../../hooks/useDimensions';
import { useMonuments } from '../../hooks/useMonuments';
import { CustomNavLinkWithH2 } from '../../components/CustomNavlink/CustomNavLink';
import './About.css';

const randomNumber = Math.random();

export const About = () => {
  const { isMobile } = useDimensions();

  const { randomMonument } = useMonuments();
  // console.log(randomMonument);
  return (
    <>
      <Header />
      <section className="contact-section">
        <div className="quote-box">
          <div className="quote-line"></div>

          <div>
            <p className="quote">
              “A people without the knowledge of their past history, origin and culture is like a tree without roots.”
            </p>

            <span className="author">— MARCUS GARVEY</span>
          </div>
        </div>
        {isMobile && (
          <div className="quote-line-mobile">
            <h3>SCHOLARLY EXCELLENCE</h3>
            <p>
              Your insights help us refine the digital tapestry of human history. Every contribution is reviewed by our
              archival team to ensure the hightst standards of historical accuracy and digital preservation.
            </p>
          </div>
        )}
        <div className={`${isMobile ? 'contact-feedback-container-mobile' : 'contact-feedback-container'}`}>
          {isMobile ? (
            <>
              <ContactUs className={`contact-feedback-card-mobile`} />
              <Feedback className={`contact-feedback-card-mobile`} />
            </>
          ) : (
            <>
              <Feedback className={`contact-feedback-card`} />
              <ContactUs className={`contact-feedback-card`} />
            </>
          )}
        </div>
        <div
          className="spotlight-section"
          style={{
            background: `url(${randomMonument.images[Math.floor(randomNumber * randomMonument.images.length)]}) center/cover no-repeat`,
          }}
        >
          {/* <img
            src={randomMonument.images[Math.floor(randomNumber * randomMonument.images.length)]}
            alt={randomMonument.name}
            className="spotlight-image"
          /> */}
          <div className="spotlight-overlay">
            <span className="spotlight-label">CURRENT SPOTLIGHT</span>
            <CustomNavLinkWithH2 to={`/monuments/${randomMonument.id}`} monument={randomMonument} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
