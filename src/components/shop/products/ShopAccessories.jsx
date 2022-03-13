import { Helmet } from 'react-helmet';
import { useState,useEffect,useContext } from 'react';
import { fetchData } from '../../../helper/fetching';
import ProductCard from './ProductCard';
import ProductHeader from './ProductHeader';
import { GlobalContext } from '../../../helper/Context';

const ShopAccessories = () => {

  const { startIndex,lastIndex,productPerPage } = useContext(GlobalContext);
  const [accessories,setAccessories] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    fetchData({signal:abortCont.signal},'/inventory/accessory',setAccessories,setIsLoading);
    return () => abortCont.abort();
  },[accessories]);

  const accessoryLists = accessories.slice(startIndex,lastIndex);
  const pageLength = Math.ceil(accessories.length / productPerPage);
  const pageNumbers = [];

  for(let i = 1; i <= pageLength; i++) {
    pageNumbers.push(i);
  }


  return ( 
    <div className="col-span-2 p-20 h-screen">
        <Helmet><title>Tulin Bicycle Shop | Accessories</title></Helmet>
        <h1 className="text-4xl text-gray-800 font-semibold uppercase">Accessories</h1>
        <ProductHeader pageNumbers={pageNumbers} />
        <div className="grid grid-cols-3 gap-5 mt-5">
            { isLoading && <h2>Please wait...</h2> }
            { accessories.length < 1 ? <h1 className="font-bold text-5xl text-gray-700 animate-pulse">There are no items yet</h1> : 
              accessoryLists && accessoryLists.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>  
              )) 
            }
        </div>
    </div>
  );
};

export default ShopAccessories;
