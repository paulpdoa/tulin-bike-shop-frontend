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

  useEffect(() => {
    const abortCont = new AbortController();
    axios.get(`/customer/${Cookies.get('customerId')}`,{signal:abortCont.signal})
    .then(data => {
        setUserImg(data.data.profilePicture);
    })
    return () => abortCont.abort();
  },[])
  
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
      window.scrollY > 88 ? setShowTopNav(false) : setShowTopNav(true);
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
  }

  useEffect(() => {
    if(customerCookie) setIsLogged(true);
  },[customerCookie])

  return (
    <nav className={`content navbar w-full ${showTopNav ? 'bg-white border-b-4 border-gray-200' : 'bg-white bg-opacity-50 fixed z-50 border-b-4 text-black font-semibold border-gray-200'}`}>
      <div className="max-content flex justify-between items-center">
          <div className="flex h-20 items-center gap-16">
            <Link to='/'><img className="w-32 h-32 object-cover" src="/image/tulin.png" alt="logo" /></Link>
            <ul className="flex gap-9 list-none">
              <li className="cursor-pointer"><Link to="/">Home</Link></li>
              <li className="cursor-pointer"><Link to="/about">About</Link></li>
              <li className="cursor-pointer"><Link to="/contact">Contact</Link></li>
              <li className="cursor-pointer">Services</li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            { customer !== null && customerCookie ? 
              <Link className="flex items-center gap-2" to={`/profile/${Cookies.get('customerId')}`}>
                  <img className="w-7 object-cover h-7 rounded-full" src={`${imgProfileLocation}${userImg}`} alt={customer}/>Hi {customer}!
              </Link> : 
              <Link to='/login' className="p-2 rounded bg-gray-900 text-gray-200 w-28 text-center">
                Log in
              </Link> }
            <img className="w-7 h-6 object-cover cursor-pointer" src="/image/icons/Search.png" alt="search" />
            <Link to={`/cart/${Cookies.get('customerId')}`}>
              <img className="w-7 h-8 object-cover cursor-pointer" src="/image/icons/Shopping-Cart.png" alt="shopping cart" />
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
