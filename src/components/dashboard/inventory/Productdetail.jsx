import { useParams } from 'react-router-dom';
import { useEffect,useState,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import axios from 'axios';

const Productdetail = () => {

  const { id } = useParams();  

  const [product,setProduct] = useState([]);
  const { imgLocation,numberFormat } = useContext(GlobalContext);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchInventoryDetail = async () => {
      try {
        const data = await axios.get(`/inventory/${id}`,{ signal:abortCont.signal });
        setProduct(data.data);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchInventoryDetail();

    return () => abortCont.abort();
  },[id])

  const [quantity,setQuantity] = useState(product.product_quantity);

  return (
    <>
     { product &&
     <div className="h-screen flex justify-center items-center gap-10">
        <img className="w-1/2 border border-gray-600 rounded-md shadow-2xl" src={`${imgLocation}${product.product_image}`} alt={product.product_name} />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{ product.brand_name } - { product.product_name }</h1>
          <h2>{ product.product_type }</h2>
          <p>₱{ numberFormat.format(product.product_price) }</p>
          <p>{ product.product_description }</p>
          <span className="text-xs">Qty. { product.product_quantity }</span>
          <div>
            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
            <span>{ quantity }</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
    </div>
     }
    </>
  )
}

export default Productdetail