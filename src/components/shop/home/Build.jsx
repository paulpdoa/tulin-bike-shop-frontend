import { Link } from "react-router-dom";

const Build = () => {
  return (
    <div className="content py-5">
        <div className="max-content flex items-center">
            <div className="build-bg rounded-md overflow-hidden flex">
                <img className="object-cover w-1/2" src="/image/build.jpg" alt="Build Bike Cover" />
                <div className="text-gray-100 w-full flex flex-col py-20 px-10">
                    <h1 className="text-7xl">BUILD YOUR OWN BIKE</h1>
                    <Link className="p-2 border-gray-100 border-2 w-1/3 text-center rounded ml-1 mt-3" to='/customize'>CUSTOMIZE NOW</Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Build;
