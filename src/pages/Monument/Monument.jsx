import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import { Mon } from '../../components/Mon/Mon';
import monuments from '../../data/monuments.json';

export const Monument = () => {
  //DO NOT TOUCH!
  let { id } = useParams();

  //DO NOT TOUCH!
  let monument = monuments.filter((m) => m.id.toString() === id.toString())[0];

  console.log('This is the id: %d', id);
  //   console.log('These are the monuments: %s', JSON.stringify(monuments));
  console.log('This is the monument: ');
  console.log(monument);

  return (
    <>
      <Header />

      <Hero
        key={monument.id}
        name={monument.name}
        country={monument.country}
        city={monument.city}
        images={monument.images}
        shortDescription={monument.shortDescription}
      />

      <Mon
        // key={monument.id}
        name={monument.name}
        historicalSignificance={monument.historicalSignificance}
        fullDescription={monument.fullDescription}
        images={monument.images}
        shortDescription={monument.shortDescription}
        address={monument.location.address}
        openingHours={monument.visitingInfo.openingHours}
        closingHours={monument.visitingInfo.closingHours}
        local={monument.visitingInfo.entryFee.local}
        foreign={monument.visitingInfo.entryFee.foreign}
        architecturalStyle={monument.architecturalStyle}
        facts={monument.facts}
      />

      <Footer />
    </>
  );
};
