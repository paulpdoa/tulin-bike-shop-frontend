import { useState,useEffect,useContext } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchData } from '../../../helper/fetching';


import { BsCaretDownSquare } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiLogIn,FiLogOut } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GlobalContext } from '../../../helper/Context';

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

const searchVar = {
  hidden: {
    x: '5vw',
    opacity:0
  },
  visible: {
    x: 0,
    opacity:1,
    transition: {
      type: 'spring',
      duration:1
    }
  },
  exit: {
    x:'5vw',
    opacity:0,
    transition: {
      type:'tween'
    }
  }
}

const Navbar = ({ customerCookie }) => {

  // Check if logged to change state inside the dropdown
  const [isLogged,setIsLogged] = useState(false);

  const [inventories,setInventories] = useState([]);
  const [searchedItem,setSearchedItem] = useState('');
  const [showMenu,setShowMenu] = useState(false);
  const [showTopNav,setShowTopNav] = useState(true);
  const [cartCount,setCartCount] = useState(0);

  const [customer,setCustomer] = useState('');
  const [isLoading,setIsLoading] = useState(true);

  const { imgProfileLocation } = useContext(GlobalContext);
  const [userImg,setUserImg] = useState('');

  const [showSearch,setShowSearch] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();
    axios.get(`/customer/${Cookies.get('customerId')}`,{signal:abortCont.signal})
    .then(data => {
        setUserImg(data.data.profilePicture);
    })
    return () => abortCont.abort();
  },[userImg])
  
  // Set customer name to none or with name
  useEffect(() => {
    const abortCont = new AbortController();

    setCustomer(localStorage.getItem('customer_name'));

    return () => abortCont.abort();
  },[customer,customerCookie])

  // Get length of cart for display
  useEffect(() => {
    const abortCont = new AbortController();
    Cookies.get('customerId') !== undefined && fetchData({ signal:abortCont.signal },`/cart/${Cookies.get('customerId')}`,setCartCount,setIsLoading);
    return () => abortCont.abort();
  },[cartCount])

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
      window.scrollY > 330 ? setShowTopNav(false) : setShowTopNav(true);
    })
    
    return () => abortCont.abort();
  });

  // Get items for searching
  useEffect(() => {
    const abortCont = new AbortController();
    const fetchData = async () => {
      try {
        const data = await axios.get('/inventory',{ signal:abortCont.signal });
        setInventories(data.data);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchData();
    return () => abortCont.abort();
  },[inventories]);

  const handleSearch = (e) => {
    e.preventDefault();
    const product = e.target.value;
    const data = inventories.filter((inventory) => {
      return inventory.product_name.toLowerCase().includes(product.toLowerCase());
    })
    product === '' ? setSearchedItem([]) : setSearchedItem(data);
    console.log(data);
  }

  useEffect(() => {
    if(customerCookie) setIsLogged(true);
  },[customerCookie])

  return (
    <nav className={`content navbar w-full ${showTopNav ? 'bg-white border-b-4 border-gray-200' : 'bg-white bg-opacity-50 z-50 fixed top-0 border-b-4 text-black font-semibold border-gray-200'}`}>
      <div className="max-content flex justify-between items-center">
          <div className="flex h-20 items-center md:gap-16 gap-0">
            <GiHamburgerMenu onClick={() => console.log('show side nav')} className="md:hidden block text-3xl"/>
            <Link to='/'><img className="md:w-32 md:h-32 w-20 h-20 object-cover" src="/image/tulin.png" alt="logo" /></Link>
            <ul className="gap-9 list-none md:flex hidden">
              <li className="cursor-pointer max-w-max hover:border-b-2 hover:border-gray-200 transition duration-300"><Link to="/">Home</Link></li>
              <li className="cursor-pointer max-w-max hover:border-b-2 hover:border-gray-200 transition duration-300"><Link to="/about">About</Link></li>
              <li className="cursor-pointer max-w-max hover:border-b-2 hover:border-gray-200 transition duration-300"><Link to="/contact">Contact</Link></li>
              <li className="cursor-pointer group max-w-max hover:border-b-2 hover:border-gray-200 transition duration-300">
                Services
                <div className="absolute top-14 bg-white bg-opacity-50 border border-gray-200 shadow-lg rounded w-full left-0 z-50 p-10 hidden group-hover:block">
                  <ul className="flex justify-around items-center p-5">
                    <li className="hover:scale-75 transition duration-300">
                      <Link className="flex flex-col items-center gap-2" to='/products/bikes'>
                        <img src="/image/navbar/bike.png" alt="bike" />
                        <label className="text-2xl font-medium" htmlFor='bike'>Bikes</label>
                      </Link>
                    </li>
                    <li className="hover:scale-75 transition duration-300">
                      <Link className="flex flex-col items-center gap-2" to='/products/parts'>
                        <img src="/image/navbar/parts.png" alt="parts" />
                        <label className="text-2xl font-medium" htmlFor='parts'>Parts</label>
                      </Link>
                    </li>
                    <li className="hover:scale-75 transition duration-300">
                      <Link className="flex flex-col items-center gap-2" to='/products/accessories'>
                        <img src="/image/navbar/accessories.png" alt="accessories" />
                        <label className="text-2xl font-medium" htmlFor='accessorries'>Accessories</label>
                      </Link>
                    </li>
                    <li className="hover:scale-75 transition duration-300">
                      <Link className="flex flex-col items-center gap-2" to='/customize'>
                        <img src="/image/navbar/customize.png" alt="customize" />
                        <label className="text-2xl font-medium" htmlFor='customize'>Customize</label>
                      </Link>
                    </li>
                    <li className="hover:scale-75 transition duration-300">
                      <Link className="flex flex-col items-center gap-2" to='/reservation'>
                        <img src="/image/navbar/schedule.png" alt="schedule" />
                        <label className="text-2xl font-medium" htmlFor='sched'>Schedule</label>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            { customer !== null && customerCookie ? 
              <div className="md:flex hidden items-center gap-2">
                  <div className="group cursor-pointer relative">
                    <span className="flex items-center gap-2 transition duration-300"><img className="w-7 object-cover h-7 rounded-full" src={`${imgProfileLocation}${userImg}`} alt={customer}/>Hi {customer}!</span>
                    <div className="hidden group-hover:block absolute bg-white p-3 z-50 rounded-md border border-gray-200 w-44">
                      <Link to={`/profile/${Cookies.get('customerId')}`} className="flex items-center gap-2 hover:scale-110 transition duration-300"><BsPersonCircle />My Account</Link><br/>
                      <button onClick={onLogout} className="flex items-center gap-2 hover:scale-110 transition duration-300"><FiLogOut />Logout</button>
                    </div>
                  </div>
              </div> : 
              <Link to='/login' className="p-2 rounded bg-gray-900 text-gray-200 w-28 text-center">
                Log in
              </Link> }
              <AnimatePresence>
                { showSearch && 
                  <motion.div className="flex border-gray-300 border items-center rounded"
                    initial="hidden"
                    animate="visible"
                    variants={searchVar}
                    exit="exit"
                  >
                    <input onChange={handleSearch} className="outline-none p-2 text-sm" type="search" placeholder="Search here..." />
                    <BiSearchAlt className="text-2xl text-gray-200"/>
                  </motion.div> 
                }
              </AnimatePresence>
            <img onClick={() => setShowSearch(!showSearch)} className="w-7 h-6 object-cover cursor-pointer hover:scale-150 transition duration-300" src="/image/icons/Search.png" alt="search" />
            <Link className="hover:scale-110 transition duration-300 relative" to={`/cart/${Cookies.get('customerId')}`}>
              <img className="w-7 h-8 object-cover cursor-pointer" src="/image/icons/Shopping-Cart.png" alt="shopping cart" />
              { cartCount > 0 && <span className="bg-red-500 w-5 h-5 text-gray-100 flex items-center justify-center rounded-full text-xs -right-2 absolute top-0">{cartCount}</span> }
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
