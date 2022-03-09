import { fetchData } from '../../../helper/fetching';
import { useState,useEffect,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const NewOrders = () => {

    const [newOrders,setNewOrders] = useState([]);
    const { imgLocation } = useContext(GlobalContext);
    
    useEffect(() => {
        const abortCont = new AbortController();
        
        fetchData({ signal:abortCont.signal },'/neworders',setNewOrders);

        return () => abortCont.abort()
    },[newOrders]);

    console.log(newOrders);
  return (
    <div className="p-10 rounded bg-gray-100 text-gray-800 shadow-lg col-span-1 h-96 overflow-y-scroll">
        <h1 className="text-2xl uppercase font-semibold">New Orders</h1>
        
        { newOrders && newOrders.map((newOrder) => (
            newOrder.cart_id.map((order) => (
                <div className="flex justify-between" key={order._id}>
                    <div className="flex gap-2 items-center mt-4">
                        <img className="object-cover w-20 h-20" src={`${imgLocation}${order.inventory_id.product_image}`} alt="Orderd item" />
                        <div className="flex flex-col text-gray-800">
                            <h2 className="font-semibold text-lg">{ order.inventory_id.brand_name }</h2>
                            <span className="text-sm">{ order.inventory_id.product_name }</span>
                            <span className="text-xs">Qty. { order.order_quantity }</span>
                        </div>
                    </div>
                    <button className="p-2 rounded text-gray-100 bg-gray-900 h-1/2 self-end">Details</button>
                </div>
            ))
        )) }
       
        
    </div>
  )
}

export default NewOrders