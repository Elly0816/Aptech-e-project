import { useMemo } from 'react';
import { Continent } from '../../components/Continents/Continent';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import monuments from '../../data/monuments.json';
import './Continents.css';

const DISPLAY_ORDER = ['Africa', 'Europe', 'Asia', 'South America', 'North America', 'Oceania', 'Antarctica'];

const RANDOM_NUMBER = Math.random();

export const Continents = () => {
  // const navigate = useNavigate();

  // Pick a representative image for each continent (first monument encountered)
  const representative = useMemo(() => {
    const map = {};
    for (const m of monuments) {
      const c = m.continent ?? 'Unknown';
      const image = m.images[Math.ceil(RANDOM_NUMBER * (m.images.length - 1))];
      if (!map[c]) map[c] = image ?? '';
    }
    return map;
  }, []);

  console.log('representatives: ');
  console.log(representative);

  const continents = DISPLAY_ORDER.filter((c) => representative[c]).map((c) => ({ name: c, image: representative[c] }));

  // const openContinent = (name) => {
  //   // const slug = name.toLowerCase().replace(/\s+/g, '-');
  //   const slug = name.replace('-', '+');
  //   navigate(`/gallery?filter=${encodeURIComponent(slug)}`);
  // };

  return (
    <>
      <Header />

      <Continent continents={continents} representative={representative} />

      <Footer />
    </>
  );
};
