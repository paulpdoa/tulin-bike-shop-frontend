import { useState } from 'react';
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';

const StepThree = ({ password,setPassword,confirmPassword,setConfirmPassword,passLimitErr,passErr,setActiveStep,onSignup,agree,setAgree }) => {

  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    
  return (
    <div className="w-full relative">
         <div className="flex flex-col gap-2 relative">
            <label htmlFor="password">Password:</label>
            <input className="user-auth" type={!showPassword ? 'password' : 'text'} placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            { !showPassword ? <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-5 text-xl cursor-pointer" /> : <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-5 text-xl cursor-pointer" /> }
            <span className="pass-error">{ passLimitErr }</span>
        </div>
        <div className="flex flex-col gap-2 relative">
            <label htmlFor="confirm password">Confirm Password:</label>
            <input className="user-auth" type={!showConfirmPassword ? 'password' : 'text'} placeholder="Confirm password" 
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
            />
            { !showConfirmPassword ? <AiOutlineEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 bottom-5 text-xl cursor-pointer" /> : <AiOutlineEyeInvisible onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 bottom-5 text-xl cursor-pointer" /> }
            <span className="pass-error">{ passErr }</span>
        </div>
        <div className="flex items-center gap-2">
            <div onClick={() => setActiveStep('step two')} className="flex-col flex gap-2 text-center cursor-pointer">
                <span className="bg-gray-900 text-gray-100 p-2 rounded">Previous</span>
            </div>
            <div className="flex-col flex gap-2">
                <button onClick={onSignup} className="signup-btn-user">Signup</button>
            </div>
        </div>
        <div className="-bottom-32 flex items-center gap-2 absolute">
            <input onChange={(e) => setAgree(e.target.checked) } type="checkbox" />
            <p className="text-xs">By clicking this, All of the information that you provide will be treated as confidential and will only be used for research purposes only to follow the Data privacy act of 2012.</p>
        </div>
    </div>
  )
}

export default StepThree