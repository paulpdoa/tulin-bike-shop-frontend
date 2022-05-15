import { useContext } from "react"
import { GlobalContext } from "../../helper/Context"
import { HiOutlineClipboardList } from 'react-icons/hi';

const OpenCustomBuilds = () => {

    const { setShowSelectedParts } = useContext(GlobalContext);

  return (
    <div onClick={() => setShowSelectedParts(true)} className="absolute animate-bounce right-3 top-32 rounded-full cursor-pointer hover:scale-150 transition duration-100 bg-gray-100 group flex justify-center items-center">
        <HiOutlineClipboardList className="text-5xl" />
        <div className="group-hover:block bg-gray-100 hidden absolute w-32 right-14 top-2 p-2 transition duration-300 text-center rounded bg-opacity-50">
            <h1>View your builds</h1>
        </div>
    </div>
  )
}

export default OpenCustomBuilds;