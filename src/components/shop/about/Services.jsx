import React from 'react'

const Services = () => {
  return (
    <section className="h-screen flex justify-center relative">
        <img className="w-full" src="/image/about/rectangle.png" alt="rectangle" />
        <div className="absolute flex flex-col items-center justify-center text-white w-full h-full">
            <h1 className="text-4xl md:text-5xl font-semibold text-center py-20">Our Services</h1>
            <div className="flex w-full justify-center gap-24 items-center mt-12">
                <div className="bg-gray-100 rounded p-4 shadow-4xl">
                    <img className="object-cover" src="/image/about/Bicycle.png" alt="bicycle" />
                    <h2 className="font-semibold text-3xl text-center text-gray-800">Bike Builder</h2>
                </div>
                <div className="bg-gray-100 rounded p-4 shadow-4xl">
                    <img className="object-cover" src="/image/about/Bicycle.png" alt="bicycle" />
                    <h2 className="font-semibold text-3xl text-center text-gray-800">Online Shop</h2>
                </div>
                <div className="bg-gray-100 rounded p-4 shadow-4xl">
                    <img className="object-cover" src="/image/about/Bicycle.png" alt="bicycle" />
                    <h2 className="font-semibold text-3xl text-center text-gray-800">Schedule Repair</h2>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Services