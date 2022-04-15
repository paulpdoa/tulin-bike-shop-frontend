import { useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';

const SidebarMenu = () => {

  const [showMenu,setShowMenu] = useState(false);
  const [active,setActive] = useState('');

  return (
    <nav className="text-gray-100 p-10">
      <h1 className="text-3xl font-semibold uppercase">Build your bike!</h1>
        <ul className="list-none text-xl cursor-pointer flex flex-col gap-3">
            <li className={ active === 'frame' ? "text-orange-500" : "text-gray-100" } onClick={() => setActive('frame')}>Frame</li>
            <li className={active === 'suspension' ? "text-orange-500" : "text-gray-100"} onClick={() => setActive('suspension')}>Suspension</li>
            <li className={ active === 'wheels & tires' ? "text-orange-500" : "text-gray-100" } onClick={() => setActive('wheels & tires')}>
              <span className="cursor-pointer" onClick={() => setShowMenu(!showMenu)}>Wheels & tires</span>
              <AnimatePresence>
              { showMenu && 
                <motion.ul className="ml-5"
                initial={{ y:'-5vh',opacity:0 }}
                animate={{ y:0,opacity:1 }}
                transition={{ type:'tween' }}
                exit={{ y:0, opacity:0 }}
                >
                  <li className={active === 'wheels' ? "text-orange-500" : "text-gray-100"} onClick={() => setActive('wheels')}>Wheels</li>
                  <li className={active === 'front tire' ? "text-orange-500" : "text-gray-100"} onClick={() => setActive('front tire')}>Front tire</li>
                  <li className={active === 'rear tire' ? "text-orange-500" : "text-gray-100"} onClick={() => setActive('rear tire')}>Rear tire</li>
                </motion.ul> 
                }
              </AnimatePresence>
            </li>
            <li className={ active === 'drivetrain' ? "text-orange-500" : "text-gray-100" } onClick={() => setActive('drivetrain')}>Groupset</li>
            <li className={ active === 'cockpit' ? "text-orange-500" : "text-gray-100" } onClick={() => setActive('cockpit')}>Cockpit</li>
            <li className={ active === 'brakes & rotors' ? "text-orange-500" : "text-gray-100" } onClick={() => setActive('brakes & rotors')}>Brakes & Rotors</li>
            <li className={ active === 'accessories' ? "text-orange-500" : "text-gray-100" } onClick={() => setActive('accessories')}>Accessories</li>
        </ul>
    </nav>
  )
}

export default SidebarMenu