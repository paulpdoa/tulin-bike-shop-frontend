import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import { BsCheckAll } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const popModalVar = {
  hidden: {
    opacity:0,
    scale:0,
    transition: {
      type:'spring',
      duration:0.9
    }
  },
  visible: {
    opacity:1,
    scale:1,
    transition: {
      type:'spring',
      duration:0.9
    }
  }
}

const Alert = () => {

  const { alertMssg,setShowAlert } = useContext(GlobalContext);
  const navigate = useNavigate();
  const goHome = () => {
    setShowAlert(false);
    navigate('/dashboard');
  }

  return (
    <div className="fixed top-0 w-full h-screen flex justify-center items-center" style={{ zIndex:"200" }}>
        <motion.div className="bg-gray-100 shadow-2xl rounded p-3 flex flex-col items-center justify-center w-1/3 text-gray-800 border border-gray-800" style={{ zIndex:"105" }}
          variants={popModalVar}
          initial="hidden"
          animate="visible"
        >
            <span className="text-4xl text-green-500 font-bold"><BsCheckAll /></span>
            <h1 className="text-green-500 font-bold text-3xl text-center p-2">GREAT!</h1>
            <h1 className="font-semibold text-xl text-center p-2">{ alertMssg }</h1>
            <button className="p-2 rounded bg-green-500 text-gray-100" onClick={goHome}>Okay :)</button>
        </motion.div>
    </div>
  )
}

export default Alert