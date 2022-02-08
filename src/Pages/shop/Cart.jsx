import { Helmet } from 'react-helmet';
import CartHeader from '../../components/shop/cart/CartHeader';
import CartTable from '../../components/shop/cart/CartTable';

const Cart = () => {
  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Cart</title></Helmet>
        <CartHeader />
        <CartTable />
    </>
  );
};

export default Cart;
