import { Helmet } from 'react-helmet';
import { useState } from 'react';
import SidebarMenu from '../../components/shop/customization/SidebarMenu';
import BikeBuilt from '../../components/shop/customization/BikeBuilt';
import SendBuiltBike from '../../components/shop/customization/SendBuiltBike';
import CustomChoice from '../../components/shop/customization/CustomChoice';
import products from '../../json/products.json';

const Customization = () => {

  const [itemId,setItemId] = useState(0);
  const [active,setActive] = useState('frame');
  const [build,setBuild] = useState([]);
  const [prodCode,setProdCode] = useState('');

  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | Customize</title></Helmet>
          <div className="customize-bg content">
            <div className="max-content grid grid-cols-3 items-center justify-items-stretch h-screen">
              <SidebarMenu active={active} setActive={setActive} />
              <BikeBuilt itemId={itemId} products={products.products} prodCode={prodCode} />
              <SendBuiltBike itemId={itemId} build={build} prodCode={prodCode} setProdCode={setProdCode} setBuild={setBuild} />
            </div>
          </div>
          <CustomChoice products={products.products} setItemId={setItemId} setActive={setActive} active={active} setBuild={setBuild} setProdCode={setProdCode} prodCode={prodCode} />
      </>
  );
};

export default Customization;
