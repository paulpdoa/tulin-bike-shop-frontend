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
    <nav className="content navbar">
      <div className="max-content">
          <div className="flex justify-around border-b-2">
            <div className="flex items-center gap-2 w-1/2">
              <Link to='/'>
                <img className="navbar-logo" src="/image/tulin.png" alt="Tulin logo" />
              </Link>
              <div className="w-full relative">
                <input onChange={handleSearch} className="p-2 w-full rounded outline-none" type="search" placeholder="Search parts/brand" />
                <div className=" bg-white rounded-b-sm rounded-t-none absolute top-10 w-full">
                { searchedItem && searchedItem.slice(0,10).map((item) => (
                  <Link to={`/products/${item._id}`} key={item._id}>
                    <div className="cursor-pointer hover:bg-gray-300 p-2" key={item._id}>
                      <h1>{item.product_name}</h1>
                    </div>
                  </Link>
                  
                )) }
                </div>
              </div>
            </div>
            <ul className="flex items-center justify-center gap-3 text-gray-100">
              <Link to='/'><li>Home</li></Link>
              <Link to='/about'><li>About</li></Link>
              <Link to='/contact'><li>Contact Us</li></Link>
              <Link className="text-2xl relative" to={`/cart/${Cookies.get('customerId')}`}>
                <span className={ cartCount.length > 0 ? "absolute -top-2 -right-1 text-gray-100 bg-red-500 text-xs rounded-full flex items-center justify-center h-4 w-4" : 'hidden' }>{ cartCount.length }</span>
                <AiOutlineShoppingCart />
              </Link>
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
                      { isLogged && customer !== null ? 
                      <>
                        <button onClick={onLogout} className="flex items-center gap-2"><FiLogOut /> Logout</button>
                        <Link to={`/profile/${Cookies.get('customerId')}`} className="flex items-center gap-2">
                            { userImg ? <img className="w-5 h-5 object-cover rounded-full" src={`${imgProfileLocation}${userImg}`} alt={customer} /> : <BsPersonCircle />}
                            {customer}
                        </Link> 
                      </>
                      : 
                        <Link to='/login' className="flex items-center gap-2"><FiLogIn />Login</Link> 
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
