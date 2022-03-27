
const StepThree = ({ password,setPassword,confirmPassword,setConfirmPassword,passLimitErr,passErr,setActiveStep,onSignup }) => {
  return (
    <div className="w-full">
         <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input className="user-auth" type="password" placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <span className="pass-error">{ passLimitErr }</span>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="confirm password">Confirm Password:</label>
            <input className="user-auth" type="password" placeholder="Confirm password" 
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
            />
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
    </div>
  )
}

export default StepThree