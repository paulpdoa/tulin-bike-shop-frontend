import { Outlet } from 'react-router-dom';

import ProductSidebar from '../../components/shop/products/ProductSidebar';

const Products = () => {

  return (
      <div className="grid grid-cols-3">
        <ProductSidebar />
        <Outlet />
      </div>
  );
};

export default Products;
