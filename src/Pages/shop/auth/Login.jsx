import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useEffect,useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import axios from 'axios';
import Cookies from 'js-cookie';

const Login = ({ setCustomerCookie }) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    
    const [usernameErr,setUsernameErr] = useState('');
    const [passwordErr,setPasswordErr] = useState('');
  
    const [success,setSuccess] = useState('');

    const navigate = useNavigate();

    // protect login page when the customer is already logged in
    useEffect(() => {
        if(Cookies.get('customerJwt')) {
            navigate('/');
        }
    })

    const onLogin = (e) => {
        e.preventDefault();
        axios.post('/customerlogin',{ username,password })
        .then((data) => {
            setSuccess(data.data.mssg);
            setCustomerCookie(Cookies.get('customerJwt'));
            Cookies.set('customerId',data.data.customerId, { expires: 31 });
            localStorage.setItem('customer_name',`${data.data.customerFirstname} ${data.data.customerSurname}`);
            setTimeout(() => {
                navigate(data.data.redirect);
            },2000);
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
                  <h2 className="font-bold text-xl text-gray-800">Customer Login</h2>
                  { success && 
                  <span className="flex items-center font-semibold text-lg text-green-500 gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" /> { success }
                  </span> }
                  <input className="auth-input" type="text" placeholder="Enter username" 
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                  />
                  <span className="username-error">{ usernameErr }</span>
                  <input className="auth-input" type="password" placeholder="Enter password" 
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                  />
                  <span className="pass-error">{ passwordErr }</span>
                  <button className="auth-button">Login</button>
                  <Link to='/forgotpassword' className="auth-forgot">Forgot password?</Link>
                  <Link to='/signup' className="auth-create">Create new account</Link>
                  <Link to='/' className="auth-view">View items in store</Link>
              </form>
          </div>
      </div>
    );
};

export default Login;
