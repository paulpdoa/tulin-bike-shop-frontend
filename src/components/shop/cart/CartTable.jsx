import { useState } from 'react';
import axios from 'axios';

const CartTable = ({ cartContents,setCartContents }) => {

  const [quantity,setQuantity] = useState(0);
  const imgLocation = "http://localhost:8000/uploads/products/"

  const removeItem = (id) => {
    const deletedItem = cartContents.filter(cartContent => cartContent._id !== id);
    setCartContents(deletedItem);
    
    axios.delete(`/cart/${id}`,id).then((data) => {
        alert(data.data.mssg);
    }).catch(err => console.log(err))
  }
    
  return (
      <div className="content">
        <table className="max-content w-full">
            <tbody>
                <tr className="bg-gray-200 h-10">
                    <th colSpan={2}>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
                { cartContents && cartContents.map((cartContent) => (
                    <tr className="text-center border-b border-gray-900 h-20" key={cartContent._id}>
                        <td>
                            <img className="w-52 h-32 object-cover rounded" src={`${imgLocation}${cartContent.inventory_id[0].product_image}`} alt="cycle" />
                        </td>
                        <td>
                            <h2 className="font-semibold texr-gray-700 text-lg">{cartContent.inventory_id[0].brand_name} - {cartContent.inventory_id[0].product_name}</h2>
                            <span>{ cartContent.inventory_id[0].product_color }</span>
                        </td>
                        <td>₱{ cartContent.inventory_id[0].product_price.toLocaleString() }</td>
                        <td>
                            <div>
                                <button onClick={() => quantity > 0 &&  setQuantity(quantity-1)} className="p-2 font-bold bg-gray-800 text-gray-100 rounded-md">-</button>
                                <span className="font-bold text-xl p-2">{ cartContent.order_quantity }</span>
                                <button onClick={() => setQuantity(quantity+1)} className="p-2 font-bold  bg-gray-800 text-gray-100 rounded-md">+</button>
                            </div>
                            <button className="text-sm text-red-500" onClick={() => removeItem(cartContent._id)}>Delete Item</button>
                        </td>
                        <td>₱{ (cartContent.inventory_id[0].product_price * cartContent.order_quantity).toLocaleString() }</td>
                    </tr>
                )) }
            </tbody>
        </table>
      </div>
  );
};

export default CartTable;
