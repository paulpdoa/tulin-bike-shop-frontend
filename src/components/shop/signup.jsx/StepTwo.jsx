
const StepTwo = ({ mobile,setMobile,setAddress,address,setBarangay,barangay,province,setProvince,city,setCity,postalCode,setPostalCode,setActiveStep }) => {

  return (
    <div className="w-full">
        <div className="flex flex-col gap-2">
            <label htmlFor="mobile">Mobile Number:</label>
            <input className="user-auth" type="text" placeholder="Mobile Number" 
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                required
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="address">Address:</label>
            <input className="user-auth" type="text" placeholder="House no. & Street" 
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
            />
        </div>
        <div className="flex gap-3 items-center">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="barangay">Barangay:</label>
                <input className="user-auth" type="text"
                    onChange={(e) => setBarangay(e.target.value)}
                    value={barangay}
                    required
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="city">City:</label>
                <input className="user-auth" type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    required
                />
            </div>
        </div>
        <div className="flex gap-3 items-center">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="province">Province:</label>
                <input className="user-auth" type="text"
                    onChange={(e) => setProvince(e.target.value)}
                    value={province}
                    required
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="postalcode">Postal Code:</label>
                <input onKeyPress={(e) => e.key === 'Enter' && setActiveStep('step three')} className="user-auth" type="text"
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                    required
                />
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div onClick={() => setActiveStep('step one')} className="w-32 cursor-pointer text-center flex flex-col mt-3">
                <span className="bg-gray-900 text-gray-100 p-2 rounded">Previous</span>
            </div>
            <div onClick={() => setActiveStep('step three')} className="w-32 cursor-pointer text-center flex flex-col mt-3">
                <span className="bg-gray-900 text-gray-100 p-2 rounded">Next</span>
            </div>
        </div>
    </div>
  )
}

export default StepTwo