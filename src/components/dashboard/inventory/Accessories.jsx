import Datetime from "../partials/Datetime";
import InventoryTable from "./InventoryTable";
import axios from 'axios';
import { useEffect,useState } from 'react';
import { baseUrl } from "../../../helper/baseUrl";
const Accessories = () => {

  const [accessories,setAccessories] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    
    const fetchData = async () => {
      try {
        const data = await axios.get(`${baseUrl()}/inventory/accessory`,{ signal:abortCont.signal });
        setAccessories(data.data);
      }
      catch(err) {
        console.log(err)
      }
    }
    fetchData();

    return () => abortCont.abort();
  },[accessories])

  return (
    <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Accessories</h1>
          <Datetime />
        </div>
        <div className="bg-white p-2 w-full shadow-lg rounded-md h-96 mt-10 overflow-y-scroll">
          <InventoryTable products={accessories} />
        </div>
    </div>
  );
};

export default Accessories;
