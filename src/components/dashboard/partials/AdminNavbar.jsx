import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegPlusSquare } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';

import { Link } from 'react-router-dom';
// ASdasdasd

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-100 p-3 flex justify-between shadow-md">
        <div className="flex items-center gap-10">
            <span className="text-2xl font-bold cursor-pointer"><GiHamburgerMenu /></span>
            <Link to='/dashboard/addproduct' className="flex gap-2 items-center p-2 border-2 rounded border-gray-900">
                <span><FaRegPlusSquare className="text-gray-900 text-2xl" /></span>
                <span>Add Product</span>
            </Link>
        </div>
        <div className="flex items-center gap-2 w-1/2">
            <input className="p-2 outline-none rounded w-full" type="search" placeholder="Search parts/items" id="" />
            <button className="bg-gray-800 p-2 rounded text-gray-100">Search</button>
        </div>
        <div className="flex items-center gap-2">
            <div className="relative">
                <span className="bg-red-500 text-gray-100 absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-semibold">3</span>
                <BsBell className="text-2xl font-bold" />
            </div>
            <h2 className="font-semibold text-xl select-none">{ localStorage.getItem('adminName') }</h2>
        </div>
    </nav>
  );
};

export default AdminNavbar;
