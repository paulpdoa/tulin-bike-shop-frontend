import { Helmet } from 'react-helmet';
import Info from "../../components/shop/about/Info";
import Location from '../../components/shop/about/Location';
import Mission from "../../components/shop/about/Mission";

const About = () => {
  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | About</title></Helmet>
          <Info />
          <Mission />
          {/* <Location /> */}
      </>
  );
};

export default About;
    