import {MdKeyboardArrowDown} from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileSideNav = () => {
  
  const [showServices,setShowServices] = useState(false);
  return (
    <nav className="md:hidden bg-white fixed left-0 w-1/2 h-full top-0 shadow-2xl flex flex-col items-center" style={{ zIndex:"100" }}>
        <img className="border-b-2 border-gray-800 w-4/5" src="/image/tulin.png" alt="tulin logo" />
        <ul className="w-4/5 mt-5">
            <li className="p-2 text-xl border-b border-gray-700"><Link to='/'>Home</Link></li>
            <li className="p-2 text-xl border-b border-gray-700"><Link to='/about'>About</Link></li>
            <li className="p-2 text-xl border-b border-gray-700"><Link to='/contact'>Contact</Link></li>
            <li className="p-2 text-xl border-b border-gray-700"><span className="flex justify-between items-center gap-2">Services<MdKeyboardArrowDown /></span></li>
        </ul>
    </nav>
  )
}

export default MobileSideNav