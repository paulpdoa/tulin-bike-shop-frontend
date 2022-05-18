import { AiOutlineClose,AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useContext,useEffect,useState } from 'react';
import { motion } from 'framer-motion';
import { GlobalContext } from '../../helper/Context';
import axios from 'axios';
import { baseUrl } from '../../helper/baseUrl';

const popModalVar = {
  hidden: {
    opacity:0,
    scale:0,
    transition: {
      type:'spring',
      duration:0.9
    }
  },
  visible: {
    opacity:1,
    scale:1,
    transition: {
      type:'spring',
      duration:0.9
    }
  }
}

const OrderDetailModal = () => {

  const { setShowModal,idDetail,imgLocation,setAlertMssg,setShowAlert } = useContext(GlobalContext);
  const [orderDetails,setOrderDetails] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
 
  useEffect(() => {
    const abortCont = new AbortController();

    axios.get(`${baseUrl()}/neworders`,{ signal:abortCont.signal })
    .then((data) => {
      setOrderDetails(data.data);
      setIsLoading(false);
    });

    return () => abortCont.abort();
  },[idDetail]);

  const markReceivedOrder = async(id,cartId) => {
    try {
      const data = await axios.patch(`${baseUrl()}/neworders`,{ id,cartId });
      setAlertMssg(data.data.mssg);
      setShowAlert(true);
      setShowModal(false);
    }
    catch(err) {
      console.log(err);
    }
  }
  
  return (
    <div className="absolute bg-gray-900 bg-opacity-50 top-0 w-full left-0 h-screen flex justify-center items-center">
        <motion.div className="bg-gray-900 text-gray-100 w-1/2 p-4 h-1/2 rounded-md"
         initial="hidden"
         animate="visible"
         variants={popModalVar}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Order Details</h1>
            <AiOutlineClose onClick={() => setShowModal(false)} className="font-semibold text-xl cursor-pointer transform hover:scale-150 transition" />
          </div>
          {orderDetails && orderDetails.map((orderDetail) => (
            orderDetail.cart_id.filter(id => id._id === idDetail).map((orderItem) => (
              <>
                { isLoading ?
                  <div>
                    <p className="flex gap-2 text-xl"><AiOutlineLoading3Quarters className="animate-spin" />Please wait...</p>
                  </div>
                  : 
                  <>
                  <div className="flex justify-between mt-5">
                    <div className="flex gap-2">
                      <img className="w-32 rounded" src={`${imgLocation}${orderItem.inventory_id.product_image}`} alt={orderItem.inventory_id.product_name} />
                      <div className="flex flex-col">
                        <h3 className="text-lg">{orderItem.inventory_id.brand_name}</h3>
                        <h4 className="text-sm">{orderItem.inventory_id.product_name}</h4>
                        <p className="text-xs">{orderItem.inventory_id.product_description}</p>
                        <span className="text-xs">Qty. {orderItem.order_quantity}</span>
                      </div>
                    </div>
                    {/* <h2>Ordered Date: March 19, 2022</h2> */}
                  </div>
                  <div className="mt-10">
                    <h3 className="text-xl">Unique Id: { orderDetail.uniqueOrder_id }</h3>
                    <h3 className="text-sm">{orderItem.customer_id.email}</h3>
                  </div>
                  <div className="flex items-center justify-end gap-2 py-14">
                    <button onClick={() => markReceivedOrder(orderDetail._id,orderItem._id)} className="bg-green-500 p-2 rounded">Mark as claimed/delivered</button>
                    {/* <button onClick={() => console.log('cancel the order')} className="bg-red-500 p-2 rounded">Delete</button> */}
                  </div>
                </>
                }
              </>
            ))
          ))}
        </motion.div>
    </div>
  )
}

export default OrderDetailModal;
