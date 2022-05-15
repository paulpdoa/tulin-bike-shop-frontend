import { GlobalContext } from "../../../helper/Context";
import { useContext } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../helper/baseUrl';
import Cookies from 'js-cookie';

const SendBuiltBike = () => {

  const { numberFormat,setActive,bikeDisplay,build: builds,setBuild } = useContext(GlobalContext);
  const totalPrice = builds.reduce((total,build) => total + build.price ,0);

  const resetBuilds = () => {
    setBuild([]);
    setActive('frame')
  }

  const deletePart = (id) => setBuild(builds.filter(build => build.id !== id));
  
  const sendBikeToAdmin = async () => {
    const customer_id = Cookies.get('customerId'); 
      try {
        const data = await axios.post(`${baseUrl()}/customize`,{ customized_bikeImg: bikeDisplay,customer_id, amount_paid: totalPrice / 2 });
        console.log(data);
      }
      catch(err) {
        console.log(err);
      }
  }  

  return (
    <div className="p-10 relative">
        <button onClick={resetBuilds} className="bg-red-500 text-gray-100 p-2 rounded">Reset</button> 
        <span onClick={sendBikeToAdmin} className="bg-orange-500 p-2 text-gray-800 rounded select-none cursor-pointer absolute right-10">Send Us Your Build</span>
        <div className="bg-gray-900 h-52 text-gray-100 p-10 w-full overflow-y-scroll mt-5 rounded">
            { builds && builds.map((product,key) => (
                <div key={key} className="flex gap-2 mt-3 bg-gray-100 p-2 rounded text-gray-800 relative">
                    <img className="object-cover w-20 h-20" src={product.cardDisplay} alt={product.name} />
                    <div className="flex flex-col">
                        <h2>{ product.name }</h2>
                        <span className="text-xs">{ product.type }</span>
                        <span className="text-xs">₱{ numberFormat.format(product.price) }</span>
                    </div>
                    <button onClick={() => deletePart(product.id)} className="text-gray-800 font-bold absolute right-1 top-0">X</button>
                </div>
            )) }
            
        </div>
        <h3 className="text-gray-100">Total: ₱{ numberFormat.format(totalPrice) }</h3>
    </div>
  )
}

export default SendBuiltBike