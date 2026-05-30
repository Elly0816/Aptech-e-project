import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Home from '../../components/Home/Home';
import monuments from '../../data/monuments.json';
import { useMonumentNumber } from '../../hooks/useRandomMonument';

const RANDOM_OTHER_NUMBER = Math.random();

export const HomePage = () => {
  // const { isMobile } = useDimensions();
  //DO NOT TOUCH THIS!
  const number = useMonumentNumber();
  const randomMonument = monuments[number];
  // console.log('This is the random monument: %s', JSON.stringify(randomMonument));

  const getNextMonument = (index) => {
    const selectIndexes = [number - 1, number, number + 1];
    let pickedNumber = Math.ceil(RANDOM_OTHER_NUMBER * monuments.length) + index;
    while (selectIndexes.includes(pickedNumber)) {
      // console.log('Initial other number: %f', pickedNumber);
      pickedNumber++;
    }
    // console.log('This is the other number: %f', pickedNumber);
    return monuments[pickedNumber % monuments.length];
  };

  return (
    <>
      <Header />
      <Home randomMonument={randomMonument} getNextMonument={getNextMonument} />
      <Footer />
    </>
  );
};
