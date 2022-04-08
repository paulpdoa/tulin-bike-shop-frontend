import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GlobalContext } from '../../../helper/Context';
import { useContext } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const MobileNav = () => {

  const { setShowSideNav,showSideNav } = useContext(GlobalContext);  

  return (
    <nav className="w-full shadow-2xl h-20 flex justify-between items-center md:hidden">
        <Link to='/'><img className="w-20 h-20 object-cover" src="/image/tulin.png" alt="tulin logo" /></Link>
        <div className="flex items-center gap-2 text-2xl p-2">
            <BiSearchAlt />
            <Link to={`/cart/${Cookies.get('customerId')}`}><AiOutlineShoppingCart/></Link>
            { showSideNav ? <GrClose onClick={() => setShowSideNav(!showSideNav)} /> : <GiHamburgerMenu onClick={() => setShowSideNav(!showSideNav)}/> }
        </div>
    </nav>
  )
}

export default MobileNav