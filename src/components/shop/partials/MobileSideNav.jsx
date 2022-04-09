import { MdKeyboardArrowDown,MdKeyboardArrowUp } from 'react-icons/md';
import { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion,AnimatePresence } from 'framer-motion';
import { GlobalContext } from '../../../helper/Context';
import Cookies from 'js-cookie';

const slideMenuVar = {
  hidden: {
    opacity:0,
    x:'-3vw',
    transition: {
      type: 'tween',
      duration: 0.2
    }
  },
  visible: {
    opacity:1,
    x:0,
    transition: {
      type: 'tween',
      duration:0.2
    }
  },
  exit: {
    x:'-3vw',
    transition: {
      type:'spring',
      duration:0.2
    }
  }
}

const slideDownVar = {
  hidden: {
    x:'-3vh',
    opacity:0,
    transition: {
      type:'tween',
      duration:0.2
    }
  },
  visible: {
    x:0,
    opacity:1,
    transition: {
      type:'tween',
      duration:0.2
    }
  }
}

const MobileSideNav = () => {
  
  const [showServices,setShowServices] = useState(false);
  const { showSideNav,customerCookie } = useContext(GlobalContext);
  const [customer] = useState(localStorage.getItem('customer_name'));

  return (
    <AnimatePresence>
      <motion.nav className="md:hidden bg-white fixed left-0 w-1/2 h-full top-0 shadow-2xl flex flex-col items-center" style={{ zIndex:"100" }}
      key={showSideNav}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideMenuVar}
      >
          <img className="border-b-2 border-gray-800 w-4/5" src="/image/tulin.png" alt="tulin logo" />
          <ul className="w-4/5 mt-5">
              <li className="p-2 text-lg border-b border-gray-700"><Link to='/'>Home</Link></li>
              <li className="p-2 text-lg border-b border-gray-700"><Link to='/about'>About</Link></li>
              <li className="p-2 text-lg border-b border-gray-700"><Link to='/contact'>Contact</Link></li>
              <li onClick={() => setShowServices(!showServices)} className="p-2 text-lg border-b border-gray-700"><span className="flex justify-between items-center gap-2">Services{ showServices ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span></li>
              {/* Under of services */}
              { showServices &&
              <motion.div className="p-2 flex flex-col gap-2 bg-gray-100 text-sm shadow-xl mt-2 rounded"
                initial="hidden"
                animate="visible"
                variants={slideDownVar}
              >
                <Link to='/products/bikes'>Bikes</Link>
                <Link to='/products/parts'>Bike Parts</Link>
                <Link to='/products/accessories'>Accessories</Link>
                <Link to='/reservation'>Schedule</Link>
                <Link to='/customize'>Customize</Link>
              </motion.div>
              }
          </ul>
          { customerCookie ? <Link className="w-4/5 text-sm text-blue-500 mt-5" to={`/profile/${Cookies.get('customerId')}`}>Hi {customer}!</Link> : <Link className="bg-gray-800 text-gray-100 p-2 w-4/5 text-center mt-5" to='/login'>Login</Link> }
          <Link className="text-sm text-blue-500 w-4/5 mt-2" to='/signup'>Sign up</Link>
      </motion.nav>
    </AnimatePresence>
  )
}

export default MobileSideNav