import { motion } from 'framer-motion';
import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const ChoiceCard = ({ image,name,price,size }) => {

  const { numberFormat } = useContext(GlobalContext); 

  return (
    <>
    <motion.div className="w-44 overflow-hidden h-auto border border-gray-300 shadow-2xl rounded bg-gray-100 p-5 group">
        <div className="overflow-hidden w-full flex justify-center">
          <img className="group-hover:scale-150 transition duration-300 w-full h-32 object-cover" src={image} alt={name} />
        </div>
        <div className="flex items-center flex-col text-center">
            <label className="font-semibold text-gray-800 text-base">{name}</label>
            <label className="font-semibold text-gray-800 text-sm" htmlFor="size">{size}</label>
            <label className="text-sm text-gray-800">₱{numberFormat.format(price)}</label>
        </div>
    </motion.div>
    </>
  )
}

export default ChoiceCard;