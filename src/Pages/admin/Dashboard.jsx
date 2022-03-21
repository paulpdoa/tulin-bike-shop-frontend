import { Helmet } from 'react-helmet';
import { useState,useEffect } from 'react';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import MostSelling from '../../components/dashboard/home/MostSelling';
import RecentOrders from '../../components/dashboard/home/RecentOrders';
import DashboardCard from '../../components/dashboard/home/DashboardCard';
import Datetime from '../../components/dashboard/partials/Datetime';
import { fetchData } from '../../helper/fetching';

const Dashboard = () => {

  const [isLoading,setIsLoading] = useState(true);

  const [customers,setCustomers] = useState([]);
  const [orders,setOrders] = useState([]);

  // get customers length
  useEffect(() => {
    const abortCont = new AbortController();
  
    fetchData({ signal:abortCont.signal },'/customer',setCustomers,setIsLoading);

    return () => abortCont.abort()
  },[customers])
  
  // get orders length
  useEffect(() => {
    const abortCont = new AbortController();

    fetchData({ signal:abortCont.signal },'/order',setOrders,setIsLoading);

    return () => abortCont.abort()
  },[orders])
  
  // Get total sales depending on orders
  // const extractOrdersTotal = orders.map((order) => order.cart_id.map((cart) => cart.inventory_id.product_price * cart.order_quantity));
  // let totalSales = 0;
  // for(let i = 0; i < extractOrdersTotal.length; i++) {
  //   totalSales += extractOrdersTotal.reduce((curr,init) => curr + init[i],0);
  // }
  // console.log(totalSales);
  
  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Dashboard</title></Helmet>
      <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Dashboard</h1>
          <Datetime />
        </div>
        <div className="flex gap-10 justify-around">
          <DashboardCard title='Total Orders' number={orders.length} color='bg-blue-500' icon={<BsBagCheck />} isLoading={isLoading} />
          <DashboardCard title='Total Sales' sign='₱' number={123} color='bg-green-500' icon={<AiOutlineDollarCircle />} isLoading={isLoading} />
          <DashboardCard title='Total Expenses' sign='₱' number='2273' color='bg-cyan-500' icon={<HiOutlineClipboardList />} isLoading={isLoading} />
          <DashboardCard title='Total Users' number={customers.length} color='bg-yellow-500' icon={<AiOutlineUser />} isLoading={isLoading} />
        </div>
        <div className="grid grid-cols-5 gap-5 mt-10 rounded h-56">
          <MostSelling />
          <RecentOrders />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
