import { useState } from 'react';
import { useLocation } from 'react-router';
import './Footer.css';

const Footer = () => {
  const [activeTab, setActiveTab] = useState('Explore');
  const { pathname } = useLocation();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section: Split between description and links */}
        <div className="footer-main">
          {/* Left Block: Logo, Info, and Social Icons */}
          <div className="footer-brand-section">
            <h3 className="footer-logo" style={{ fontWeight: 600 }}>
              Global Heritage
            </h3>
            <p className="footer-description">
              © 2026 Global Heritage. Preserving history through modern discovery.
              {pathname === '/' &&
                "We are a digital archive dedicated to the immersive exploration of humanity's greatest achievements."}
            </p>

            <div className="footer-icons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="footer-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="footer-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="footer-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </div>
          </div>

          {/* Right Blocks: Directory links */}
          <div className="footer-links-section">
            <div className="footer-column">
              <h4>
                DISCO
                <br />
                VER
              </h4>
              <ul>
                <li>
                  <a href="#europe">Europe</a>
                </li>
                <li>
                  <a href="#asia">Asia & Pacific</a>
                </li>
                <li>
                  <a href="#americas">Americas</a>
                </li>
                <li>
                  <a href="#africa">Africa</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>
                ORGANIZAT
                <br />
                ION
              </h4>
              <ul>
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms">Terms of Service</a>
                </li>
                <li>
                  <a href="#accessibility">Accessibility</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Tagline */}
        <div className="footer-bottom">
          <span className="footer-tagline">Designed with reverence for the past.</span>
        </div>
      </div>

      {/* Mobile App-Style Bottom Navigation Bar */}
      <div className="mobile-bottom-nav">
        <div
          className={`mobile-nav-item ${activeTab === 'Explore' ? 'active' : ''}`}
          onClick={() => setActiveTab('Explore')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="mobile-nav-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L10.5 12l3.75 2.25-1.5-4.5z" />
          </svg>
          <span>Explore</span>
        </div>

        <div
          className={`mobile-nav-item ${activeTab === 'Continents' ? 'active' : ''}`}
          onClick={() => setActiveTab('Continents')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="mobile-nav-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
          </svg>
          <span>Continents</span>
        </div>

        <div
          className={`mobile-nav-item ${activeTab === 'Gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('Gallery')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="mobile-nav-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span>Gallery</span>
        </div>

        <div
          className={`mobile-nav-item ${activeTab === 'Saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('Saved')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="mobile-nav-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          <span>Saved</span>
        </div>

        <div
          className={`mobile-nav-item ${activeTab === 'About' ? 'active' : ''}`}
          onClick={() => setActiveTab('About')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="mobile-nav-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <span>About</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
