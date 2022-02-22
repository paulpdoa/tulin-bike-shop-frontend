import { useState,useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import { BsCaretDownSquare } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiLogIn,FiLogOut } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs';

const showMenuVar = {
  hidden: {
    y: '-3vh',
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
    y:'-3vh',
    opacity:0
  }
}

const Navbar = ({ customerCookie }) => {

  const [showMenu,setShowMenu] = useState(false);
  const [showTopNav,setShowTopNav] = useState(true);

  const navigate = useNavigate();

  const onLogout = () => {
    axios.get('/customerlogout')
    .then((data) => {
      navigate(data.data.redirect);
      localStorage.removeItem('customer_name');
    }).catch((err) => {
      console.log(err.message);
    })
  }

  useEffect(() => {
    const abortCont = new AbortController();

    window.addEventListener('scroll',() => {
      window.scrollY > 88 ? setShowTopNav(false) : setShowTopNav(true);
    })
    
    return () => abortCont.abort();
  })

  return (
    <nav className="content navbar">
      <div className="max-content">
          <div className="flex justify-around border-b-2">
            <div className="flex items-center gap-2 w-1/2">
              <Link to='/'>
                <img className="navbar-logo" src="/image/tulin.png" alt="Tulin logo" />
              </Link>
              <input className="p-2 w-full rounded outline-none" type="search" placeholder="Search parts/brand" />
            </div>
            <ul className="flex items-center justify-center gap-3 text-gray-100">
              <Link to='/'><li>Home</li></Link>
              <Link to='/about'><li>About</li></Link>
              <Link to='/contact'><li>Contact Us</li></Link>
              <Link className="text-2xl" to={`/cart/${Cookies.get('customerId')}`}><AiOutlineShoppingCart /></Link>
              <li className="text-2xl relative">
                <BsCaretDownSquare onClick={ () => setShowMenu(!showMenu) } className="cursor-pointer" />
                <AnimatePresence>
                  { showMenu &&  
                    <motion.div className="absolute bg-gray-900 w-52 right-0 rounded shadow-xl mt-3 text-gray-200 text-lg flex flex-col p-3"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={showMenuVar}
                    >
                      { customerCookie ? 
                      <>
                        <button onClick={onLogout} className="flex items-center gap-2"><FiLogOut /> Logout</button>
                        <Link to={`/profile/${Cookies.get('customerId')}`} className="flex items-center gap-2"><BsPersonCircle /> {localStorage.getItem('customer_name')}</Link> 
                      </>
                      : 
                        <Link to='/login' className="flex items-center gap-2"><FiLogIn /> Login</Link> 
                      }
                    </motion.div>
                  }
                </AnimatePresence>
              </li>
            </ul>
          </div>
          <nav 
            className={ showTopNav ? 
            "flex justify-center items-center" : 
            "flex justify-around items-center fixed w-screen z-50 left-0 bg-black top-0 p-2" }
            >
            <ul className="flex items-center justify-around w-full p-2 text-gray-100">
              <Link to='/products/bikes'><li>BIKES</li></Link>
              <Link to='/reservation'><li>RESERVATION</li></Link>
              <Link to='/customize'><li>CUSTOMIZE</li></Link>
              <Link to='/products/parts'><li>BIKE PARTS</li></Link>
              <Link to='/products/accessories'><li>ACCESSORIES</li></Link>
            </ul>
          </nav>
      </div>
    </nav>
  );
};

export default Navbar;
