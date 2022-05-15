import { Helmet } from 'react-helmet';
import { useContext,useEffect,useState } from 'react';
import { GlobalContext } from '../../helper/Context';
import { fetchData } from '../../helper/fetching';
import axios from 'axios';

import Datetime from '../../components/dashboard/partials/Datetime';
import NewOrders from '../../components/dashboard/orders/NewOrders';
import OrderHistory from '../../components/dashboard/orders/OrderHistory';
import OrderDetailModal from '../../components/modals/OrderDetailModal';
import Orderhistorydetail from '../../components/modals/admin/Orderhistorydetail';
import { baseUrl } from '../../helper/baseUrl';
import CustomOrders from '../../components/dashboard/orders/CustomOrders';
import CustombikeModal from '../../components/modals/admin/CustombikeModal';

const DashboardOrders = () => {

  const { showModal,idDetail,showOrderDetail,showCustomDetail } = useContext(GlobalContext);
  const [orderedItems,setOrderedItems] = useState([]);
  const [orderDetail,setOrderDetail] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  

  // For Found items
  const [foundUniqueId,setFoundUniqueId] = useState('');

  useEffect(() => {
    const abortCont = new AbortController();
    fetchData({ signal:abortCont.signal },`${baseUrl()}/cart/ordered/${idDetail}`,setOrderDetail,setIsLoading);
    return () => abortCont.abort();
  },[idDetail]);

  // Get All ordered items from showing item
  useEffect(() => {
    const abortCont = new AbortController();

    axios.get(`${baseUrl()}/neworders`,{ signal:abortCont.signal })
    .then((data) => {
      setOrderedItems(data.data);
    })
    
    return () => abortCont.abort();
  },[])

  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Orders</title></Helmet>
      <div className="p-20 relative">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Orders</h1>
          <Datetime />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="search">Search Unique ID:</label>
          <input type="text" 
            className="outline-none p-2 rounded w-1/3 border border-gray-300" 
            onChange={(e) => setFoundUniqueId(e.target.value)} 
            placeholder="Enter id here..."
          />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-5 mt-10">
         <NewOrders foundUniqueId={foundUniqueId} />
         <OrderHistory />
         <CustomOrders />
        </div>
        { showModal && <OrderDetailModal /> }
        { showOrderDetail && <Orderhistorydetail /> }
        { showCustomDetail && <CustombikeModal /> }
      </div>
    </>
    );
};

export default DashboardOrders;
