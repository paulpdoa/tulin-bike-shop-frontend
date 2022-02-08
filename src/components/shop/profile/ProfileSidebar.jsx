import { BiUserCircle,BiShoppingBag,BiHistory,BiTrash } from 'react-icons/bi';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProfileSidebar = () => {

    const [sideTitle,setSideTitle] = useState('My Account');

  return (
      <nav className="col-span-1 p-20">
        <h1 className="font-semibold text-4xl text-gray-800">{sideTitle}</h1>
        <ul className="flex flex-col gap-5 mt-5 text-gray-800 text-lg">
            <Link onClick={() => setSideTitle('My Account')} to={`/profile/${Cookies.get('customerId')}`}>
                <li className="flex gap-2 items-center"><BiUserCircle />My Account</li>
            </Link>
            <Link onClick={() => setSideTitle('Orders')} to={`/profile/orders/${Cookies.get('customerId')}`}>
                <li className="flex gap-2 items-center"><BiShoppingBag />Orders</li>
            </Link>
            <Link onClick={() => setSideTitle('History')} to={`/profile/history/${Cookies.get('customerId')}`}>
                <li className="flex gap-2 items-center"><BiHistory />History</li>
            </Link>
            <Link onClick={() => setSideTitle('Delete Account')} to={`/profile/delete/${Cookies.get('customerId')}`}>
                <li className="flex gap-2 items-center"><BiTrash />Delete Account</li>
            </Link>
        </ul>      
      </nav>
  );
};

export default ProfileSidebar;
