import { useEffect,useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GlobalContext } from '../../../helper/Context';

const CartHeader = ({ cartContents }) => {

  const { numberFormat } = useContext(GlobalContext);

  const [totalPrice,setTotalPrice] = useState(0);

  useEffect(() => {
   const abortCont = new AbortController();

   const fetchData = async() => {
    let previousNum = 0;
    const data = await cartContents.map((content) => {
      return content.inventory_id.product_price * content.order_quantity;
    });
    for(let i = 0; i < data.length; i++) {
      previousNum += data[i];
    }
    setTotalPrice(previousNum);
   }
   fetchData();
   return () => abortCont.abort();
  },[cartContents,totalPrice])

  const itemsCount = cartContents.map((cart) => cart.order_quantity).reduce((initial,curr) => initial + curr,0);

  return (
      <header className="content">
        <div className="max-content flex justify-between md:py-20 py-14">
            { cartContents.length > 0 ? <h1 className="font-semibold md:text-4xl text-2xl text-gray-800 md:ml-0 ml-5">Your Shopping Cart({ itemsCount } item)</h1> :
            <div className="flex items-center gap-5 p-2">
              <Link className="text-gray-100 md:p-2 p-1 rounded bg-green-500 text-center" to='/'>Order Now</Link>
              <h1 className="text-gray-800 font-semibold md:text-4xl text-lg">Browse products in Tulin Bicycle Shop</h1>
            </div>
            }
            <div className="relative hidden md:block">
            { cartContents.length > 0 && 
              <>
                <h2 className="text-gray-800 text-xl font-semibold">SUBTOTAL ₱{numberFormat.format(totalPrice)}</h2>
                <Link to={`/checkout/${Cookies.get('customerId')}`} className="bg-green-700 text-gray-100 p-2 rounded-md absolute right-0">Checkout</Link>
              </>
            }
            </div>
        </div>
      </header>
  );
};

export default CartHeader;
