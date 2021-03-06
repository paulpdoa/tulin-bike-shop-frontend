
import { useState,useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../helper/fetching';
import { GlobalContext } from '../../../helper/Context';
import ProfileOrderModal from '../../modals/ProfileOrderModal';
import { baseUrl } from '../../../helper/baseUrl';
const ProfileOrders = () => {

  const { id } = useParams();
  const [orders,setOrders] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const { imgLocation } = useContext(GlobalContext);
  const [showOrderModal,setShowOrderModal] = useState(false);
  const [detailId,setDetailId] = useState('');
  const [orderId,setOrderId] = useState('');

  useEffect(() => {
    const abortCont = new AbortController();

    fetchData({ signal:abortCont.signal },`${baseUrl()}/cart/processed`,setOrders,setIsLoading);

    return () => abortCont.abort();
  },[orders,id])

  const viewOrderDetail = (id) => {
    setDetailId(id);
    setShowOrderModal(true);
    setOrderId(id)
  }

  return (
    <div className="md:p-20 p-10 md:h-screen md:col-span-2 col-span-3 md:mt-0 -mt-10 relative">
        <div className="md:bg-gray-900 bg-gray-100 shadow-2xl md:shadow-none w-full h-4/5 md:text-gray-100 text-gray-800 rounded-md p-10 overflow-y-scroll">
            <h1 className="font-semibold md:text-4xl text-3xl py-1">Orders</h1>
            <h2 className="font-semibold text-lg border-b-2 border-gray-400">Items</h2>
            { isLoading ? <h1 className="text-xl font-semibold animate-pulse">Please wait...</h1> :
            <>
              { orders && orders.filter(order => order.customer_id === id).map(order => (
                <div key={order._id} className="flex mt-3 border-b-2 border-gray-400 justify-between gap-2 select-none">
                  <div className="flex gap-2 py-2">
                    <img className="object-cover w-20 h-20 rounded" src={ `${imgLocation}${order.inventory_id.product_image}` } alt={ order.inventory_id.product_name } />
                    <div className="flex flex-col">
                      <h2 className="md:text-xl text-base whitespace-nowrap">{ order.inventory_id.product_name }</h2>
                      <span className="text-sm">Description:</span>
                      <p className="md:text-sm text-xs">{ order.inventory_id.product_description }</p>
                      <span className="text-xs">Qty. { order.order_quantity }</span>
                      <span className="text-xs">{ order.payment_method }</span>
                    </div>
                  </div>
                  <button onClick={() => viewOrderDetail(order._id)} className="bg-green-500 text-gray-100 tracking-wide h-1/2 self-end block md:text-xl text-xs p-1 md:p-2 rounded m-2">Details</button>
                </div>
              )) } 
            </>
            }
        </div>
        { showOrderModal && <ProfileOrderModal detailId={detailId} orderId={orderId} close={setShowOrderModal} /> }
    </div>
  );
};

export default ProfileOrders;
