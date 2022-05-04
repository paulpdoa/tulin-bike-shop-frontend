import { Helmet } from 'react-helmet';
import { useState } from 'react';
import SidebarMenu from '../../components/shop/customization/SidebarMenu';
import BikeBuilt from '../../components/shop/customization/BikeBuilt';
import SendBuiltBike from '../../components/shop/customization/SendBuiltBike';
import CustomChoice from '../../components/shop/customization/CustomChoice';
import products from '../../json/products.json';

const Customization = () => {

  const [itemId,setItemId] = useState(0);

  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | Customize</title></Helmet>
          <div className="customize-bg content">
            <div className="max-content grid grid-cols-3 items-center justify-items-stretch h-screen">
              <SidebarMenu />
              <BikeBuilt itemId={itemId}/>
              <SendBuiltBike />
            </div>
          </div>
          <CustomChoice products={products.products} setItemId={setItemId} />
      </>
  );
};

export default Customization;
