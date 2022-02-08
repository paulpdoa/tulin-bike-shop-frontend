import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useState } from 'axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [success,setSuccess] = useState('');

    const [passErr,setPassErr] = useState('');
    const [usernameErr,setUsernameErr] = useState('');
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
            axios.post('/admin',{ username, password })
            .then((data) => {
                setSuccess(data.data.mssg);
                setTimeout(() => {
                    navigate(data.data.redirect);
                },2000)
            }).catch((err) => {
                setUsernameErr(err.response.data.errors.username);
                setPassLimitErr(err.response.data.errors.password);
                setTimeout(() => {
                    setUsernameErr('')
                    setPassLimitErr('');
                },2000);
            })
        }
    }

  return (
    <div className="content h-full">
        <div className="max-content signup-container">
            <h1 className="signup-title">Create your Account</h1>
            <h2 className="signup-success">{ success && <span className="flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" />{ success }</span> }</h2>
            <form onSubmit={onSignup} className="signup-box">
                <div className="admin-signup">
                    <input className="admin-auth" type="text" placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <span className="username-error">{ usernameErr }</span>
                    <input className="admin-auth" type="password" placeholder="Password" 
                         onChange={(e) => setPassword(e.target.value)}
                         value={password}
                         required
                    />
                    <span className="pass-error">{ passLimitErr }</span>
                    <input className="admin-auth" type="password" placeholder="Confirm password" 
                         onChange={(e) => setConfirmPassword(e.target.value)}
                         value={confirmPassword}
                         required
                    />
                    <span className="pass-error">{ passErr }</span>
                    <span className="signup-privacy-policy">By clicking "SIGN UP"; I agree to Tulin's Term of Service and Privacy Policy</span>
                    <button className="signup-btn">Signup</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default AdminSignup;
