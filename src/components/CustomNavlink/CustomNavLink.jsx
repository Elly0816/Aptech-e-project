import { NavLink } from 'react-router';
import './CustomNavLink.css';

export const CustomNavLink = ({ to, children, style, className }) => {
  return (
    <NavLink
      className={`navLink${className ? ' ' + className : ''}`}
      to={to}
      style={{ textDecoration: 'none', ...style }}
    >
      {children}
    </NavLink>
  );
};
