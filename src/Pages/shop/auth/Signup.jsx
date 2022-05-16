import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { Helmet } from 'react-helmet';
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import StepOne from '../../../components/shop/signup.jsx/StepOne';
import StepTwo from '../../../components/shop/signup.jsx/StepTwo';
import StepThree from '../../../components/shop/signup.jsx/StepThree';
import { baseUrl } from '../../../helper/baseUrl';

const Signup = () => {
   
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('')
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [address,setAddress] = useState('');
    const [barangay,setBarangay] = useState('');
    const [city,setCity] = useState('');
    const [province,setProvince] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [success,setSuccess] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const [passErr,setPassErr] = useState('');
    const [usernameErr,setUsernameErr] = useState('');
    const [emailErr,setEmailErr] = useState('');
    const [mobileErr,setMobileErr] = useState('');
    const [passLimitErr,setPassLimitErr] = useState('');

    const [activeStep,setActiveStep] = useState('step one'); 

    const navigate = useNavigate();

     // protect signup page when the customer is already logged in
     useEffect(() => {
        if(Cookies.get('customerJwt')) {
            navigate('/');
        }
    })

    const onSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(password !== confirmPassword) {
            setPassErr('Password doesn\'t match, please check your password');
            setTimeout(() => {
                setPassErr('');
            },2000);
        } else {
            try {
                const data = await axios.post(`${baseUrl()}/customer`,{ firstname,lastname,username,email,mobile,address,barangay,city,province,postalCode,password });
                setSuccess(data.data.mssg);
                setTimeout(() => {
                    navigate(data.data.redirect);
                },2000);
                setIsLoading(false);
            }
            catch(err) {
                setEmailErr(err.response.data.errors.email);
                setPassLimitErr(err.response.data.errors.password);
                setUsernameErr(err.response.data.errors.username);
                setMobileErr(err.response.data.errors.mobile);
                setTimeout(() => {
                    setEmailErr('');
                    setUsernameErr('');
                    setPassLimitErr('');
                    setMobileErr('');
                },2000)
                setIsLoading(false);
            }
        }
    }

  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Signup</title></Helmet>
        <div className="content md:signup-bg bg-white h-full overflow-hidden">
            <div className="max-content flex flex-col md:flex-row items-center justify-center w-1/2">
                <img className="hidden md:block object-cover h-4/5" src="/image/bike-bg.png" alt="Bike background" />
                <img className="md:hidden object-cover -mt-10" src="/image/tulin.png" alt="logo" />
                <div className="md:bg-gray-100 md:shadow-2xl h-4/5 md:w-2/5 w-4/5 relative md:mt-0 -mt-20" onSubmit={onSignup}>
                    <div className="absolute md:flex items-center gap-2 top-0 right-0 p-4 hidden">
                        <h2>Already have an account?</h2>
                        <Link to='/login' className="rounded-full border border-gray-700 p-2 shadow-xl">Sign in</Link>
                    </div>
                    <div className="px-8 py-24 -mt-28 md:mt-auto">
                        <h1 className="text-gray-800 text-5xl hidden md:block">Sign up</h1>
                        <span className="font-semibold md:font-normal">Create your account</span>
                        { isLoading && <h2 className="text-sm text-green-500 flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" />Please wait...</h2> }
                        { emailErr && <h2 className="text-sm text-red-500">{ emailErr }</h2> } 
                        { usernameErr && <h2 className="text-sm text-red-500">{ usernameErr }</h2> }
                        { mobileErr && <h2 className="text-sm text-red-500">{ mobileErr }</h2> }
                        <p className="text-sm text-green-500">{ success }</p>
                        <div className="flex items-center justify-center gap-2 mt-5 md:mt-auto">
                        {/* Pages button */}
                            <button onClick={() => setActiveStep('step one')} className={`rounded-full w-5 h-5 border border-gray-700 flex justify-center items-center p-1 text-xs ${activeStep === 'step one' && 'bg-gray-300'}`}>1</button>
                            <button onClick={() => setActiveStep('step two')} className={`rounded-full w-5 h-5 border border-gray-700 flex justify-center items-center p-1 text-xs ${activeStep === 'step two' && 'bg-gray-300'}`}>2</button>
                            <button onClick={() => setActiveStep('step three')} className={`rounded-full w-5 h-5 border border-gray-700 flex justify-center items-center p-1 text-xs ${activeStep === 'step three' && 'bg-gray-300'}`}>3</button>

                        </div>
                        <form className="flex flex-col gap-2 mt-1">
                            {/* First Step */}
                            { activeStep === 'step one' && 
                            <StepOne 
                                firstname={firstname}
                                setFirstname={setFirstname}
                                lastname={lastname}
                                setLastname={setLastname}
                                username={username}
                                setUsername={setUsername}
                                email={email}
                                setEmail={setEmail}
                                usernameErr={usernameErr}
                                emailErr={emailErr}
                                setActiveStep={setActiveStep}
                            /> }
                            {/* Second Step */}
                            { activeStep === 'step two' && 
                            <StepTwo 
                                mobile={mobile}
                                address={address}
                                barangay={barangay}
                                city={city}
                                province={province}
                                postalCode={postalCode}
                                setMobile={setMobile}
                                setAddress={setAddress}
                                setBarangay={setBarangay}
                                setCity={setCity}
                                setProvince={setProvince}
                                setPostalCode={setPostalCode}
                                setActiveStep={setActiveStep}
                            /> }
                            {/* Step Three */}
                            { activeStep === 'step three' && 
                            <StepThree 
                                password={password}
                                setPassword={setPassword}
                                confirmPassword={confirmPassword}
                                setConfirmPassword={setConfirmPassword}
                                passLimitErr={passLimitErr}
                                passErr={passErr}
                                setActiveStep={setActiveStep}
                                onSignup={onSignup}
                            /> }
                        </form>
                        <p className="text-xs mt-10 block md:hidden">Already have an account? <Link className="text-blue-500" to='/login'>login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Signup;
