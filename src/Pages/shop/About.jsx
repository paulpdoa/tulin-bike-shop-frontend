import { Helmet } from 'react-helmet';
import Hero from '../../components/shop/about/Hero';
import Info from "../../components/shop/about/Info";

const About = () => {
  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | About</title></Helmet>
          <Hero />
          <Info />
          
          
      </>
  );
};

export default About;
    