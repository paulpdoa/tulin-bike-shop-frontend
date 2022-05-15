import React from 'react'

const CustomUpdates = () => {
  return (
    <div className="md:p-20 p-10 md:h-screen md:col-span-2 col-span-3 md:mt-0 -mt-10 relative">
        <div className="md:bg-gray-900 bg-gray-100 shadow-2xl md:shadow-none w-full h-4/5 md:text-gray-100 text-gray-800 rounded-md p-10 overflow-y-scroll">
            <h1 className="font-semibold md:text-4xl text-3xl py-1">Customize Updates</h1>
            <h2 className="font-semibold text-lg border-b-2 border-gray-400">Items</h2>
            <div className="flex mt-2">
                <img className="w-28 h-28 object-cover" src="/image/bikewheel.png" alt="bike" />
                <div className="flex flex-col">
                    <h1 className="font-semibold text-lg">March 10, 2022</h1>
                    <p>Your bike is already at 30%</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomUpdates