import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
 
const AdminLogin = ({ setAdminCookie }) => {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  
  const [usernameErr,setUsernameErr] = useState('');
  const [passwordErr,setPasswordErr] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    const abortCont = new AbortController();
    if(Cookies.get('adminJwt')) {
      navigate('/dashboard');
    }

    return () => abortCont.abort;
  })

  const onLogin = (e) => {
      e.preventDefault();
      axios.post('/adminlogin',{ username,password })
      .then((data) => {
          navigate(data.data.redirect);
          localStorage.setItem('adminName',data.data.adminName);
          setAdminCookie(Cookies.get('adminJwt'));
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
        <div className="max-content auth-container">
            <img className="auth-logo" src="/image/tulin.png" alt="Tulin logo" />
            <form className="auth-form" onSubmit={onLogin}>
                <h2 className="font-bold text-xl text-gray-800">Admin Login</h2>
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
                <span className="auth-forgot">Forgot password?</span>
                {/* <Link to='/adminsignup' className="auth-create">Create new account</Link> */}
                <Link to='/' className="auth-view">View items in store</Link>
            </form>
        </div>
    </div>
  );
};

export default AdminLogin;
