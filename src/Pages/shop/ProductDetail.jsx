import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect,useState,useContext } from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import { GlobalContext } from '../../helper/Context';

const ProductDetail = () => {
    const { id } = useParams();
    const [product,setProduct] = useState([]);
    const [quantity,setQuantity] = useState(0);
    const [quantityErr,setQuantityErr] = useState('');
    const { imgLocation,numberFormat,setAlertMssg,setShowAlert } = useContext(GlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        const abortCont = new AbortController();
        const fetchData = async() => {
            const data = await axios.get(`/inventory/${id}`);
            setProduct(data.data);
        }
        fetchData();
        return () => abortCont.abort();
    },[id]);

    const addToCart = async () => {
        const productToAdd = {
            inventory_id: id,
            order_quantity: quantity,
            customer_id: Cookies.get('customerId')
        } 
        
        if(!Cookies.get('customerId')) {
            navigate('/login');
        } else {
            if(quantity > 0) {
                const data = await axios.post('/cart',{ productToAdd });
                setAlertMssg(data.data.mssg);
                setShowAlert(true);
                navigate(data.data.redirect);
                setQuantityErr('');
                
            } else {
                setQuantityErr('your order cannot be zero');
            }
        }  
    }

  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | { `${product.product_name}` }</title></Helmet>
        <div className="content h-screen">
            <div className="max-content w-full flex gap-52 items-center justify-center">
                <section className="w-1/2 overflow-hidden flex items-center justify-center">
                    <img className="w-4/5 h-96 shadow-2xl border" src={`${imgLocation}${product.product_image}`} alt={product.product_name} />
                </section>
                <section>
                    <span className="font-semibold text-gray-500">{ product.product_type }</span>
                    <h1 className="font-semibold text-4xl text-gray-800">{ product.brand_name } - { product.product_name } </h1>
                    <span className="text-2xl font-semibold text-gray-800">₱{ numberFormat.format(product.product_price) }</span>
                   
                    <div className="flex flex-col mt-5">
                        <p className="text-gray-800">{ product.product_description }</p>
                        <span className="text-xs text-gray-800">Qty.{ product.product_quantity }</span><br/>
                        { product.product_quantity < 1 && <p className="text-red-500 text-sm -mt-5">Out of Stock</p> }
                    </div>
                    <div className="flex items-center gap-2 mt-5 relative">
                        <button className="p-2 bg-gray-900 text-gray-100 font-semibold rounded" onClick={() => quantity > 0 && setQuantity(quantity-1)}>-</button>
                        <span>{ quantity }</span>
                        <button className="p-2 bg-gray-900 text-gray-100 font-semibold rounded" onClick={() => quantity < product.product_quantity && setQuantity(quantity+1)}>+</button>
                        <span className="text-red-500 text-xs absolute -bottom-5">{ quantityErr }</span>
                    </div>
                    <div className="flex mt-3">
                        <p>Available colors</p>
                        { product.product_color[0].split(",").map(col => (
                            <div onClick={() => console.log(col)} className={`w-5 h-5 rounded-full bg-${col}-500 inline-block ml-2 cursor-pointer`}></div>
                        )) }
                        
                    </div>
                    <button onClick={ product.product_quantity > 0 ? addToCart : () => alert('Out of Stock!') } className="mt-16 font-semibold bg-orange-400 text-gray-100 p-2 rounded">Add to Cart</button>
                </section>
            </div>
        </div>
    </>
  )
}

export default ProductDetail