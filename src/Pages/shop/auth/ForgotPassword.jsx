import { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {

    const [customer,setCustomer] = useState('');

    const findCustomer = (e) => {
        e.preventDefault();
        axios.get(`/customerforgetpassword/${customer}`)
        .then((data) => {
            console.log(data);
        }).catch(err => console.log(err))
    }

  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Forgot Password</title></Helmet>
        <div className="content h-screen">
            <div className="max-content flex justify-center items-center">
                <div className="shadow-2xl p-10 rounded-md flex justify-around bg-white">
                    <img className="w-1/2 object-cover" src="/image/forgot_thumbnail.png" alt="Forgot Password Thumbnail" />
                    <form onSubmit={findCustomer} className="flex flex-col justify-center">
                        <h1 className="text-4xl text-gray-800 font-bold">Forgot your password?</h1>

                        <input 
                            className="rounded-md p-2 mt-5 outline-none border border-gray-300"
                            type="text" 
                            placeholder="Enter your username or email" 
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                        />
                        <button className="text-gray-100 bg-green-500 tracking-wider p-2 mt-5 rounded">RESET PASSWORD</button>
                        <Link className="text-center text-blue-500 p-2 mt-4" to='/login'>Back to login</Link>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default ForgotPassword