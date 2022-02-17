import Datetime from "../partials/Datetime";
import InventoryTable from "./InventoryTable";
const Accessories = () => {
  return (
    <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Accessories</h1>
          <Datetime />
        </div>
        <div className="bg-white p-2 w-full shadow-lg rounded-md h-96 mt-10 overflow-y-scroll">
          <InventoryTable />
        </div>
    </div>
  );
};

export default Accessories;
