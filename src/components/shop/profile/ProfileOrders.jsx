
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../helper/fetching';

const ProfileOrders = () => {

  const { id } = useParams();
  const [orders,setOrders] = useState([]);
  const imgLocation = "http://localhost:8000/uploads/products/";

  useEffect(() => {
    const abortCont = new AbortController();

    fetchData({ signal:abortCont.signal },`/order/${id}`,setOrders);

    return () => abortCont.abort();
  },[orders,id])

  return (
    <div className="p-20 h-screen col-span-2">
        <div className="bg-gray-900 w-full h-4/5 text-gray-100 rounded-md p-10 overflow-y-scroll">
            <h1 className="font-semibold text-4xl py-1">Orders</h1>
            <h2 className="font-semibold text-lg border-b-2 border-gray-400">Items</h2>

            { orders.length < 1 ? <h1 className="text-gray-300 animate-pulse mt-5 font-bold text-3xl">No items yet...</h1> : 
            orders.map((order) => (
              order.cart_id.map((item) => (
                <div key={item._id} className="flex mt-3 border-b-2 border-gray-400 justify-between gap-2 select-none">
                <div className="flex gap-2 py-2">
                  <img className="object-cover w-20 h-20 rounded" src={ `${imgLocation}${item.inventory_id.product_image}` } alt="cycle" />
                  <div className="flex flex-col">
                    <h2 className="text-xl">{ item.inventory_id.product_name }</h2>
                    <span className="text-sm">Description:</span>
                    <p className="text-xs">{ item.inventory_id.product_description }</p>
                    <span className="text-sm">Qty. { item.order_quantity }</span>
                  </div>
                </div>
                <button className="bg-green-500 tracking-wide h-1/2 self-end p-2 rounded m-2">Details</button>
              </div>
              ))
            )) }
        </div>
    </div>
  );
};

export default ProfileOrders;
