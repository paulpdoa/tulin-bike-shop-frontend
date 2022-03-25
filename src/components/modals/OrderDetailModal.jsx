import { AiOutlineClose } from 'react-icons/ai';
import { useContext,useEffect,useState } from 'react';
import { GlobalContext } from '../../helper/Context';
import axios from 'axios';

const OrderDetailModal = () => {

  const { setShowModal,idDetail,imgLocation } = useContext(GlobalContext);
  const [orderDetail,setOrderDetail] = useState({});
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();

    axios.get(`/neworders/${idDetail}`,{ signal:abortCont.signal })
    .then((data) => {
      setOrderDetail(data.data);
      setIsLoading(false);
    })

    return () => abortCont.abort();
  },[idDetail])


  
  return (
    <div className="absolute bg-gray-900 bg-opacity-50 top-0 w-full left-0 h-screen flex justify-center items-center">
        <div className="bg-gray-900 text-gray-100 w-1/2 p-4 h-1/2 rounded-md">
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Order Details</h1>
            <AiOutlineClose onClick={() => setShowModal(false)} className="font-semibold text-xl cursor-pointer" />
          </div>
          { isLoading ?
           <div>
             <p>Please wait...</p>
           </div>
           : 
           <>
           <div className="flex justify-between">
            <div className="flex gap-2">
              <img className="w-32 rounded" src={`${imgLocation}${orderDetail.inventory_id.product_image}`} alt={orderDetail.inventory_id.product_name} />
              <div className="flex flex-col">
                <h3 className="text-lg">{orderDetail.inventory_id.brand_name}</h3>
                <h4 className="text-sm">{orderDetail.inventory_id.product_name}</h4>
                <p className="text-xs">{orderDetail.inventory_id.product_description}</p>
                <span className="text-xs">Qty. {orderDetail.order_quantity}</span>
              </div>
            </div>
            {/* <h2>Ordered Date: March 19, 2022</h2> */}
          </div>
          <div className="mt-10">
           <h3 className="text-xl">Ordered By: {`${orderDetail.customer_id.firstname} ${orderDetail.customer_id.lastname}`}</h3>
           <h3 className="text-sm">{orderDetail.customer_id.email}</h3>
          </div>
          <div className="flex items-center justify-end gap-2 py-14">
            <button className="bg-green-500 p-2 rounded">Mark as claimed/delivered</button>
            <button>Delete</button>
          </div>
          </>
           }
        </div>
    </div>
  )
}

export default OrderDetailModal