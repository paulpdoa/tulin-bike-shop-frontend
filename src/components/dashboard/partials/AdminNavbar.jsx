import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegPlusSquare } from 'react-icons/fa';
import { IoIosArrowDown,IoIosArrowUp } from 'react-icons/io';
import { ImExit } from 'react-icons/im';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';

const AdminNavbar = ({ setShowSidebar,showSidebar }) => {

    const [showLogout,setShowLogout] = useState(false);

    const [products,setProducts] = useState([]);
    const [searchedItems,setSearchedItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const abortCont = new AbortController();
        
        const getInventoryItems = async() => {
            try {
                const data = await axios.get('/inventory',{ signal: abortCont.signal });
                setProducts(data.data);
            }
            catch(err) {
                console.log(err);
            }
    }
    getInventoryItems();

    return () => abortCont.abort();
    },[]);

    const onLogout = () => {
        axios.get('/adminlogout')
        .then((data) => {
            navigate(data.data.redirect);
            localStorage.removeItem('adminName');
        }).catch(err => console.log(err))
    }

    const handleSearch = (e) => {
        const searched = e.target.value;
        const foundItem = products.filter(product => product.product_name.toLowerCase().includes(searched.toLowerCase()));
        searched === '' ? setSearchedItems([]) : setSearchedItems(foundItem); 
    }

    return (
    <nav className="bg-gray-100 p-3 flex justify-between shadow-md">
        <div className="flex items-center gap-10">
            <span onClick={() => setShowSidebar(!showSidebar)} className="text-2xl font-bold cursor-pointer"><GiHamburgerMenu /></span>
            <Link to='/dashboard/addproduct' className="flex gap-2 items-center p-2 border-2 rounded border-gray-900">
                <span><FaRegPlusSquare className="text-gray-900 text-2xl" /></span>
                <span>Add Product</span>
            </Link>
        </div>
        <div className="flex items-center gap-2 w-1/2 relative">
            <input onChange={handleSearch} className="p-2 outline-none rounded w-full" type="search" placeholder="Search parts/items" />
            <button className="bg-gray-800 p-2 rounded hover:bg-transparent hover:border hover:border-gray-900 hover:text-gray-900 transition duration-300 text-gray-100">Search</button>
            <div className="absolute top-10 overflow-hidden bg-red-200 rounded-b-md w-[87.5%] shadow-2xl flex flex-col z-[100]">
                { searchedItems && searchedItems.slice(0,5).map((product) => (
                    <Link onClick={() => console.log(product._id)} className="bg-white w-full hover:bg-gray-300 p-2 transition duration-300" to={`/dashboard/inventory/${product._id}`} htmlFor="item">{ product.product_name }</Link>
                )) }
            </div>
        </div>
        <div className="flex items-center gap-2 relative">
            <h2 className="font-semibold text-xl select-none">{ localStorage.getItem('adminName') }</h2>
            <button onClick={() => setShowLogout(!showLogout)} className="p-1 border border-gray-800 rounded"><IoIosArrowDown /></button>
            { showLogout && 
            <div className="absolute bg-white text-gray-800 w-36 top-10 -left-10 p-2 border border-gray-800 rounded">
                <button onClick={onLogout} className="flex items-center w-full p-2 gap-2 hover:bg-gray-100 transition duration-300 rounded"><ImExit /> Logout</button>
            </div> }
        </div>
    </nav>
  );
};

export default AdminNavbar;
