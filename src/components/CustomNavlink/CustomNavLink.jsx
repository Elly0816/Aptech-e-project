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

export const CustomNavLinkWithH4 = ({ monument }) => {
  return (
    <CustomNavLink to={`/monument/${monument.id}`}>
      <span className="node-year">{monument.yearBuilt}</span>
      <h4>{monument.name}</h4>
    </CustomNavLink>
  );
};

export const CustomNavlinkWithP = ({ monument }) => {
  return (
    <CustomNavLink to={`/monument/${monument.id}`}>
      <p>{monument.shortDescription}</p>
    </CustomNavLink>
  );
};
