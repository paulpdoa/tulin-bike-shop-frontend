import { useState,useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../../helper/Context';
import { baseUrl } from '../../../helper/baseUrl';
const CartTable = ({ cartContents,setCartContents }) => {

  const [quantity,setQuantity] = useState(0);
  const { imgLocation,setAlertMssg,setShowAlert } = useContext(GlobalContext);

  const removeItem = (id) => {
    const deletedItem = cartContents.filter(cartContent => cartContent._id !== id);
    setCartContents(deletedItem);
    
    axios.delete(`${baseUrl()}/cart/${id}`,id).then((data) => {
        setAlertMssg(data.data.mssg);
        setShowAlert(true);
    }).catch(err => console.log(err))
  }
    
  return (
      <div className="md:flex justify-center hidden">
        <table className="max-content w-full">
            <tbody>
                <tr className="bg-gray-200 h-10">
                    <th colSpan={2}>Product</th>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
                { cartContents.length < 1 ? 
                <tr className="h-24">
                    <td className="text-4xl text-gray-800 animate-pulse font-semibold mt-10">No items were added to cart...</td> 
                </tr> :
                cartContents.map((cartContent) => (
                    <tr className="text-center border-b border-gray-900 h-24" key={cartContent._id}>
                        <td>
                            <img className="w-52 h-32 object-cover rounded" src={`${imgLocation}${cartContent.inventory_id.product_image}`} alt="cycle" />
                        </td>
                        <td>
                            <h2 className="font-semibold texr-gray-700 text-lg">{cartContent.inventory_id.brand_name} - {cartContent.inventory_id.product_name}</h2>
                            <span>{ cartContent.product_color }</span>
                        </td>
                        <td>
                            <div className={`w-5 h-5 rounded-full bg-${cartContent.product_color}-500 inline-block ml-2 cursor-pointer hover:scale-150 transition duration-300`}></div>
                        </td>
                        <td>???{ cartContent.inventory_id.product_price.toLocaleString() }</td>
                        <td>
                            <div>
                                <span className="font-bold text-xl p-2">{ cartContent.order_quantity }</span>
                            </div>
                            <button className="text-sm text-red-500" onClick={() => removeItem(cartContent._id)}>Delete Item</button>
                        </td>
                        <td>???{ (cartContent.inventory_id.product_price * cartContent.order_quantity).toLocaleString() }</td>
                    </tr>
                )) }
            </tbody>
        </table>
      </div>
  );
};

export default CartTable;
