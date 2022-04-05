import Header from '../../components/shop/home/Header';
import Offers from '../../components/shop/home/Offers';
import Build from '../../components/shop/home/Build';
import { Helmet } from 'react-helmet';
import Repair from '../../components/shop/home/Repair';
import TopProduct from '../../components/shop/home/TopProduct';

const Home = () => {
  
  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Home</title></Helmet>
        <Header />
        <Offers />
        <TopProduct />
        <Build />
        <Repair />
    </>
  );
};

export default Home;
