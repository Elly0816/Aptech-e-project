import ContactUs from '../../components/Contactus/ContactUs';
import Feedback from '../../components/Feedback/Feedback';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useDimensions } from '../../hooks/useDimensions';
import './About.css';

export const About = () => {
  const { isMobile } = useDimensions();
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
        <div className="contact-feedback-container">
          {isMobile ? (
            <>
              <ContactUs />
              <Feedback />
            </>
          ) : (
            <>
              <Feedback />
              <ContactUs />
            </>
          )}
        </div>
        <div className="spotlight-section">
          <img src="./assets/OIP.webp" alt="spotlight-image" className="spotlight-image" />
          <div className="spotlight-overlay">
            <span className="spotlight-label">CURRENT SPOTLIGHT</span>
            <h2 className="spotlight-title">The Great Library at Ephesus</h2>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
