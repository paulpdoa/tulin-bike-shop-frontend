import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { GlobalContext } from '../../helper/Context';
import SidebarMenu from '../../components/shop/customization/SidebarMenu';
import BikeBuilt from '../../components/shop/customization/BikeBuilt';
import CustomBuildsModal from '../../components/modals/CustomBuildsModal';
import OpenCustomBuilds from '../../components/modals/OpenCustomBuilds';
import CustomButton from '../../components/modals/CustomButton';

const Customization = () => {

  const { showSelectedParts } = useContext(GlobalContext);

  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | Customize</title></Helmet>
          <div className="customize-bg content">
            <div className="flex flex-col md:flex-row justify-between items-center md:h-screen h-auto">
              <SidebarMenu />
              <BikeBuilt />
              <CustomButton />
              { showSelectedParts ? <CustomBuildsModal /> : <OpenCustomBuilds /> }
            </div>
          </div>
          {/* <CustomChoice setBuild={setBuild} /> */}
      </>
  );
};

export default Customization;
