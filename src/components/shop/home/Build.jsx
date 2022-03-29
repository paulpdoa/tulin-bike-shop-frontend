import { Link } from "react-router-dom";

const Build = () => {
  return (
    <div className="content py-5 build-banner">
        <div className="max-content flex items-center justify-center">
            <div className="flex flex-col items-center text-gray-200">
              <h1 className="text-5xl">Build your own <span className="font-bold">Bike</span></h1>
              <Link className="text-center p-3 rounded border-2 border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-300 cursor-pointer mt-5" to='/customize'>Customize Now</Link>
            </div>
        </div>
    </div>
  );
};

export default Build;
