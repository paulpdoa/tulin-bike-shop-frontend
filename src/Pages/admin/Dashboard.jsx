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
import { baseUrl } from '../../helper/baseUrl';
import axios from 'axios';

const Dashboard = () => {

  const [isLoading,setIsLoading] = useState(true);

  const [customers,setCustomers] = useState([]);
  const [orders,setOrders] = useState([]);
  const [sales,setSales] = useState(0);
  const [expense,setExpense] = useState(0);

  // get customers length
  useEffect(() => {
    const abortCont = new AbortController();
  
    fetchData({ signal:abortCont.signal },`${baseUrl()}/customer`,setCustomers,setIsLoading);

    return () => abortCont.abort()
  },[customers])
  
  // get orders length
  useEffect(() => {
    const abortCont = new AbortController();

    fetchData({ signal:abortCont.signal },`${baseUrl()}/ordereditem`,setOrders,setIsLoading);

    return () => abortCont.abort()
  },[orders])
  
  // Get total sales
  useEffect(() => {
    const abortCont = new AbortController();
    let totalPrice = 0;

    const carts = orders.map(order => order.amount_paid);
    
    const inventories = carts.map(cart => cart);
    for(let i = 0; i < inventories.length; i++) {
      totalPrice += inventories[i];
    }
    
    setSales(totalPrice);

    return () => abortCont.abort()
  },[orders])

  useEffect(() => {
    const abortCont = new AbortController();
    
    const getExpense = async () => {
      try {
        const data = await axios.get(`${baseUrl()}/expense`,{ signal:abortCont.signal });
        const totalExpense = data.data.reduce((total,curr) => total + curr.amount ,0);
        setExpense(totalExpense);
      }
      catch(err) {
        console.log(err)
      } 
    }
    getExpense();

    return () => abortCont.abort()
  },[])
  
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
          <DashboardCard title='Total Sales' sign='₱' number={sales} color='bg-green-500' icon={<AiOutlineDollarCircle />} isLoading={isLoading} />
          <DashboardCard title='Total Expenses' sign='₱' number={expense} color='bg-cyan-500' icon={<HiOutlineClipboardList />} isLoading={isLoading} />
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
