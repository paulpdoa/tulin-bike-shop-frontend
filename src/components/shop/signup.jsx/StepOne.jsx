import { GlobalContext } from "../../../helper/Context";
import { useContext } from "react";

const StepOne = ({ firstname,setFirstname,lastname,setLastname,username,setUsername,email,setEmail,usernameErr,emailErr,setActiveStep }) => {

  const { setShowAlert,setAlertMssg } = useContext(GlobalContext);  
    
  const validateFirstStep = () => {
    if(firstname === '') {
        setShowAlert(true);
        setAlertMssg('First name cannot be empty');
    } else if(lastname === '') {
        setShowAlert(true);
        setAlertMssg('Last name cannot be empty');
    } else if(username === '') {
        setShowAlert(true);
        setAlertMssg('Username cannot be empty');
    } else if(email === '') {
        setShowAlert(true);
        setAlertMssg('Email cannot be empty');
    } else {
        setActiveStep('step two')
    }
  } 
    
  return (
    <div className="w-full"> 
        <div className="flex flex-col gap-2">
            <label htmlFor="firstname">First Name:</label>
            <input className="user-auth" type="text" placeholder="First name" 
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                required
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="lastname">Last Name:</label>
            <input className="user-auth" type="text" placeholder="Last name" 
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                required
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="username">Username:</label>
            <input className="user-auth" type="text" placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
            />
            <span className="username-error">{ usernameErr }</span>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input onKeyPress={(e) => e.key === 'Enter' && validateFirstStep()} className="user-auth" type="email" placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
            <span className="username-error">{ emailErr }</span>
        </div>
        <div onClick={validateFirstStep} className="w-32 cursor-pointer text-center flex flex-col">
            <span className="bg-gray-900 text-gray-100 p-2 rounded">Next</span>
        </div>
    </div>
  )
}

export default StepOne;