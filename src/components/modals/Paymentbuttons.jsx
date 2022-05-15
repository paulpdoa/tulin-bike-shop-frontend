import axios from 'axios';
import { useContext,useEffect,useRef } from 'react';
import { GlobalContext } from '../../helper/Context';
import Cookies from 'js-cookie';
import { baseUrl } from '../../helper/baseUrl';
import { useNavigate } from 'react-router-dom';

const Paymentbuttons = () => {

  const { setShowDp,bikeDisplay,totalPrice:totalAmount,setShowAlert,setAlertMssg } = useContext(GlobalContext);
  const customer_id = Cookies.get('customerId'); 
  const paypal = useRef();
  const navigate = useNavigate();

  const codPaymentMethod = 'Cash on Delivery';
  const placeCodOrder = async () => {
    const transaction = await axios.post(`${baseUrl()}/customize`,{ customized_bikeImg: bikeDisplay,customer_id,codPaymentMethod,amount_paid: totalAmount / 2,payment_method: codPaymentMethod })
    navigate(transaction.data.redirect);
    setAlertMssg('Your customized bike is now placed');
    setShowAlert(true);
    setShowDp(false);
  }

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
                        value: totalAmount / 2
                    }
                }]
            })
        },
        onApprove: async(data,actions) => {
            const order = await actions.order.capture()
            console.log(order)
            postPaypalOrder();
        },
        onError: (err) => {
            console.log(err);
        } 
    }).render(paypal.current);
   

  const paypalPaymentMethod = "Paypal";
  const postPaypalOrder = async () => {
      const transaction = await axios.post(`${baseUrl()}/customize`,{ customized_bikeImg: bikeDisplay,customer_id,codPaymentMethod,amount_paid: totalAmount / 2,payment_method: paypalPaymentMethod })
      navigate(transaction.data.redirect);
      setShowDp(false);
      setAlertMssg('Your customized bike is now placed');
      setShowAlert(true);
  }
  return () => abortCont.abort();
},[paypal])

  return (
    <div className="flex flex-col">
        <button onClick={placeCodOrder} className="bg-gray-800 text-gray-100 p-2 hover:bg-transparent hover:text-gray-800 hover:border hover:border-gray-800 transition duration-300">Cash on Delivery</button>
        <div ref={paypal}></div>
    </div>
  )
}

export default Paymentbuttons;