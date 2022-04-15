import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegPlusSquare } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';

const AdminNavbar = ({ setShowSidebar,showSidebar }) => {

    const [products,setProducts] = useState([]);
    const [searchedItems,setSearchedItems] = useState([]);

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
        <div className="flex items-center gap-2">
            <div className="relative">
                <span className="bg-red-500 text-gray-100 absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-semibold">3</span>
                <BsBell className="text-2xl font-bold" />
            </div>
            <h2 className="font-semibold text-xl select-none">{ localStorage.getItem('adminName') }</h2>
        </div>
    </nav>
  );
};

export default AdminNavbar;
