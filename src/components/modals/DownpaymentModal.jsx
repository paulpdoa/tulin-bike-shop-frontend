import { useState,useContext } from 'react';
import { GlobalContext } from '../../helper/Context';
import Paymentbuttons from '../modals/Paymentbuttons';

const DownpaymentModal = () => {

    const { setShowDp } = useContext(GlobalContext);
    const [showPaymentButtons,setShowPaymentButtons] = useState(false);
    
  return (
    <div className="bg-gray-100 text-gray-800 p-2 rounded">
        <h1 className="text-2xl font-semibold">Before you proceed, you need to pay half of the price</h1>
        <div className="flex gap-2 items-center justify-center text-gray-100 mt-5">
            { showPaymentButtons ? 
              <Paymentbuttons />
             : 
            <>
              <button onClick={() => setShowPaymentButtons(true)} className="bg-green-500 rounded p-2">Continue</button>
              <button onClick={() => setShowDp(false)} className="bg-red-500 rounded p-2">No thanks</button>
            </>
            }
        </div>
    </div>
  )
}

export default DownpaymentModal;