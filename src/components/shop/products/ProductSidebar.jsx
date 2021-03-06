import { MdKeyboardArrowDown } from 'react-icons/md';
import axios from 'axios';
import { useState,useEffect,useContext } from 'react'; 
import { GlobalContext } from '../../../helper/Context';
import { baseUrl } from '../../../helper/baseUrl';
const ProductSidebar = () => {

  const { setBrandChosen } = useContext(GlobalContext);  

  const [brands,setBrands] = useState([]);
  const [uniqueBrands,setUniqueBrands] = useState([]);
  
  useEffect(() => {
      const abortCont = new AbortController();

      const fetchBrands = async () => {
          try {
            const data = await axios.get(`${baseUrl()}/inventory`,{ signal:abortCont.signal });
            setBrands(data.data);
          }
          catch(err) {
              console.log(err);
          }
      }
      fetchBrands();

      return () => abortCont.abort();
  },[brands]);

  useEffect(() => {
    const abortCont = new AbortController();
        const productBrand = brands.map(brand => brand.brand_name);
        // indexOf returns first occurrence of data, if the indexOf is not equal to the key, it means it is different from the first occurrence
        const uniqueBrands = productBrand.filter((brand,key) => productBrand.indexOf(brand) === key);
        setUniqueBrands(uniqueBrands);
    return () => abortCont.abort();
  },[brands])

  return (
    <nav className="col-span-1 h-full border-r-2 p-20 border-gray-600 overflow-auto hidden md:block">
        <h1 className="font-semibold text-5xl text-gray-800">All Brands</h1>
        <section className="mt-5">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-400 uppercase">Brands</h2>
                <MdKeyboardArrowDown className="text-2xl cursor-pointer" />
            </div>
            <div className="text-gray-800 text-sm flex flex-col gap-3 mt-5">
                { uniqueBrands && uniqueBrands.map((brand) => (
                    <div className="flex items-center justify-between">
                        <span onClick={() => setBrandChosen(brand)} className="font-semibold text-base cursor-pointer">{ brand }</span>
                    </div>
                )) }
                {/* <span onClick={() => setBrandChosen('')}>Clear</span> */}
            </div>
        </section>
    </nav>
  );
};

export default ProductSidebar;
