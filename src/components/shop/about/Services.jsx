import React from 'react'

const Services = () => {
  return (
    <section className="md:h-screen flex justify-center relative">
        <img className="w-full hidden md:block" src="/image/about/rectangle.png" alt="rectangle" />
        <div className="md:absolute static flex flex-col items-center justify-center text-white w-full h-full">
            <h1 className="text-4xl md:text-5xl font-semibold text-center py-20">Our Services</h1>
            <div className="flex flex-col md:flex-row w-full justify-center gap-24 items-center mt-12">
                <div className="bg-gray-100 rounded p-4 flex flex-col items-center shadow-4xl">
                    <img className="object-cover w-4/5 h-1/3" src="/image/about/bike.png" alt="bicycle" />
                    <h2 className="font-semibold text-3xl text-center text-gray-800">Bike Builder</h2>
                </div>
                <div className="bg-gray-100 rounded p-4 flex flex-col items-center shadow-4xl">
                    <img className="object-cover w-4/5 h-1/3" src="/image/about/shop.png" alt="shop" />
                    <h2 className="font-semibold text-3xl text-center text-gray-800">Online Shop</h2>
                </div>
                <div className="bg-gray-100 rounded p-4 flex flex-col items-center shadow-4xl">
                    <img className="object-cover w-4/5 h-1/3" src="/image/about/calendar.png" alt="calendar" />
                    <h2 className="font-semibold text-3xl text-center text-gray-800">Schedule Repair</h2>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Services