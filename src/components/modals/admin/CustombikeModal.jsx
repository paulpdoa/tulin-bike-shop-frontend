import { AiOutlineClose } from 'react-icons/ai';
import { useContext, useEffect,useState } from 'react';
import { GlobalContext } from '../../../helper/Context';
import axios from 'axios';
import { baseUrl } from '../../../helper/baseUrl';
import { useNavigate } from 'react-router-dom';

const CustombikeModal = () => {
  
    const { setShowCustomDetail,customId,numberFormat,setShowAlert,setAlertMssg } = useContext(GlobalContext);
    const [product,setProduct] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [message,setMessage] = useState('');

    useEffect(() => {
        const abortCont = new AbortController();

        axios.get(`${baseUrl()}/customize`, { signal:abortCont.signal })
        .then((data) => {
            setIsLoading(false);
            const specificBike = data.data.filter(bike => bike._id === customId).map(bike => bike);
            setProduct(specificBike);
        })

        return () => abortCont.abort();
    },[]);

    const navigate = useNavigate();

    const markClaimed = async(id,fullPayment) => {
        try {
            const data = await axios.patch(`${baseUrl()}/customize`,{ id,fullPayment });
            navigate(data.data.redirect);
        }
        catch(err) {
            console.log(err);
        }
    }

    const sendMessage = async (email,name) => {
        try {
            const data = await axios.post(`${baseUrl()}/updates`,{ message,email,name });
            navigate(data.data.redirect);
            setAlertMssg(data.data.mssg);
            setShowAlert(true);
            setShowCustomDetail(false);
        }
        catch(err) {
            console.log(err)
        }
    }


    return (
    <div className="absolute h-full bg-gray-900 bg-opacity-50 top-0 w-full left-0 z-50 flex justify-center items-center">
        <div className="bg-gray-100 w-1/2 text-gray-800 p-2 rounded">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Customized Bike View</h1>
                <button onClick={() => setShowCustomDetail(false)} className="group"><AiOutlineClose className="group-hover:scale-150 transition duration-300" /></button>
            </div>
            <div>
                { isLoading ? <h1>Please wait</h1> : 
                    <>
                    { product && product.map(prod => (
                        <div key={prod._id} className="flex gap-2">
                            <img className="w-44 h-44 object-cover" src={prod.customized_bikeImg} alt="customized bike" />
                            <div className="flex flex-col">
                                <h2>Send Update to customer</h2>
                                <input onChange={(e) => setMessage(e.target.value)} value={message} className="p-2 outline-none border border-gray-300 rounded" type="text" />
                                <button onClick={() => sendMessage(prod.customer_id.email, prod.customer_id.firstname + ' ' + prod.customer_id.lastname)} className="bg-blue-500 text-gray-100 p-2 rounded mt-1 w-1/2">Send update</button>
                                <p className="text-xs">{ prod.customer_id.email }</p>
                                <p>Remaining Balance: ₱{ numberFormat.format((prod.amount_paid * 2) / 2) }</p>
                                <button onClick={() => markClaimed(prod._id,prod.amount_paid * 2)} className="bg-green-500 text-gray-100 rounded p-2 mt-10 w-full">Mark as claimed</button>
                            </div> 
                        </div>
                    )) }
                    </>
                }
                
            </div>
        </div>
    </div>
  )
}

export default CustombikeModal;