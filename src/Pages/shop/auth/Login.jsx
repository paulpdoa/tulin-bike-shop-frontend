import { useEffect,useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';

import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '../../../helper/baseUrl';

const Login = ({ setCustomerCookie }) => {
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [verifyId,setVerifyId] = useState('');
    
    const [usernameErr,setUsernameErr] = useState('');
    const [passwordErr,setPasswordErr] = useState('');
  
    const [success,setSuccess] = useState('');

    const [showPassword,setShowPassword] = useState(false);

    const navigate = useNavigate();

    // protect login page when the customer is already logged in
    useEffect(() => {
        if(Cookies.get('customerJwt')) {
            navigate('/');
        }
    })

    // resends the code to the email
    const sendCodeToMail = () => {
        axios.get(`${baseUrl()}/sendcodetoverify/${verifyId}`)
        .then((data) => {
            console.log(data)
        }).catch(err => console.log(err));
    }

    const onLogin = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl()}/customerlogin`,{ username,password })
        .then((data) => {
            if(data.data.mssg === 'this user is not yet verified, please verify your account') {
                setSuccess(data.data.mssg);
                setVerifyId(data.data.verify_id);
            } else {
                setSuccess(data.data.mssg);
                setCustomerCookie(Cookies.get('customerJwt'));
                Cookies.set('customerId',data.data.customerId, { expires: 31 });
                Cookies.set('customerJwt',data.data.customerJwt, { expires: 31 });
                localStorage.setItem('customer_name',`${data.data.customerFirstname} ${data.data.customerSurname}`);
                window.location.reload(true);
                setTimeout(() => {
                    navigate(data.data.redirect);
                },2000);
            }
        }).catch(err => {
            setUsernameErr(err.response.data.errors.username);
            setPasswordErr(err.response.data.errors.password);
            setTimeout(() => {
              setUsernameErr('');
              setPasswordErr('');
            },2000)
        })
    }
  
    return (
      <div className="content h-full">
      <Helmet><title>Tulin Bicycle Shop | Login</title></Helmet>
          <div className="max-content auth-container">
              <img className="auth-logo" src="/image/tulin.png" alt="Tulin logo" />
              <form className="auth-form" onSubmit={onLogin}>
                  <h1 className="font-semibold md:hidden block">Login to your account</h1>
                  <h1 className="font-bold text-xl text-gray-800 md:block hidden">Customer Login</h1>
                  <Link className="text-blue-500 text-sm md:block hidden" to='/adminlogin'>login as admin?</Link>
                  { success === 'this user is not yet verified, please verify your account' ? 
                    <Link onClick={sendCodeToMail} to={`/verify/${verifyId}`} className="flex items-center text-sm underline text-red-500 gap-2">
                        { success }
                    </Link> : 
                    <span className="flex items-center font-semibold text-lg text-green-500 gap-2">
                        { success }
                    </span> 
                  }
                  <input className="auth-input" type="text" placeholder="Enter username" 
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                  />
                  <span className="username-error">{ usernameErr }</span>
                  <div className="w-full relative">
                    <input className="auth-input w-full" type={ showPassword ? 'text' : 'password' } placeholder="Enter password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    { showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-2 cursor-pointer text-3xl text-gray-800" /> : 
                    <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-2 cursor-pointer text-3xl text-gray-800" />}
                    <span className="pass-error">{ passwordErr }</span>
                  </div>
                  <Link className="md:hidden block text-xs text-blue-500 font-semibold -mt-2 text-right" to='/forgotpassword'>forgot password?</Link>
                  <button className="auth-button">Login</button>
                  <Link to='/forgotpassword' className="auth-forgot">Forgot password?</Link>
                  <Link to='/signup' className="auth-create">Create new account</Link>
                  <div className="md:hidden block">
                    <p className="text-xs">Don't have an account yet? <Link className="text-xs text-blue-500" to='/signup'>sign up here</Link></p>
                  </div>
                  <Link to='/' className="auth-view">View items in store</Link>
              </form>
          </div>
      </div>
    );
};

export default Login;
