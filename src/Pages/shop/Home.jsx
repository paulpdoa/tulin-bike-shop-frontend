import Header from '../../components/shop/home/Header';
import Offers from '../../components/shop/home/Offers';
import Build from '../../components/shop/home/Build';
import Description from '../../components/shop/home/Description';
import { Helmet } from 'react-helmet';

const Home = () => {
  
  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Home</title></Helmet>
        <Header />
        <Offers />
        <Build />
        <Description />
    </>
  );
};

export default Home;
