import { useRef,useEffect,useState } from "react"
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

const Paypal = ({ setShowPaypal,paymentVal,products }) => {

    const paypal = useRef();
    const [cartId,setCartId] = useState({});
    const [customerId,setCustomerId] = useState({});
    
    // Extract information of user transaction
    useEffect(() => {
        const abortCont = new AbortController();

        const cart_id = products.map((product) => product._id);
        const customer_id = products.map((product) => product.inventory_id[0]._id);
        setCustomerId(customer_id);
        setCartId(cart_id);

        return () => abortCont.abort();
    },[products])

    useEffect(() => {
        const abortCont = new AbortController();

        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                        description: 'Item ordered in Tulin Bicycle Shop',
                        amount: {
                            currency_code:"PHP",
                            value: paymentVal
                        }
                    }]
                })
            },
            onApprove: async(data,actions) => {
                const order = await actions.order.capture()
                const transaction = await axios.post('/order',{ cartId,customerId })
                console.log(order);
                console.log(transaction)
            },
            onError: (err) => {
                console.log(err);
            } 
        }).render(paypal.current);

        return () => abortCont.abort();
    },[paymentVal,cartId,paypal])

  return (
    <div className="absolute h-screen bg-gray-900 bg-opacity-50 w-full flex items-center justify-center z-50">
        <div className="relative w-1/2 flex items-center justify-center">
            <AiOutlineClose onClick={() => setShowPaypal(false)} className="absolute font-bold text-3xl cursor-pointer right-44 -top-7 bg-white rounded-full" />
            <div className="w-1/2 bg-white p-5 rounded-md" ref={paypal}></div>
        </div>
    </div>
  )
}

export default Paypal