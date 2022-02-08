import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('')
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [success,setSuccess] = useState('');

    const [passErr,setPassErr] = useState('');
    const [usernameErr,setUsernameErr] = useState('');
    const [emailErr,setEmailErr] = useState('');
    const [passLimitErr,setPassLimitErr] = useState('');

    const navigate = useNavigate();

    const onSignup = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setPassErr('Password doesn\'t match, please check your password');
            setTimeout(() => {
                setPassErr('');
            },2000);
        } else {
            axios.post('/customer',{ firstname,lastname,username,email,password })
            .then((data) => {
                setSuccess(data.data.mssg);
                setTimeout(() => {
                    navigate(data.data.redirect);
                },2000)
            }).catch((err) => {
                setEmailErr(err.response.data.errors.email);
                setPassLimitErr(err.response.data.errors.password);
                setUsernameErr(err.response.data.errors.username);
                setTimeout(() => {
                    setEmailErr('');
                    setUsernameErr('');
                    setPassLimitErr('');
                },2000)
            })
        }
    }

  return (
    <div className="content h-full">
        <div className="max-content signup-container">
            <h1 className="signup-title">Create your Account</h1>
            <h2 className="signup-success">{ success && <span className="flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" />{ success }</span> }</h2>
            <form onSubmit={onSignup} className="signup-box">
                <div className="flex flex-wrap items-center justify-center gap-2 h-full">
                    <div className="flex flex-col">
                        <input className="user-auth" type="text" placeholder="First name" 
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <input className="user-auth" type="text" placeholder="Last name" 
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <input className="user-auth" type="text" placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                        <span className="username-error">{ usernameErr }</span>
                    </div>
                    <div className="flex flex-col">
                        <input className="user-auth" type="email" placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <span className="username-error">{ emailErr }</span>
                    </div>
                    <div className="flex flex-col">
                        <input className="user-auth" type="password" placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <span className="pass-error">{ passLimitErr }</span>
                    </div>
                    <div className="flex flex-col">
                        <input className="user-auth" type="password" placeholder="Confirm password" 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required
                        />
                        <span className="pass-error">{ passErr }</span>
                    </div>
                    <div className="flex-col flex gap-2">
                        <span className="signup-privacy-policy text-center">By clicking "SIGN UP"; I agree to Tulin's Term of Service and Privacy Policy</span>
                        <button className="signup-btn-user">Signup</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Signup;
