import { useContext } from 'react';
import { GlobalContext } from '../../helper/Context';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DownpaymentModal from './DownpaymentModal';
import Cookies from 'js-cookie';

const popVar = {
    hidden: {
        scale:0,
        opacity:0,
        transition: {
            type:'spring',
            duration:0.3
        }
    },
    visible: {
        scale:1,
        opacity:1,
        transition: {
            type:'spring',
            duration:0.3
        }
    }

}

const CustomBuildsModal = () => {

    const { build:builds,setShowSelectedParts,numberFormat,active,setShowDp,showDp } = useContext(GlobalContext);
    const totalPrice = builds.reduce((total,build) => total + build.price ,0);

    const navigate = useNavigate();

    const sendBuildToAdmin = () => {
        if(Cookies.get('customerJwt') !== undefined) {
            setShowDp(true);
        } else {
            navigate('/login');
        }
    }
 
  return (
    <div className="bg-gray-800 text-gray-100 absolute w-full h-screen flex justify-center items-center bg-opacity-50 left-0">
        { showDp ? <DownpaymentModal /> : 
        <motion.div className="bg-gray-100 h-1/2 overflow-y-scroll rounded-md shadow-xl w-1/2 text-gray-800 p-2"
            initial="hidden"
            animate="visible"
            variants={popVar}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-semibold">Selected Parts</h1>
                    <p className="font-semibold text-xl">₱{numberFormat.format(totalPrice)}</p>
                </div>
                <div className="flex items-center gap-2">
                    { active === "groupset" && <button className="bg-orange-500 text-gray-100 p-2 rounded" onClick={sendBuildToAdmin}>Send your build</button> }
                    <button className="group" onClick={() => setShowSelectedParts(false)}><AiOutlineClose className="group-hover:scale-150 transition duration-300" /></button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                { builds && builds.map((build,key) => (
                    <div key={key} className="flex gap-2">
                        <img className="w-28 object-cover h-28" src={build.cardDisplay} alt={build.name} />
                        <div className="flex flex-col">
                            <label htmlFor="name">{build.name}</label>
                            <label htmlFor="type">{build.type}</label>
                            <label htmlFor="price">₱{ numberFormat.format(build.price) }</label>
                        </div>
                    </div>
                )) }
            </div>
        </motion.div>
        }
    </div>
  )
}

export default CustomBuildsModal