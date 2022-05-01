import { Helmet } from 'react-helmet';
import { useState,useEffect,useContext } from 'react';
import { fetchData } from '../../../helper/fetching';
import ProductCard from './ProductCard';
import ProductHeader from './ProductHeader';
import { GlobalContext } from '../../../helper/Context';
import { baseUrl } from '../../../helper/baseUrl';
const ShopPart = () => {

  const { startIndex,lastIndex,productPerPage } = useContext(GlobalContext);
  const [parts,setParts] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    fetchData({signal:abortCont.signal},`${baseUrl()}/inventory/part`,setParts,setIsLoading);
    return () => abortCont.abort();
  },[parts])

  const partLists = parts.slice(startIndex,lastIndex);
  const pageLength = Math.ceil(parts.length / productPerPage);
  const pageNumbers = [];

  for(let i = 1; i <= pageLength; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="col-span-2 p-20 h-screen">
      <Helmet><title>Tulin Bicycle Shop | Parts</title></Helmet>
      <h1 className="text-4xl text-gray-800 font-semibold uppercase">Parts</h1>
      <ProductHeader pageNumbers={pageNumbers} />
      <div className="grid md:grid-cols-3 grid-cols-1 justify-items-center md:justify-items-start gap-5 mt-5">
          { isLoading && <h2>Please wait...</h2> }
          { parts.length < 1 ? <h1 className="font-bold text-5xl text-gray-700 animate-pulse">There are no items yet</h1> : 
            partLists && partLists.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div> 
            ))}
      </div>
    </div>
      
  );
};

export default ShopPart;
