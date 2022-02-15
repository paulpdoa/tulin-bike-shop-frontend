import { motion } from 'framer-motion';

const ChoiceCard = ({ image,name,price }) => {
  return (
    <>
    <motion.div className="w-64 h-auto"
    drag="x"
    dragConstraints={{ left:0,right:0 }}
    >
        <img className="w-full h-full" src={image} alt="Wheel" />
        <div className="flex items-center flex-col">
            <label className="font-semibold text-gray-800 text-lg">{name}</label>
            <label className="text-sm text-gray-800">{price}</label>
        </div>
    </motion.div>
    </>
  )
}

export default ChoiceCard