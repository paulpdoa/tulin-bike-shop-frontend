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
      const fetchCustomerCart = async () => {
        const data = await axios.get(`/cart/${Cookies.get('customerId')}`);
        setCartContents(data.data);
      }
      fetchCustomerCart();
  },[])

  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Cart</title></Helmet>
        <CartHeader cartContents={cartContents} />
        <CartTable cartContents={cartContents} />
    </>
  );
};

export default Cart;
