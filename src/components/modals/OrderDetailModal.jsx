import { AiOutlineClose } from 'react-icons/ai';
import { useContext} from 'react';
import { GlobalContext } from '../../helper/Context';

const OrderDetailModal = () => {

  const { setShowModal } = useContext(GlobalContext);
  
  return (
    <div className="absolute bg-gray-900 bg-opacity-50 top-0 w-full left-0 h-screen flex justify-center items-center">
        <div className="bg-gray-900 text-gray-100 w-1/2 p-4 h-1/2 rounded-md">
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Order Details</h1>
            <AiOutlineClose onClick={() => setShowModal(false)} className="font-semibold text-xl cursor-pointer" />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <img className="w-32 rounded" src="/image/cycle.jpg" alt="temp" />
              <div className="flex flex-col">
                <h3 className="text-lg">Brand Name</h3>
                <h4 className="text-sm">Item name</h4>
                <p className="text-xs">Description</p>
                <span className="text-xs">Qty. 1</span>
              </div>
            </div>
            <h2>Ordered Date: March 19, 2022</h2>
          </div>
          <div className="mt-10">
           <h3 className="text-xl">Ordered By: Paul Andres</h3>
           <h3 className="text-sm">polopdoandres@gmail.com</h3>
          </div>
          <div className="flex items-center justify-end gap-2 py-14">
            <button className="bg-green-500 p-2 rounded">Mark as claimed/delivered</button>
            <button>Delete</button>
          </div>
        </div>
    </div>
  )
}

export default OrderDetailModal