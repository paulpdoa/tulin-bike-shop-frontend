import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { motion,AnimatePresence } from 'framer-motion';
import axios from 'axios';

import { BiLogOut } from 'react-icons/bi';
import { MdOutlineDashboardCustomize,MdOutlineDirectionsBike,MdOutlineMessage,MdOutlineSettingsInputSvideo } from 'react-icons/md';
import { BsBagCheck,BsHouseDoor } from 'react-icons/bs';
import { AiOutlineDollar,AiFillCaretDown,AiFillCaretUp,AiOutlineCalendar } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { RiEBikeFill } from 'react-icons/ri';

const slideLeftVar = {
    hidden: {
        x:0
    },
    visible: {
        x:0,
        transition: {
            type: 'spring'
        }
    },
    exit: {
        x:'-50vw',
        transition: {
            type: 'spring'
        }
    }
}

const inventVar = {
    hidden: {
        y:0,
        opacity:0
    },
    visible: {
        y:0,
        opacity:1,
        transition: {
            type:'spring',
            duration:1
        }
    },
    exit: {
        y:0,
        opacity:0
    }
}

const Sidebar = ({ adminCookie,showSidebar }) => {

  const [showInventory,setShowInventory] = useState(false);

  const navigate = useNavigate();

  const onLogout = () => {
      axios.get('/adminlogout')
      .then((data) => {
          navigate(data.data.redirect);
          localStorage.removeItem('adminName');
      }).catch(err => console.log(err))
  }

  return (
      <>
          <AnimatePresence>
            <motion.nav className={`bg-gray-900 text-gray-100 h-screen col-span-1 fixed overflow-x-hidden w-72 left-0 top-0 select-none ${!showSidebar && 'hidden'}`}
                variants={slideLeftVar}
                initial="visible"
                animate="hidden"
                exit="exit"
            >
                <div className="flex items-center justify-center">
                    <img className="invert w-4/5 self-center" src="/image/tulin.png" alt="Tulin logo" />
                </div>
                <ul className="ml-6 text-xl flex flex-col gap-3">
                    <Link to='/dashboard' className="flex items-center justify-between hover:bg-gray-500 p-2 hover:rounded-l-full transition duration-300 rounded-l-full">
                        <li className="flex items-center gap-2"><MdOutlineDashboardCustomize />Dashboard</li>
                    </Link>
                    <Link to='/dashboard/orders' className="flex items-center justify-between hover:bg-gray-500 p-2 hover:rounded-l-full transition duration-300 rounded-l-full">
                        <li className="flex items-center gap-2"><BsBagCheck />Orders</li>
                    </Link>
                    <Link to='/dashboard/sales' className="flex items-center justify-between hover:bg-gray-500 p-2 hover:rounded-l-full transition duration-300 rounded-l-full">
                        <li className="flex items-center gap-2"><AiOutlineDollar />Sales</li>
                    </Link>
                    <Link to='/dashboard/schedules' className="flex items-center justify-between hover:bg-gray-500 p-2 hover:rounded-l-full transition duration-300 rounded-l-full">
                        <li className="flex items-center gap-2"><AiOutlineCalendar />Schedules</li>
                    </Link>
                    <li className="cursor-pointer flex justify-between items-center gap-2 relative hover:bg-gray-500 p-2 hover:rounded-l-full transition duration-300 rounded-l-full" onClick={() => setShowInventory(!showInventory)}>
                        <div className="flex items-center gap-2"><BsHouseDoor />Inventory</div>
                        <span className="cursor-pointer mr-3">{ !showInventory ? <AiFillCaretDown /> : <AiFillCaretUp /> }</span>
                        <AnimatePresence>
                            { showInventory &&  
                                <motion.ul className="absolute top-0 left-0 bg-gray-200 text-gray-900 w-52 rounded shadow-lg p-5"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={inventVar}
                                >
                                    <Link to='/dashboard/inventory/bikes'>
                                        <li className="flex items-center gap-2"><MdOutlineDirectionsBike />Bikes</li>
                                    </Link>
                                    <Link to='/dashboard/inventory/accessories'>
                                        <li className="flex items-center gap-2"><MdOutlineSettingsInputSvideo />Accessories</li>
                                    </Link>
                                    <Link to='/dashboard/inventory/parts'>
                                        <li className="flex items-center gap-2"><RiEBikeFill />Parts</li>
                                    </Link>  
                                </motion.ul>
                            }
                    </AnimatePresence>
                    </li>
                    
                    <Link to='/dashboard/messages' className="flex items-center justify-between hover:bg-gray-500 p-2 hover:rounded-l-full transition duration-300 rounded-l-full">
                        <li className="flex items-center gap-2"><MdOutlineMessage />Messages</li>
                    </Link>
                    {/* <Link to='/dashboard/settings'>
                        <li className="flex items-center gap-2"><FiSettings />Settings</li>
                    </Link> */}
                </ul>
                { adminCookie ? 
                    <span onClick={onLogout} className="text-lg absolute bottom-5 left-2 font-bold flex gap-2 items-center cursor-pointer"><BiLogOut /> Logout</span>
                    :
                    <Link to='/adminlogin' className="text-lg absolute bottom-5 left-2 font-bold flex gap-2 items-center cursor-pointer"><BiLogOut /> Login</Link>
                }
            </motion.nav>
          </AnimatePresence>
      </>
  );
};

export default Sidebar;
