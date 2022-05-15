import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import { baseUrl } from '../../../helper/baseUrl';
const OrderHistory = () => {

  const [orders,setOrders] = useState([]);
  const { imgLocation,setShowOrderDetail,setHistoryOrderId } = useContext(GlobalContext);

  useEffect(() => {
      const abortCont = new AbortController();

      const getOrders = async () => {
        try {
            const data = await axios.get(`${baseUrl()}/ordereditem`,{ signal:abortCont.signal });
            setOrders(data.data);
        }   
        catch(err) {
            console.log(err)
        }
      }
      getOrders();

      return () => abortCont.abort();
  },[])

  const viewOrderDetail = (id) => {
    setShowOrderDetail(true)
    setHistoryOrderId(id);
    console.log(id);
  }

  return (
    <div className="p-10 rounded bg-gray-100 text-gray-800 shadow-lg col-span-1 h-96 overflow-y-scroll">
        <h1 className="text-2xl uppercase font-semibold">Order History</h1>
        { orders && orders.map((order) => (
            order.cart_id.map((item) => (
                <div className="flex justify-between" key={item._id}>
                    <div className="flex gap-2 items-center mt-4">
                        <img className="object-cover w-full h-20" src={`${imgLocation}${item.inventory_id.product_image}`} alt={item.inventory_id.product_name} />
                        <div className="flex flex-col text-gray-800">
                            <h2 className="font-semibold text-lg">{item.inventory_id.brand_name}</h2>
                            <span className="text-sm whitespace-nowrap">{item.inventory_id.product_name}</span>
                            <span className="text-xs">Qty. { item.order_quantity }</span>
                        </div>
                    </div>
                    <button onClick={() => viewOrderDetail(item.inventory_id._id)} className="p-2 rounded text-gray-100 bg-gray-900 h-1/2 self-end">Details</button>
                </div>
            ))
        )) }
    </div>
  )
}

export default OrderHistory