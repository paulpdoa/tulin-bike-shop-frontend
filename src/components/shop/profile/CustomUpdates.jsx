import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import { baseUrl } from '../../../helper/baseUrl';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const CustomUpdates = () => {

  const { numberFormat } = useContext(GlobalContext);
  const [orders,setOrders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchCustomOrders = async () => {
      try {
        const data = await axios.get(`${baseUrl()}/customize`,{ signal:abortCont.signal });
        setOrders(data.data);
        console.log(data.data);
      } 
      catch(err) {
        console.log(err);
      }
    }
    fetchCustomOrders();

    return () => abortCont.abort();
  },[orders])

  return (
    <div className="md:p-20 p-10 md:h-screen md:col-span-2 col-span-3 md:mt-0 -mt-10 relative">
        <div className="md:bg-gray-900 bg-gray-100 shadow-2xl md:shadow-none w-full h-4/5 md:text-gray-100 text-gray-800 rounded-md p-10 overflow-y-scroll">
            <h1 className="font-semibold md:text-4xl text-3xl py-1">Customize Orders</h1>
            <h2 className="font-semibold text-lg border-b-2 border-gray-400">Items</h2>
            { orders && orders.filter(order => order.customer_id._id === id).map(order => (
              <div key={order._id} className="flex mt-2 border-b border-gray-300">
                  <img className="w-44 h-auto" src={order.customized_bikeImg} alt="bike" />
                  <div className="flex flex-col">
                      <h1 className="font-semibold text-lg">Ordered on {moment(order.createdAt).format('MMMM Do YYYY')}</h1>
                      <p>{order.payment_method}</p>
                      { order.order_status === 'ordered' ? <p className="text-green-500 font-semibold">Delivered</p> : <span className="text-xs font-semibold text-red-500">You have a remaining balance of ₱{ numberFormat.format(order.amount_paid) }</span> }
                  </div>
              </div>
            )) }
        </div>
    </div>
  )
}

export default CustomUpdates