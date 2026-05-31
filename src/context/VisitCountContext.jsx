import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const VisitContext = createContext();

export const VisitProvider = ({ children }) => {
  const [visits, setVisits] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const key = 'visit_count';

    const current = Number(localStorage.getItem(key) ?? '0');
    const updated = current + 1;

    localStorage.setItem(key, String(updated));
    setVisits(updated);
  }, []);

  return <VisitContext.Provider value={{ visits }}>{children}</VisitContext.Provider>;
};

export const useVisit = () => {
  const context = useContext(VisitContext);

  if (!context) {
    throw new Error('useVisit must be used inside VisitProvider');
  }

  return context;
};
