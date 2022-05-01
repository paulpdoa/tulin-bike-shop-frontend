import { AiOutlineClose } from 'react-icons/ai';
import { GlobalContext } from '../../../helper/Context';
import axios from 'axios';
import { useContext,useEffect,useState } from 'react';
import { motion } from 'framer-motion';
import { baseUrl } from '../../../helper/baseUrl';
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

const Orderhistorydetail = () => {

  const { imgLocation,setShowOrderDetail,historyOrderId } = useContext(GlobalContext);
  const [products,setProducts] = useState([]);  

  useEffect(() => {
    const abortCont = new AbortController();

    const getOrderDetail = async() => {
        try {
            const data = await axios.get(`${baseUrl()}/ordereditem`,{ signal:abortCont.signal });
            setProducts(data.data);
        }
        catch(err) {
            console.log(err);
        }
    }
    getOrderDetail();

    return () => abortCont.abort();
  },[])

  return (
    <div className="absolute h-screen bg-gray-900 bg-opacity-50 top-0 w-full left-0 z-50 flex justify-center items-center">
        <motion.div className="w-1/2 rounded-md bg-gray-100 p-3"
            variants={popModalVar}
            initial="hidden"
            animate="visible"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Order History Detail</h1>
                <button onClick={() => setShowOrderDetail(false)} className="text-2xl group"><AiOutlineClose className="group-hover:scale-150 duration-200 transition" /></button>
            </div>
            { products.filter((product) => historyOrderId === product._id).map(product => (
                product.cart_id.map(item => (
                    <div className="flex gap-2 py-5 px-2">
                        <img className="w-1/2 rounded-md shadow-xl" src={`${imgLocation}${item.inventory_id.product_image}`} alt={item.inventory_id.product_name} />
                        <div className="flex flex-col gap-1 text-gray-800">
                            <h2 className="font-semibold text-xl">{ item.inventory_id.brand_name }</h2>
                            <h3 className="text-sm">{ item.inventory_id.product_name }</h3>
                            <p className="text-xs">{ item.inventory_id.product_description }</p>
                            <label htmlFor="size">Size: { item.inventory_id.product_size }</label>
                            <span className="text-xs">Date of Order: { new Date(product.createdAt).getMonth() }/{ new Date(product.createdAt).getDate() }/{ new Date(product.createdAt).getFullYear() } </span>
                        </div>
                    </div>
                ))
            )) }
        </motion.div>
    </div>
  )
}

export default Orderhistorydetail;