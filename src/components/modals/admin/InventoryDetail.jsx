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

const InventoryDetail = () => {

  const { inventoryId,setShowInventoryDetail,imgLocation } = useContext(GlobalContext);
  const [product,setProduct] = useState({});  

  useEffect(() => {
    const abortCont = new AbortController();

    const getDetail = async () => {
        try {
            const data = await axios.get(`${baseUrl()}/inventory/${inventoryId}`,{ signal:abortCont.signal });
            setProduct(data.data);
        }
        catch(err) {
            console.log(err);
        }
    }
    getDetail();

    return () => abortCont.abort();
  },[inventoryId]);

  const deleteProduct = async() => {
    try {
      const data = await axios.delete(`${baseUrl()}/inventory/${inventoryId}`);
      console.log(data);
      setShowInventoryDetail(false);
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="absolute h-screen bg-gray-900 bg-opacity-50 top-0 w-full left-0 z-50 flex justify-center items-center">
        <motion.div className="w-1/2 rounded-md bg-gray-100 p-3 relative"
            variants={popModalVar}
            initial="hidden"
            animate="visible"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Product Detail</h1>
                <button onClick={() => setShowInventoryDetail(false)} className="text-2xl group"><AiOutlineClose className="group-hover:scale-150 duration-200 transition" /></button>
            </div>
            <div className="flex gap-2 py-5 px-2">
                <img className="w-1/2 rounded-md shadow-xl" src={`${imgLocation}${product.product_image}`} alt={product.product_name} />
                <div className="flex flex-col gap-1 text-gray-800">
                    <h2 className="font-semibold text-xl">{ product.brand_name }</h2>
                    <h3 className="text-sm">{ product.product_name }</h3>
                    <p className="text-xs">{ product.product_description }</p>
                    <label htmlFor="size">Size: { product.product_size }</label>
                    <span className="text-xs">Qty. { product.product_quantity }</span>
                </div>
            </div>
            <button onClick={deleteProduct} className="absolute bottom-2 right-2 p-2 rounded bg-red-500 text-gray-100 hover:bg-transparent hover:border hover:border-red-500 hover:text-red-500 transition duration-300">Delete</button>
        </motion.div>
    </div>
  )
}

export default InventoryDetail