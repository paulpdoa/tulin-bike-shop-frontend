import { Helmet } from 'react-helmet';
import SidebarMenu from '../../components/shop/customization/SidebarMenu';
import BikeBuilt from '../../components/shop/customization/BikeBuilt';
import SendBuiltBike from '../../components/shop/customization/SendBuiltBike';
import CustomChoice from '../../components/shop/customization/CustomChoice';

const Customization = () => {
  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | Customize</title></Helmet>
          <div className="customize-bg content">
            <div className="max-content grid grid-cols-3 items-center justify-items-stretch">
              <SidebarMenu />
              <BikeBuilt />
              <SendBuiltBike />
            </div>
          </div>
          <CustomChoice />
      </>
  );
};

export default Customization;
