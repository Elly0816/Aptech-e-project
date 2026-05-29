import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Home from '../../components/Home/Home';
import monuments from '../../data/monuments.json';
import { useMonumentNumber } from '../../hooks/useRandomMonument';

export const HomePage = () => {
  // const { isMobile } = useDimensions();
  //DO NOT TOUCH THIS!
  const number = useMonumentNumber();
  const randomMonument = monuments[number];
  console.log('This is the random monument: %s', JSON.stringify(randomMonument));
  const getNextMonument = (index) => {
    return monuments[index % monuments.length];
  };

  return (
    <>
      <Header />
      <Home randomMonument={randomMonument} getNextMonument={getNextMonument} />
      <Footer />
    </>
  );
};
