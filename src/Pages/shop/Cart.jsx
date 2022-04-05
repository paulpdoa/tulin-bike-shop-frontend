import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useEffect,useState } from 'react';
import CartHeader from '../../components/shop/cart/CartHeader';
import CartTable from '../../components/shop/cart/CartTable';
import Cookies from 'js-cookie';

const Cart = () => {

  const [cartContents,setCartContents] = useState([]);
  
  // Get the contents of cart of the customer
  useEffect(() => {
    const abortCont = new AbortController();
      const fetchCustomerCart = async () => {
        const data = await axios.get(`/cart/${Cookies.get('customerId')}`,{ signal:abortCont.signal });
        setCartContents(data.data);
      }
      fetchCustomerCart();
      return () => abortCont.abort();
  },[cartContents])

  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Cart</title></Helmet>
        <div className="h-full">
          <CartHeader cartContents={cartContents} />
          <CartTable cartContents={cartContents} setCartContents={setCartContents} />
        </div>
    </>
  );
};

export default Cart;
