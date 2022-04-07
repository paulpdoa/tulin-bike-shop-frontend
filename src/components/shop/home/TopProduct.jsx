import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../../helper/Context';
import { Link } from 'react-router-dom';

const TopProduct = () => {

  const [topProducts,setTopProducts] = useState([]);
  const { imgLocation } = useContext(GlobalContext);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchTopProds = async() => {
      try {
        const data = await axios.get('/inventory',{ signal:abortCont.signal });
        setTopProducts(data.data);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchTopProds();

    return () => abortCont.abort();
  },[])

  return (
    <section className="content py-20 md:py-0">
        <div className="max-content flex flex-col items-center justify-center md:h-screen">
            <div className="flex justify-center">
                <h1 className="text-5xl border-b-8 border-gray-300">Our Latest <span className="font-bold">Products</span></h1>
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-around items-center py-20 md:w-full w-4/5">
              { topProducts.slice(0,4).map((topProduct) => (
                <div className="bg-gray-100 p-2 rounded-md shadow-lg" key={topProduct._id}>
                  <img src={`${imgLocation}${topProduct.product_image}`} alt={topProduct.product_name} />
                  <div className="flex justify-between  items-center border-t-2 border-gray-300 py-5">
                    <h2 className="font-semibold text-xl">{ topProduct.brand_name } - { topProduct.product_name }</h2>
                    <span>₱{ topProduct.product_price.toLocaleString() }</span>
                  </div>
                  <Link className="text-center p-2 bg-gray-800 text-gray-100 m-2 rounded-md hover:bg-transparent hover:text-gray-800 hover:border hover:border-gray-800 transition duration-300" to={`/products/${topProduct._id }`}>View</Link>
                </div>
              )) }
            </div>
        </div>
    </section>
  )
}

export default TopProduct