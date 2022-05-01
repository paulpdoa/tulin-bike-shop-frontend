import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useEffect,useState } from 'react';
import CartHeader from '../../components/shop/cart/CartHeader';
import CartTable from '../../components/shop/cart/CartTable';
import Cookies from 'js-cookie';
import CartCard from '../../components/shop/cart/CartCard';
import CartheadMobile from '../../components/shop/cart/CartheadMobile';
import { baseUrl } from '../../helper/baseUrl';
const Cart = () => {

  const [cartContents,setCartContents] = useState([]);
  
  // Get the contents of cart of the customer
  useEffect(() => {
    const abortCont = new AbortController();
      const fetchCustomerCart = async () => {
        const data = await axios.get(`${baseUrl()}/cart/${Cookies.get('customerId')}`,{ signal:abortCont.signal });
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
          <CartCard cartContents={cartContents} setCartContents={setCartContents} />
          <CartheadMobile cartContents={cartContents} />
        </div>
    </>
  );
};

export default Cart;
