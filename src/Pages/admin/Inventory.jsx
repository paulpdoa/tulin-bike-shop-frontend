import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { GlobalContext } from '../../helper/Context';
import InventoryDetail from '../../components/modals/admin/InventoryDetail';

const Inventory = () => {

  const { showInventoryDetail } = useContext(GlobalContext);

  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Inventory</title></Helmet>
      <Outlet />
      { showInventoryDetail && <InventoryDetail /> }
    </>
  )
};

export default Inventory;
