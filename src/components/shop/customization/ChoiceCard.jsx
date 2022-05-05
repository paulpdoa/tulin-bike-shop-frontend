import { motion } from 'framer-motion';
import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const ChoiceCard = ({ image,name,price }) => {

  const { numberFormat } = useContext(GlobalContext); 

  return (
    <>
    <motion.div className="w-64 h-auto border border-gray-300 shadow-2xl rounded bg-gray-100 p-5 group">
        <img className="w-full h-full group-hover:scale-150 transition duration-300" src={image} alt={name} />
        <div className="flex items-center flex-col">
            <label className="font-semibold text-gray-800 text-base">{name}</label>
            <label className="text-sm text-gray-800">₱{numberFormat.format(price)}</label>
        </div>
    </motion.div>
    </>
  )
}

export default ChoiceCard;