import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Continent } from '../../components/Continents/Continent';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import monuments from '../../data/monuments.json';
import './Continents.css';

const DISPLAY_ORDER = ['Africa', 'Europe', 'Asia', 'South America', 'North America', 'Oceania', 'Antarctica'];

export const Continents = () => {
  const navigate = useNavigate();

  // Pick a representative image for each continent (first monument encountered)
  const representative = useMemo(() => {
    const map = {};
    for (const m of monuments) {
      const c = m.continent ?? 'Unknown';
      if (!map[c]) map[c] = m.images?.[0] ?? '';
    }
    return map;
  }, []);

  const continents = DISPLAY_ORDER.filter((c) => representative[c]).map((c) => ({ name: c, image: representative[c] }));

  const openContinent = (name) => {
    // const slug = name.toLowerCase().replace(/\s+/g, '-');
    const slug = name.replace('-', '+');
    navigate(`/gallery?filter=${encodeURIComponent(slug)}`);
  };

  return (
    <>
      <Header />

      <Continent continents={continents} openContinent={openContinent} representative={representative} />

      <Footer />
    </>
  );
};
