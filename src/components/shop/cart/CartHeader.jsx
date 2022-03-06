import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const CartHeader = ({ cartContents }) => {
  const [totalPrice,setTotalPrice] = useState(0);

  useEffect(() => {
   const abortCont = new AbortController();

   const fetchData = async() => {
    let previousNum = 0;
    const data = await cartContents.map((content) => {
      return content.inventory_id[0].product_price * content.order_quantity;
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
        <div className="max-content flex justify-between py-20">
            { cartContents.length > 0 ? <h1 className="font-semibold text-4xl text-gray-800">Your Shopping Cart({ itemsCount } item)</h1> :
            <Link className="text-gray-100 p-2 rounded bg-green-500" to='/'>Order Now</Link> }
            <div className="relative">
            { cartContents.length > 0 && 
              <>
                <h2 className="text-gray-800 text-xl font-semibold">SUBTOTAL ₱{totalPrice}</h2>
                <Link to={`/checkout/${Cookies.get('customerId')}`} className="bg-green-700 text-gray-100 p-2 rounded-md absolute right-0">Checkout</Link>
              </>
            }
            </div>
        </div>
      </header>
  );
};

export default CartHeader;
