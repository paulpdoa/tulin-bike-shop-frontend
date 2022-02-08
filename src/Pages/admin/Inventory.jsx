import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Inventory = () => {
  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Inventory</title></Helmet>
      <Outlet />
    </>
  )
};

export default Inventory;
