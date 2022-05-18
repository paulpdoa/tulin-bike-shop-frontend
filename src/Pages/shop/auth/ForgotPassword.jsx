import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../helper/baseUrl';
const ForgotPassword = () => {

    const [customer,setCustomer] = useState('');
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);

    const findCustomer = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.get(`${baseUrl()}/customerforgetpassword/${customer}`)
        .then((data) => {
            setLoading(false);
            setMessage(data.data.mssg);
        }).catch(err => console.log(err))
    }

  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Forgot Password</title></Helmet>
        <div className="content h-screen">
            <div className="max-content flex justify-center items-center">
                <div className="md:shadow-2xl p-10 rounded-md flex flex-col items-center md:flex-row justify-around md:bg-white">
                    <img className="w-4/5 object-cover md:hidden block" src="/image/tulin.png" alt="logo" />
                    <img className="w-1/2 object-cover md:block hidden" src="/image/forgot_thumbnail.png" alt="Forgot Password Thumbnail" />
                    <form onSubmit={findCustomer} className="flex flex-col justify-center">
                        <h1 className="md:text-4xl text-3xl text-center md:text-left text-gray-800 font-bold">Forgot your password?</h1>
                        { loading ? <h2 className="text-green-500">Please wait...</h2> : <h2 className="text-green-500">{ message }</h2>}
                        <input 
                            className="rounded-md p-2 mt-5 outline-none border border-gray-300"
                            type="text" 
                            placeholder="Enter your username" 
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            required
                        />
                        <button className="text-gray-100 bg-green-500 tracking-wider p-2 mt-5 rounded">FIND ACCOUNT</button>
                        <Link className="text-center text-blue-500 p-2 mt-4" to='/login'>Back to login</Link>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default ForgotPassword