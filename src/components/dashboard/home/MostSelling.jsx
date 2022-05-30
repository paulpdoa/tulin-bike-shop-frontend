import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import { baseUrl } from '../../../helper/baseUrl';

const MostSelling = () => {

    const { numberFormat,imgLocation } = useContext(GlobalContext);
    const [products,setProducts] = useState([]);
    const [mostSelling,setMostSelling] = useState('');

    // Check if an order is occurring more than one
  useEffect(() => {
    const abortCont = new AbortController();

    const sortInventory = async () => {
        try {
            const data = await axios.get(`${baseUrl()}/inventory-sort`,{ signal:abortCont.signal });
            setProducts(data.data);
            if(data.data.length === 0) 
                return null;
            var modeMap = {};
            var maxEl = data.data[0].inventory_id._id, maxCount = 1;
            for(let i = 0; i < data.data.length; i++) {
                let el = data.data[i].inventory_id._id;
                if(modeMap[el] == null) 
                    modeMap[el] = 1;
                else 
                    modeMap[el]++;
                if(modeMap[el] > maxCount) {
                    maxEl = el;
                    maxCount = modeMap[el];
                }
            }
            setMostSelling(maxEl);
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
       { products && products.filter(product => product.inventory_id._id === mostSelling).slice(0,1).map(product => (
           <div className="flex justify-between items-center" key={product._id}>
            <div className="flex gap-2 mt-5">
                <img className="w-20 h-20 object-cover" src={`${imgLocation}${product.inventory_id.product_image}`} alt={product.inventory_id.product_name} />
                <div className="flex flex-col">
                    <h2 className="text-base text-gray-800 font-semibold">{ product.inventory_id.brand_name }</h2>
                    <span className="text-sm text-gray-800">{ product.inventory_id.product_name }</span>
                </div>
            </div>
            <h2 className="font-bold text-gray-800 text-lg">₱{ numberFormat.format(product.inventory_id.product_price) }</h2>
        </div>
       )) }
    </div>
  )
}

export default MostSelling