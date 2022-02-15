import { Helmet } from 'react-helmet';
import Datetime from '../../components/dashboard/partials/Datetime';
import NewOrders from '../../components/dashboard/orders/NewOrders';
import OrderHistory from '../../components/dashboard/orders/OrderHistory';

const DashboardOrders = () => {
  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Orders</title></Helmet>
      <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Orders</h1>
          <Datetime />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10">
         <NewOrders />
         <OrderHistory />
        </div>
      </div>
    </>
    );
};

export default DashboardOrders;
