import { useState,useEffect } from 'react';
import { BsPaypal } from 'react-icons/bs';
import { FiTruck } from 'react-icons/fi';

const PaymentCard = ({ products,setShowPaypal,setPaymentVal,setShowCod }) => {

    const [totalPrice,setTotalPrice] = useState(0);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async() => {
            let previousNum = 0;

            const data = await products.map((content) => {
                return content.inventory_id.product_price * content.order_quantity;
            });
            for(let i = 0; i < data.length; i++) {
                previousNum += data[i];
              }

            setTotalPrice(previousNum);
            setPaymentVal(previousNum);
        }
        fetchData();
        return () => abortCont.abort();
        
    },[products,setPaymentVal])
    
    const itemsCount = products.map((product) => product.order_quantity).reduce((initial,curr) => curr + initial,0);

  return (
    <div className="w-full select-none">
        <div className="flex justify-between items-center mt-5">
            <span>Subtotal({itemsCount} item/s)</span>
            <span>₱{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mt-5">
            <span className="font-semibold text-gray-800 text-xl">Total</span>
            <span className="text-orange-500 font-semibold text-lg">₱{totalPrice.toLocaleString()}</span>
        </div>
        <div className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-800">Payment Method</h2>
            <section className="w-1/2 flex items-center justify-between p-2 rounded shadow-xl mt-5 border border-gray-300">
                <span>Paypal</span>
                <button className="bg-yellow-500 text-blue-500 p-2 rounded" onClick={() => setShowPaypal(true)}>
                    <BsPaypal />
                </button>
            </section>
            <section className="w-1/2 flex items-center justify-between p-2 rounded shadow-xl mt-5 border border-gray-300">
                <span>Cash on Delivery</span>
                <button onClick={() => setShowCod(true)} className="p-2 bg-gray-900 text-gray-100 rounded">
                    <FiTruck />
                </button>
            </section>
            <button className="w-full bg-gray-900 text-gray-100 font-semibold p-2 mt-5 rounded">Place Order</button>
        </div>
    </div>
  )
}

export default PaymentCard