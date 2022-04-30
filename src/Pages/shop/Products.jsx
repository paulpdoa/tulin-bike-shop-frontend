import { Outlet } from 'react-router-dom';

import ProductSidebar from '../../components/shop/products/ProductSidebar';

const Products = () => {

  return (
      <div className="grid md:grid-cols-3 grid-cols-1">
        <ProductSidebar />
        <Outlet />
      </div>
  );
};

export default Products;
