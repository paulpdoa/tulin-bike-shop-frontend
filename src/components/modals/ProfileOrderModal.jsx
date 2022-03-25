import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useEffect,useState } from 'react';

const ProfileOrderModal = ({ close,detailId }) => {
  
  const [isLoading,setIsLoading] = useState(true);
  const [item,setItem] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    axios.get(`/neworders/${detailId}`,{ signal:abortCont.signal })
    .then((data) => {
     setItem(data.data);
     setIsLoading(false);
    })

    return () => abortCont.abort();
  },[detailId])
  
  return (
    <div className="absolute flex items-center justify-center top-0 h-screen w-full">
        <div className="text-gray-200 w-4/5 shadow-xl bg-gray-800 rounded-md p-5 z-50">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl">Order Detail</h1>
              <AiOutlineClose className="cursor-pointer transition transform hover:scale-150" onClick={() => close(false)} />
            </div>
            <div className="flex gap-2 mt-5">
              <img className="object-cover w-32 h-32 rounded" src="/image/cycle.jpg" alt="cycle" />
              <div className="flex flex-col">
                <h2>Brand Name</h2>
                <p>Item Name</p>
                <p>Description,...</p>
                <span>Qty. 1</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileOrderModal