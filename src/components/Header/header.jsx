import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { useMonumentNumber } from '../../hooks/useRandomMonument';
import './Header.css';

const navItems = ['Explore', 'Continents', 'Monument', 'Gallery', 'Saved', 'About'];

const Header = () => {
  const number = useMonumentNumber();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(
    pathname === '/' ? 'Explore' : pathname.charAt(0).toUpperCase() + pathname.slice(1)
  );
  // console.log('location: %s', JSON.stringify(pathname));
  // const navItems = ['Explore', 'Continents', 'Gallery', 'Saved', 'About'];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Brand Name */}
        <div className="navbar-logo">Global Heritage</div>

        {/* Center: Navigation Links */}
        <ul className="navbar-links">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item === 'Explore' ? '/' : item === 'Monument' ? `/monument/${number}` : `/${item.toLowerCase()}`}
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => setActiveTab(item)}
              style={() => ({ textDecoration: 'none', fontWeight: activeTab === item ? 'bold' : 600 })}
              end
            >
              {item}
            </NavLink>
          ))}
        </ul>

        {/* Right: User Profile Icon */}
        <div className="navbar-profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="profile-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Header;
