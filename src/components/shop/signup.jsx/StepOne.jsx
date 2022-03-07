
const StepOne = ({ firstname,setFirstname,lastname,setLastname,username,setUsername,email,setEmail,usernameErr,emailErr,setActiveStep }) => {

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
            <input onKeyPress={(e) => e.key === 'Enter' && setActiveStep('step two')} className="user-auth" type="email" placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
            <span className="username-error">{ emailErr }</span>
        </div>
        <div onClick={() => setActiveStep('step two')} className="w-32 cursor-pointer text-center flex flex-col">
            <span className="bg-gray-900 text-gray-100 p-2 rounded">Next</span>
        </div>
    </div>
  )
}

export default StepOne