import { useContext,useState } from 'react';
import { GlobalContext } from '../../../helper/Context';
import axios from 'axios';

const CartCard = ({ cartContents,setCartContents }) => {
  
    const [quantity,setQuantity] = useState(0);
    const { imgLocation,numberFormat,setAlertMssg,setShowAlert } = useContext(GlobalContext);

    const removeItem = (id) => {
        const deletedItem = cartContents.filter(cartContent => cartContent._id !== id);
        setCartContents(deletedItem);
        
        axios.delete(`/cart/${id}`,id).then((data) => {
            setAlertMssg(data.data.mssg);
            setShowAlert(true);
        }).catch(err => console.log(err))
      }
    return (
    <div className="flex flex-col items-center gap-3 md:!hidden mb-5 h-screen">
        { cartContents && cartContents.map(cartContent => (
            <div className="bg-gray-100 rounded-md shadow-xl w-[90%] p-2 flex gap-2 relative">
                <img className="w-40 h-32 rounded object-contain" src={`${imgLocation}${cartContent.inventory_id.product_image}`} alt={ cartContent.inventory_id.product_name } />
                <div className="flex flex-col mt-2">
                    <h1>{ cartContent.inventory_id.brand_name }-<span className="font-semibold">{ cartContent.inventory_id.product_name }</span></h1>
                    <p className="text-xs">{ cartContent.inventory_id.product_description }</p>
                    <span className="text-lg font-bold">₱{ numberFormat.format(cartContent.inventory_id.product_price) }</span>
                    <button onClick={() => removeItem(cartContent._id)} className="text-xs text-red-500 absolute bottom-3">Delete</button>
                </div>
                <div className="flex items-center gap-2 absolute bottom-3 right-3 font-semibold">
                    <button onClick={() => console.log(cartContent.order_quantity - 1)} className="bg-gray-200 h-5 w-5 flex items-center justify-center">-</button>
                    <span className="text-xs">{ cartContent.order_quantity }</span>
                    <button onClick={() => console.log(cartContent.order_quantity + 1)} className="bg-gray-200 h-5 w-5 flex items-center justify-center">+</button>
                </div>
            </div>
        )) }
    </div>
  )
}

export default CartCard