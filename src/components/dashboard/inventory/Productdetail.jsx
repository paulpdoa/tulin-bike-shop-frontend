import { useParams } from 'react-router-dom';
import { useEffect,useState,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import axios from 'axios';

const Productdetail = () => {

  const { id } = useParams();  

  const [product,setProduct] = useState([]);
  const { imgLocation } = useContext(GlobalContext);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchInventoryDetail = async() => {
      try {
        const data = await axios.get(`/inventory/${id}`,{ signal:abortCont.signal });
        setProduct(data.data);
        console.log(data.data);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchInventoryDetail();

    return () => abortCont.abort();
  },[])

  return (
    <div className="h-screen">
        <img src={`${imgLocation}${product.product_image}`} alt={product.product_name} />
    </div>
  )
}

export default Productdetail