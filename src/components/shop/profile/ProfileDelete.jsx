import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { baseUrl } from '../../../helper/baseUrl';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { GlobalContext } from '../../../helper/Context';

const ProfileDelete = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [deleted,setDeleted] = useState('');
  const [pendingCustomer,setPendingCustomer] = useState([]);
  const { setAlertMssg,setShowAlert } = useContext(GlobalContext);

  // useEffect(() => {
  //   const abortCont = new AbortController();

  //   const checkOrders = async () => {
  //     try {
  //       const data = await axios.get(`/order/${id}`,{ signal:abortCont.signal });
  //       const pendings = data.data.filter(pend => pend.order_status === 'pending');
  //       const currentCustomerPending = pendings.filter(pending => pending.customer_id === id);
  //       setPendingCustomer(currentCustomerPending);
  //     }
  //     catch(err) {
  //       console.log(err);
  //     }
  //   }
  //   checkOrders();

  //   return () => abortCont.abort();
  // },[id])

  const deleteAccount = () => {
    // if(pendingCustomer.length > 0) {
    //   setAlertMssg('You have current order, please cancel it first');
    //   setShowAlert(true);
    // } else {
      axios.put(`${baseUrl()}/customerdelete/${id}`,{ status:'inactive' })
      .then((data) => {
        setDeleted(data.data.mssg);
        localStorage.removeItem('customer_name');
        Cookies.remove('customerJwt');
        Cookies.remove('customerId');
        setTimeout(() => {
          navigate(data.data.redirect);
        },2000)
      }).catch((err) => console.log(err));
    // }
  }
  console.log(baseUrl());

  return (
    <div className="md:p-20 p-10 md:h-screen md:col-span-2 col-span-3 md:mt-0 -mt-10">
        <div className="md:bg-gray-900 bg-gray-100 shadow-2xl md:shadow-none w-full md:h-4/5 h-full md:text-gray-100 text-gray-800 rounded-md p-10 overflow-hidden">
            <h1 className="font-semibold md:text-4xl text-3xl border-b-2 border-gray-400 py-1">Delete Account?</h1>
            <div className="md:h-full h-4/5 flex flex-col items-center justify-center relative">
                <h1 className="font-semibold text-xl text-green-500 absolute top-24 flex gap-2 items-center">{ deleted && <><AiOutlineLoading3Quarters className="animate-spin"/>Your account has been deleted</> }</h1>
                <h2 className="font-semibold text-2xl">Are you sure you want to delete your account?</h2>
                <div className="flex gap-5 mt-5 text-gray-100">
                    <button className="bg-red-500 p-2 w-32 rounded">No</button>
                    <button onClick={deleteAccount} className="bg-green-500 p-2 w-32 rounded">Yes</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileDelete;
