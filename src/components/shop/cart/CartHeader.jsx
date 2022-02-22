import { useEffect,useState } from 'react';

const CartHeader = ({ cartContents }) => {
  const [totalPrice,setTotalPrice] = useState(0);

  useEffect(() => {
    const data = cartContents.reduce((prev,initial) => {
      return (initial.inventory_id[0].product_price + prev) * initial.inventory_id[0].product_quantity;
    },0)
    setTotalPrice(data);
  },[cartContents])
  return (
      <header className="content">
        <div className="max-content flex justify-between py-20">
            <h1 className="font-semibold text-4xl text-gray-800">Your Shopping Cart({ cartContents.length } item)</h1>
            <div className="relative">
                <h2 className="text-gray-800 text-xl font-semibold">SUBTOTAL ₱{totalPrice.toLocaleString()}</h2>
                <button className="bg-green-700 text-gray-100 p-2 rounded-md absolute right-0">Checkout</button>
            </div>
        </div>
      </header>
  );
};

export default CartHeader;
