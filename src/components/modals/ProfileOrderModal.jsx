import { AiOutlineClose,AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import { useEffect,useState,useContext } from 'react';
import { GlobalContext } from '../../helper/Context';

const ProfileOrderModal = ({ close,detailId }) => {

  const { imgLocation } = useContext(GlobalContext);
  const [isLoading,setIsLoading] = useState(true);
  const [item,setItem] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    axios.get(`/neworders/${detailId}`,{ signal:abortCont.signal })
    .then((data) => {
     setItem(data.data);
     setIsLoading(false);
    })

    return () => abortCont.abort();
  },[detailId])
  
  return (
    <div className="absolute flex items-center justify-center -top-10 left-0 h-screen w-full">
        <div className="text-gray-200 w-4/5 shadow-xl bg-gray-800 rounded-md p-5 z-50">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Order Detail</h1>
              <AiOutlineClose className="cursor-pointer transition transform hover:scale-150" onClick={() => close(false)} />
            </div>
            { isLoading ? <p className="text-xl flex gap-2"><AiOutlineLoading3Quarters className="animate-spin" />Please wait...</p> :
            <>
              <div className="flex gap-2 mt-5">
                <img className="object-cover w-32 h-32 rounded" src={`${imgLocation}${item.inventory_id.product_image}`} alt="cycle" />
                <div className="flex flex-col">
                  <h2 className="font-semibold">{item.inventory_id.brand_name}</h2>
                  <p>{item.inventory_id.product_name}</p>
                  <p className="text-sm">{item.inventory_id.product_description}</p>
                  <span className="text-xs">Qty. {item.order_quantity}</span>
                </div>
              </div>
              <div className="flex flex-col mt-5">
                <label htmlFor="name">Name: {item.customer_id.firstname} {item.customer_id.lastname}</label>
                <label htmlFor="email">Email: {item.customer_id.email}</label>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button className="bg-red-500 text-gray-100 rounded p-2">Cancel Order</button>
              </div>
            </>
            }
        </div>
    </div>
  )
}

export default ProfileOrderModal