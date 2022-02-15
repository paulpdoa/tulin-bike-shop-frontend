import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {

    const [customer,setCustomer] = useState('');
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(true);

    const navigate = useNavigate();

    const findCustomer = async (e) => {
        e.preventDefault();
        await axios.get(`/customerforgetpassword/${customer}`)
        .then((data) => {
            setLoading(true);
            setMessage('Please wait...')
            setTimeout(() => {
                setLoading(false);
                navigate(data.data.redirect);
            },2000)
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
                        { loading && <h1 className="text-green-500">{ message }</h1> }
                        <input 
                            className="rounded-md p-2 mt-5 outline-none border border-gray-300"
                            type="text" 
                            placeholder="Enter your username" 
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
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