import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState,useEffect,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const OrderHistory = () => {

  const [orders,setOrders] = useState([]);
  const { id } = useParams();
  const { imgLocation } = useContext(GlobalContext);

  useEffect(() => {
    const abortCont = new AbortController();
      const getOrdered = async () => {
        try {
          const data = await axios.get('/ordereditem',{ signal:abortCont.signal });
          setOrders(data.data);
        }
        catch(err) {
          console.log(err)
        }
      }
      getOrdered();
    return () => abortCont.abort();
  },[])

  return (
    <div className="md:p-20 p-10 md:h-screen md:col-span-2 col-span-3 md:mt-0 -mt-28">
        <div className="md:bg-gray-900 bg-gray-100 shadow-2xl md:shadow-none w-full h-4/5 md:text-gray-100 text-gray-800 rounded-md p-10 overflow-y-scroll">
            <h1 className="font-semibold md:text-4xl text-3xl py-1">Order History</h1>
            <h2 className="font-semibold text-lg border-b-2 border-gray-400">Items</h2>

            { orders && orders.map((order) => (
              order.cart_id.filter(item => id === item.customer_id).map((item) => (
                <div className="flex mt-3 border-b-2 border-gray-400 justify-between gap-2 select-none">
                  <div className="flex gap-2 py-2">
                    <img className="object-cover w-20 h-20 rounded" src={`${imgLocation}${item.inventory_id.product_image}`} alt={item.inventory_id.product_name} />
                    <div className="flex flex-col">
                      <h3 className="md:text-xl text-base whitespace-nowrap">{item.inventory_id.product_name}</h3>
                      <span className="text-sm">Description:</span>
                      <p className="text-xs">{item.inventory_id.product_description}</p>
                      <span className="text-sm">Qty. {item.order_quantity}</span>
                    </div>
                  </div>
                </div>
              ))
            )) }
            



        </div>
    </div>
  );
};

export default OrderHistory;
