import { useState } from 'react';

const CustomButton = () => {

    const [showSteps,setShowSteps] = useState(false);

  return (
    <div className="absolute right-24 top-28 mt-3">
        <button onClick={() => setShowSteps(!showSteps)} className="border rounded border-gray-100 text-gray-100 tracking-widest p-2 hover:bg-white hover:text-gray-800 transition duration-300">Steps</button>
        { showSteps && 
        <div className="bg-gray-100 text-gray-800 p-2 rounded">
            <h1 className="text-2xl font-semibold">Steps in building your bike</h1>
            <p>Step 1: Choose your desired frame with it's size</p>
            <p>Step 2: Choose a fork for your frame</p>
            <p>Step 3: Choose a shock</p>
            <p>Step 4: Choose a wheel</p>
            <p>Step 5: Choose a tire for your wheels</p>
            <p>Step 6: Choose a seatpost with it's saddle</p>
            <p>Step 7: Choose a groupset for your dream bike</p>
        </div>
        }
    </div>
  )
}

export default CustomButton