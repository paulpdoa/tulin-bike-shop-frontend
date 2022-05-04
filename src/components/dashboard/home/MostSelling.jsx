import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const MostSelling = () => {

    const { numberFormat,imgLocation } = useContext(GlobalContext);
    const [products,setProducts] = useState([]);

    // Check if an order is occurring more than one
  useEffect(() => {
    const abortCont = new AbortController();

    const sortInventory = async () => {
        try {
            const data = await axios.get(`/inventory-sort`,{ signal:abortCont.signal });
            setProducts(data.data);
            console.log(data.data);
        }
        catch(err) {
            console.log(err);
        }
    }
    sortInventory();

    return () => abortCont.abort();
  },[])

  return (
    <div className="col-span-3 bg-gray-100 shadow-lg p-10 h-full overflow-y-scroll">
       <h1 className="text-2xl uppercase font-semibold text-gray-800">Most Selling Items</h1>
       { products && products.slice(0,5).map(product => (
           <div className="flex justify-between items-center" key={product._id}>
            <div className="flex gap-2 mt-5">
                <img className="w-20 h-20 object-cover" src={`${imgLocation}${product.product_image}`} alt={product.product_name} />
                <div className="flex flex-col">
                    <h2 className="text-base text-gray-800 font-semibold">{ product.brand_name }</h2>
                    <span className="text-sm text-gray-800">{ product.product_name }</span>
                </div>
            </div>
            <h2 className="font-bold text-gray-800 text-lg">₱{ numberFormat.format(product.product_price) }</h2>
        </div>
       )) }
    </div>
  )
}

export default MostSelling