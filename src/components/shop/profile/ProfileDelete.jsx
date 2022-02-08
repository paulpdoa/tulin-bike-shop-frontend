import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ProfileDelete = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [deleted,setDeleted] = useState('');

  const deleteAccount = () => {
    axios.put(`/customerdelete/${id}`,{ status:'inactive' })
    .then((data) => {
      setDeleted(data.data.mssg);
      localStorage.removeItem('customer_name');
      setTimeout(() => {
        navigate(data.data.redirect);
      },2000)
    }).catch((err) => console.log(err));
  }

  return (
    <div className="p-20 h-screen col-span-2">
        <div className="bg-gray-900 w-full h-4/5 text-gray-100 rounded-md p-10 overflow-hidden">
            <h1 className="font-semibold text-4xl border-b-2 border-gray-400 py-1">Delete Account?</h1>
            <div className="h-full flex flex-col items-center justify-center relative">
                <h1 className="font-semibold text-xl text-green-500 absolute top-24 flex gap-2 items-center">{ deleted && <><AiOutlineLoading3Quarters className="animate-spin"/>Your account has been deleted</> }</h1>
                <h2 className="font-semibold text-2xl">Are you sure you want to delete your account?</h2>
                <div className="flex gap-5 mt-5">
                    <button className="bg-red-500 p-2 w-32 rounded">No</button>
                    <button onClick={deleteAccount} className="bg-green-500 p-2 w-32 rounded">Yes</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileDelete;
