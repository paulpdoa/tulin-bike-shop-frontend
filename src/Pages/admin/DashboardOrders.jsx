import { Helmet } from 'react-helmet';
import { useContext,useEffect,useState } from 'react';
import { GlobalContext } from '../../helper/Context';
import { fetchData } from '../../helper/fetching';
import axios from 'axios';

import Datetime from '../../components/dashboard/partials/Datetime';
import NewOrders from '../../components/dashboard/orders/NewOrders';
import OrderHistory from '../../components/dashboard/orders/OrderHistory';
import OrderDetailModal from '../../components/modals/OrderDetailModal';

const DashboardOrders = () => {

  const { showModal,idDetail } = useContext(GlobalContext);
  const [orderedItems,setOrderedItems] = useState([]);
  const [orderDetail,setOrderDetail] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  // For Found items
  const [foundUniqueId,setFoundUniqueId] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    fetchData({ signal:abortCont.signal },`/cart/ordered/${idDetail}`,setOrderDetail,setIsLoading);
    return () => abortCont.abort();
  },[idDetail]);

  // Get All ordered items from showing item
  useEffect(() => {
    const abortCont = new AbortController();

    axios.get('/neworders',{ signal:abortCont.signal })
    .then((data) => {
      setOrderedItems(data.data);
    })
    
    return () => abortCont.abort();
  },[])

  // Allow to search id
  const searchUniqueId = (e) => {
    const searchedId = e.target.value;
    
    const data = orderedItems.filter((order) => {
      return order.uniqueOrder_id.toLowerCase().includes(searchedId.toLowerCase());
    });
    setFoundUniqueId(data);
  }
  


  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Orders</title></Helmet>
      <div className="p-20 relative">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Orders</h1>
          <Datetime />
        </div>
        <div className="flex flex-col">
          <label htmlFor="search">Search Unique ID</label>
          <input type="text" 
            className="outline-none p-2 rounded w-1/3 border border-gray-300" 
            onChange={searchUniqueId} 
          />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10">
         <NewOrders />
         <OrderHistory />
        </div>
        { showModal && <OrderDetailModal /> }
      </div>
    </>
    );
};

export default DashboardOrders;
