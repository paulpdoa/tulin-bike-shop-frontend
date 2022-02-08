import { Helmet } from 'react-helmet';

import ProductCard from './ProductCard';
import ProductHeader from './ProductHeader';

const ShopBike = ({ bikes }) => {

  return (
    <div className="col-span-2 p-20 h-screen">
      <Helmet><title>Tulin Bicycle Shop | Bicycles</title></Helmet>
      <h1 className="text-4xl text-gray-800 font-semibold uppercase">Bicycles</h1>
      <ProductHeader />
      <div className="grid grid-cols-3 gap-5 mt-5">
          { bikes.length < 1 ? <h1 className="font-bold text-5xl text-gray-700 animate-pulse">There is no items yet</h1> : 
            bikes && bikes.map((product) => (
              <ProductCard product={product} />
            )) 
          }
      </div>
    </div>
      
  );
};

export default ShopBike;
