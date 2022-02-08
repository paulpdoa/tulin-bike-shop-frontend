import { Link } from "react-router-dom";

const Offers = () => {
  return (
        <div className="content py-20">
            <div className="max-content flex items-center">
                <div className="flex justify-around items-center w-full">
                    <div className="h-full w-72 shadow-lg border border-gray-300 rounded overflow-hidden">
                        <div className="w-72 overflow-hidden">
                            <img className="object-cover h-48 w-full transform transition duration-300 hover:scale-150" src="/image/cycle.jpg" alt="cycle" />
                        </div>
                        <div className="text-gray-800 h-full px-2 py-3">
                            <h2 className="font-bold text-2xl">OUR LATEST EYEWEAR</h2>
                            <h3 className="text-base">BEST SELLER FROM TOP BRANDS</h3>
                            <Link className="rounded-md font-semibold p-2 border-2 border-gray-900 mt-3 block w-2/5 text-center" to='/accessories'>SHOP NOW</Link>
                        </div>
                    </div>
                    <div className="h-full w-72 shadow-lg border border-gray-300 rounded overflow-hidden">
                        <div className="w-72 overflow-hidden">
                            <img className="object-cover h-48 w-full transform transition duration-300 hover:scale-150" src="/image/diskbrake.jpg" alt="disk brake" />
                        </div>
                        <div className="text-gray-800 h-full px-2 py-3">
                            <h2 className="font-bold text-2xl">BIKE PARTS</h2>
                            <h3 className="text-base">OUR LATEST COLLECTION</h3>
                            <Link className="rounded-md font-semibold p-2 border-2 border-gray-900 mt-3 block w-2/5 text-center" to='/accessories'>SHOP NOW</Link>
                        </div>
                    </div>
                    <div className="h-full w-72 shadow-lg border border-gray-300 rounded overflow-hidden">
                        <div className="w-72 overflow-hidden">
                            <img className="object-cover h-48 w-full transform transition duration-300 hover:scale-150" src="/image/pedal.jpg" alt="pedal" />
                        </div>
                        <div className="text-gray-800 h-full px-2 py-3">
                            <h2 className="font-bold text-2xl">WHEELS AND TIRES</h2>
                            <h3 className="text-base">OUR LATEST COLLECTION</h3>
                            <Link className="rounded-md font-semibold p-2 border-2 border-gray-900 mt-3 block w-2/5 text-center" to='/accessories'>SHOP NOW</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Offers;
