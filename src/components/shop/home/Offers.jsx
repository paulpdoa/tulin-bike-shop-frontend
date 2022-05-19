import { Link } from "react-router-dom";
import axios from 'axios';
import { useContext,useState,useEffect } from 'react';
import { baseUrl } from "../../../helper/baseUrl";
import { GlobalContext } from "../../../helper/Context";

const Offers = () => {

    const { imgLocation } = useContext(GlobalContext);
    const [latest,setLatest] = useState({}); 

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchLatestProduct = async() => {
            try {
                const data = await axios.get(`${baseUrl()}/new-arrival`,{ signal:abortCont.signal });
                setLatest(data.data);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchLatestProduct();

        return () => abortCont.abort();
    },[])

  return (
        <section className="content md:py-20">
            <div className="max-content md:h-screen flex flex-col items-center">
                <h1 className="md:text-5xl text-4xl border-b-8 border-gray-300">Our New <span className="font-bold">Arrivals</span></h1>
                <div className="flex flex-col md:flex-row space-between gap-10 bg-gray-100 rounded-md md:p-10 p-5 w-4/5 md:w-auto mt-10 shadow-xl">
                    <img className="md:w-[25%] w-full object-cover" src={ `${imgLocation}${latest.product_image}` } alt="bike1" />
                    <article className="text-center md:text-left">
                        <h2 className="text-3xl">{latest.brand_name}</h2>
                        <label className="font-bold md:text-4xl text-3xl" htmlFor="bike">{latest.product_name}</label>
                        <p className="text-sm font-normal md:w-4/5 w-full">{latest.product_description}</p>
                        <Link to={`products/${latest._id}`} className="bg-gray-800 text-gray-200 p-2 cursor-pointer w-full md:w-1/3 mt-10 hover:border-2 hover:text-gray-800 transition duration-300 hover:border-gray-800 hover:bg-transparent">Take a look</Link>
                    </article>
                </div>
            </div>
        </section>
  );
};

export default Offers;
