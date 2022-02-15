import { Helmet } from 'react-helmet';
import { useParams,Link,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

const ResetPassword = () => {

    const { id } = useParams();
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPass,setConfirmPass] = useState('');
    const [mssg,setMssg] = useState('');
    const [passwordErr,setPasswordErr] = useState('');
    const [confirmPassErr,setConfirmPassErr] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const abortCont = new AbortController();

        axios.get(`/customer/${id}`)
        .then((data) => {
            setUser(data.data.firstname)
        }).catch(err => console.log(err))

        return () => abortCont.abort;
    })

    const onResetPassword = (e) => {
        e.preventDefault();

        axios.put(`/customerresetpassword/${id}`,{ password })
        .then((data) => {
            if(password.length < 8) {
                setPasswordErr('password must be greater than 8 characters');
            } 

            if(password === confirmPass && password.length > 8) {
                setMssg(data.data.mssg)
                setTimeout(() => {
                    navigate(data.data.redirect);
                },2000)
            } else {
                setConfirmPassErr('password does not match')
            }
        }).catch(err => console.log(err.response));
    }

  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Reset Password</title></Helmet>
        <div className="content h-screen">
            <div className="max-content flex justify-center items-center">
                <div className="shadow-2xl p-10 rounded-md flex justify-around bg-white">
                    <img className="w-1/2 object-cover" src="/image/forgot_thumbnail.png" alt="Forgot Password Thumbnail" />
                    <form onSubmit={onResetPassword} className="flex flex-col justify-center w-1/3">
                        <h1 className="text-4xl text-gray-800 font-bold">Hi { user }!</h1>
                        <h2 className="text-green-500">{ mssg }</h2>
                        <input 
                            className="rounded-md p-2 mt-5 outline-none border border-gray-300"
                            type="password" 
                            placeholder="Enter new password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="text-xs text-red-500">{passwordErr}</span>
                        <input 
                            className="rounded-md p-2 mt-5 outline-none border border-gray-300"
                            type="password" 
                            placeholder="Re-enter password" 
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            required
                        />
                        <span className="text-xs text-red-500">{confirmPassErr}</span>
                        <button className="text-gray-100 bg-green-500 tracking-wider p-2 mt-5 rounded">RESET PASSWORD</button>
                        <Link className="text-center text-blue-500 p-2 mt-4" to='/login'>Back to login</Link>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default ResetPassword