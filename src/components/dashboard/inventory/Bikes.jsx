import Datetime from "../partials/Datetime";
import InventoryTable from "./InventoryTable";
import axios from 'axios';
import { useEffect,useState } from 'react';

const Bikes = () => {
  
  const [bikes,setBikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const data = await axios.get('/inventory/bike');
      setBikes(data.data);
      }
      catch(err) {
        console.log(err)
      }
    }
   fetchData();
  },[])


  return (
    <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Bicycles</h1>
          <Datetime />
        </div>

        <div className="bg-white p-2 w-full shadow-lg rounded-md h-96 mt-10 overflow-y-scroll">
          <InventoryTable products={bikes}/>
        </div>
    </div>
  );
};

export default Bikes;
