import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import { baseUrl } from '../../../helper/baseUrl';

const CustomOrders = () => {

  const [bikes,setBikes] = useState([]);
  const { numberFormat,setShowCustomDetail,setCustomId } = useContext(GlobalContext);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchCustomizedBikes = async () => {
      try {
        const data = await axios.get(`${baseUrl()}/customize`,{ signal: abortCont.signal });
        setBikes(data.data);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchCustomizedBikes();

    return () => abortCont.abort();
  },[bikes]);

  const viewCustomizedDetail = (id) => {
    setShowCustomDetail(true);
    setCustomId(id);
  }

  return (
    <div className="p-10 rounded bg-gray-100 col-span-2 text-gray-800 shadow-lg overflow-y-scroll">
        <h1 className="text-2xl uppercase font-semibold">Customized Orders</h1>
        { bikes.length < 1 ? <h2 className="animate-pulse">No orders yet...</h2> : bikes.map(bike => (
          <div className="flex justify-between" key={bike._id}>
            <div className="flex gap-2 items-center mt-4">
                <img className="object-cover w-full h-20" src={bike.customized_bikeImg} alt="bike" />
                <div className="flex flex-col text-gray-800">
                    <p className="text-sm">Unique ID: {bike.uniqueOrder_id}</p>
                    <h2 className="font-semibold text-lg">₱{ numberFormat.format(bike.amount_paid) }</h2>
                </div>
            </div>
            <button onClick={() => viewCustomizedDetail(bike._id)} className="p-2 rounded text-gray-100 bg-gray-900 h-1/2 self-end hover:bg-transparent hover:border hover:border-gray-800 hover:text-gray-800 transition duration-300">Details</button>
        </div>
        )) }
    </div>
  )
}

export default CustomOrders