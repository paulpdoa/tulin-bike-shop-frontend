
const CartHeader = () => {
  return (
      <header className="content">
        <div className="max-content flex justify-between py-20">
            <h1 className="font-semibold text-4xl text-gray-800">Your Shopping Cart(1 item)</h1>
            <div className="relative">
                <h2 className="text-gray-800 text-xl font-semibold">SUBTOTAL Php. 1000.00</h2>
                <button className="bg-green-700 text-gray-100 p-2 rounded-md absolute right-0">Checkout</button>
            </div>
        </div>
      </header>
  );
};

export default CartHeader;
