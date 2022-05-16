import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect,useState,useContext } from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import { FacebookShareButton } from 'react-share';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import { GlobalContext } from '../../helper/Context';
import { baseUrl } from '../../helper/baseUrl';

const ProductDetail = () => {

    const { id } = useParams();
    const [product,setProduct] = useState([]);
    const [quantity,setQuantity] = useState(0);
    const [quantityErr,setQuantityErr] = useState('');
    const [color,setColor] = useState('');
    const { imgLocation,numberFormat,setAlertMssg,setShowAlert } = useContext(GlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        const abortCont = new AbortController();
            const fetchData = async() => {
                const data = await axios.get(`${baseUrl()}/inventory/${id}`,{ signal: abortCont.signal });
                setProduct(data.data);
            }
            fetchData();
        return () => abortCont.abort();
    },[id]);

    const addToCart = async () => {
        const productToAdd = {
            inventory_id: id,
            order_quantity: quantity,
            customer_id: Cookies.get('customerId'),
            color
        } 
        
        if(!Cookies.get('customerId')) {
            navigate('/login');
        } else {
            if(quantity > 0) {
                const data = await axios.post(`${baseUrl()}/cart`,{ productToAdd });
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
                <section className="w-1/2 flex flex-col items-center justify-center">
                    <img className="w-4/5 h-96 border" src={`${imgLocation}${product.product_image}`} alt={product.product_name} />
                    <div className="flex mt-2">
                    { product.product_color && product.product_color[0].split(",").map(col => (
                        <>
                            { col === '' ? <h1 className="text-sm">No Color available</h1> : <div className={`w-5 h-5 rounded-full bg-${col}-500 inline-block ml-2 cursor-pointer hover:scale-150 transition duration-300`}></div> }
                        </>
                    )) }
                    </div>
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
                    <div className="mt-3 flex flex-col">
                    { product.product_color && product.product_color[0] === '' ? '' :
                        <>
                            <label htmlFor="color">Color:</label>
                            <select className="p-2 outline-none border border-gray-400" onChange={(e) => setColor(e.target.value)} required>
                                <>
                                    { product.product_color && product.product_color[0].split(",").map(col => (
                                        <>
                                            <option hidden>{ col === '' ? 'No available color' : 'Select color' }</option>
                                            { col === '' ? '' : <option value={col}>{col.slice(0,1).toUpperCase() + col.slice(1,col.length)}</option> }
                                        </>
                                    )) }2
                                </>
                            </select>
                        </>
                    }
                    </div>
                    <div className="flex items-center justify-between mt-16">
                        <button onClick={ product.product_quantity > 0 ? addToCart : () => alert('Out of Stock!') } className="font-semibold bg-orange-400 text-gray-100 p-2 text-sm hover:bg-transparent hover:border hover:border-orange-400 hover:text-orange-400 transition duration-300">Add to Cart</button>
                       
                        <div className="flex gap-2 items-center">
                            <FacebookShareButton
                                url={`https://tulin-bike-shop.netlify.app/products/${product._id}`}
                                quote={"Order this product now at Tulin Bicycle Shop!"}
                            >
                                <AiFillFacebook className="text-2xl text-blue-500 hover:scale-150 transition-all" />
                            </FacebookShareButton>
                        </div>    
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default ProductDetail