import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GlobalContext } from '../../../helper/Context';
import { useContext,useState,useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const slideVar = {
  hidden: {
    x:'5vw',
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
  },
  exit: {
    x:'5vw',
    opacity:0,
    transition: {
      type:'tween',
      duration:0.2
    }
  }
}

const MobileNav = () => {

  const { setShowSideNav,showSideNav } = useContext(GlobalContext);  
  const [showSearch,setShowSearch] = useState(false);
  const [products,setProducts] = useState([]);

  const [results,setResults] = useState([]); 

  useEffect(() => {
    const abortCont = new AbortController();
    axios.get('/inventory',{ signal: abortCont.signal })
    .then(data => {
      setProducts(data.data);
    })
    .catch(err => {
      const mute = err;
    })
    return () => abortCont.abort();
  },[])


  const handleSearch = (e) => {
    e.preventDefault();
    const searchedProduct = e.target.value;
    const filteredItem = products.filter(product => product.product_name.toLowerCase().includes(searchedProduct.toLowerCase()));
    searchedProduct === '' ? setResults([]) : setResults(filteredItem);
  }

  return (
    <nav className="w-full shadow-2xl h-20 flex justify-between items-center md:hidden">
        <Link to='/'><img className="w-20 h-20 object-cover" src="/image/tulin.png" alt="tulin logo" /></Link>
        <div className="flex items-center gap-2 text-2xl p-2">
           <AnimatePresence>
           { showSearch && 
            <motion.div className="relative"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideVar}
            >
              <input onChange={handleSearch} className="p-2 text-sm border border-gray-200 rounded outline-blue-500" type="search" placeholder="Search here..." />
              { results && results.slice(0,5).map(result => (
                <div className="absolute top-9 rounded p-2 shadow-lg text-sm w-full bg-gray-100">
                  <Link to={`/products/${result._id}`}>{ result.product_name } - { result.product_type }</Link>
                </div>
              )) }
            </motion.div>
            }
           </AnimatePresence>
            <BiSearchAlt onClick={() => setShowSearch(!showSearch)} />
            <Link to={`/cart/${Cookies.get('customerId')}`}><AiOutlineShoppingCart/></Link>
            { showSideNav ? <GrClose onClick={() => setShowSideNav(false)} /> : <GiHamburgerMenu onClick={() => setShowSideNav(true)}/> }
        </div>
    </nav>
  )
}

export default MobileNav