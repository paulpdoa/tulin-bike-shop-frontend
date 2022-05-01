import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const OrderedItem = ({ image,brand,item,description,quantity,price }) => {
 
  const { imgLocation,numberFormat } = useContext(GlobalContext);

  return (
    <div className="flex gap-5 w-full mt-5">
        <img className="w-32 h-32 object-cover rounded" src={`${imgLocation}${image}`} alt="cycle" />
        <div className="flex flex-col w-full text-gray-800">
            <h2 className="text-xl">{brand}</h2>
            <span className="text-lg">{item}</span>
            <p className="text-sm">{description}</p>
            <div className="flex w-full items-center justify-between mt-5">
            <span>Qty. {quantity}</span>
            <span className="font-semibold text-orange-500">₱{numberFormat.format(price * quantity)}</span>
            </div>
        </div>
    </div>
  )
}

export default OrderedItem