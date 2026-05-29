import { useMemo, useState } from 'react';
import monuments from '../data/monuments.json';

const filters = Array.from(new Set(monuments.flatMap((m) => m.tags.map((t) => t))).values());
console.log(filters);

const getRandomNumber = () => {
  return Math.random();
};

export const useMonuments = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  //   const [randomMonument, setRandomMonument] = useState();

  const data = useMemo(() => {
    if (activeFilters.length === 0) return monuments;
    return monuments.filter((m) => m.tags.some((t) => activeFilters.includes(t)));
  }, [activeFilters]);

  const addToActiveFilters = (item) => {
    setActiveFilters((prev) => [...prev, item]);
  };

  const removeFromActiveFilters = (item) => {
    setActiveFilters((prev) => prev.filter((i) => i !== item));
  };

  //   useEffect(() => {
  //     const randomNumber = Math.min((Math.random()*monuments.length)+1, monuments.length);
  //     setRandomMonument(monuments[randomNumber])
  // }, []);

  const randomMonument = useMemo(() => {
    const randomNumber = Math.min(getRandomNumber() * monuments.length + 1, monuments.length);
    return monuments[randomNumber];
  }, []);

  return {
    monuments: data,
    filters,
    addToFilters: addToActiveFilters,
    removeFromFilters: removeFromActiveFilters,
    activeFilters,
    randomMonument,
  };
};
