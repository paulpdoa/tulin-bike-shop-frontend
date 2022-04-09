import { Helmet } from 'react-helmet';
import Hero from '../../components/shop/about/Hero';
import Info from "../../components/shop/about/Info";
import Services from '../../components/shop/about/Services';
import Testimonials from '../../components/shop/about/Testimonials';

const About = () => {
  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | About</title></Helmet>
          <Hero />
          <Info />
          <Services />
          <Testimonials />
      </>
  );
};

export default About;
    