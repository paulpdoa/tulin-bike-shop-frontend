import { Helmet } from 'react-helmet';
import { useState,useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductHeader from './ProductHeader';

const ShopPart = () => {
  const [parts,setParts] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async() => {
      const data = await axios.get('/inventory/part',{ signal:abortCont.signal });
      setParts(data.data);
    }
    fetchData();
    return () => abortCont.abort();
  },[parts])

  return (
    <div className="col-span-2 p-20 h-screen">
      <Helmet><title>Tulin Bicycle Shop | Parts</title></Helmet>
      <h1 className="text-4xl text-gray-800 font-semibold uppercase">Parts</h1>
      <ProductHeader />
      <div className="grid grid-cols-3 gap-5 mt-5">
          { parts.length < 1 ? <h1 className="font-bold text-5xl text-gray-700 animate-pulse">There is no items yet</h1> : 
            parts && parts.map((product) => (
              <ProductCard product={product} />
            )) 
          }
      </div>
    </div>
      
  );
};

export default ShopPart;
