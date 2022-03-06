import { AiOutlineClose } from 'react-icons/ai';

const Cod = ({ setShowCod }) => {
  return (
    <div className="absolute h-screen bg-gray-900 bg-opacity-50 w-full flex items-center justify-center z-50">
        <div className="relative w-1/2 flex items-center justify-center">
            <AiOutlineClose onClick={() => setShowCod(false)} className="absolute font-bold text-3xl cursor-pointer right-44 -top-7 bg-white rounded-full" />
            <div className="w-1/2 bg-white p-5 rounded-md">
                cod
            </div>
        </div>
    </div>
  )
}

export default Cod