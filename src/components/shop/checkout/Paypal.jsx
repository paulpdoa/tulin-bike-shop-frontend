import { useRef,useEffect,useState } from "react"
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Paypal = ({ setShowPaypal,paymentVal,id,products }) => {

    const paypal = useRef();
    const [customerId] = useState(id);
    
    const cartItemId = products.map((product) => product._id);
    

    const navigate = useNavigate();
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
                console.log(order)
                postOrder();
            },
            onError: (err) => {
                console.log(err);
            } 
        }).render(paypal.current);

        // Post the order
        
        const paymentMethod = "paypal"
        const postOrder = async () => {
            const transaction = await axios.post('/order',{ customerId,cartItemId, paymentMethod })
            navigate(transaction.data.redirect);
        }
        

        return () => abortCont.abort();
    },[paymentVal,paypal])

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