import { Helmet } from 'react-helmet';
import { fetchData } from '../../../helper/fetching';
import { useState,useEffect,useContext } from 'react';
import ProductCard from './ProductCard';
import ProductHeader from './ProductHeader';
import { GlobalContext } from '../../../helper/Context';
import { baseUrl } from '../../../helper/baseUrl';
const ShopBike = () => {

  const { startIndex,lastIndex,productPerPage,brandChosen } = useContext(GlobalContext);
  const [bikes,setBikes] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    fetchData({signal:abortCont.signal},`${baseUrl()}/inventory/bike`,setBikes,setIsLoading);
    return () => abortCont.abort()
  },[bikes]);

  const bikeLists = bikes.slice(startIndex,lastIndex);
  const pageLength = Math.ceil(bikes.length / productPerPage);
  const pageNumbers = [];

  for(let i = 1; i <= pageLength; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="col-span-2 p-20 h-auto">
      <Helmet><title>Tulin Bicycle Shop | Bicycles</title></Helmet>
      <h1 className="text-4xl text-gray-800 font-semibold uppercase">Bicycles</h1>
      <ProductHeader pageNumbers={ pageNumbers }/>
      <div className="grid md:grid-cols-3 grid-cols-1 justify-items-center md:justify-items-start gap-5 mt-5">
          { isLoading && <h2>Please wait...</h2> }
          { bikes.length < 1 ? <h1 className="font-bold text-5xl text-gray-700 animate-pulse">There are no items yet</h1> : 
            bikeLists && bikeLists.filter(brand => {
              if(brandChosen === '') {
                return brand
              } else {
                return brand.brand_name === brandChosen
              }
            }).map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div> 
            )) 
          }
      </div>
    </div>
      
  );
};

export default ShopBike;
