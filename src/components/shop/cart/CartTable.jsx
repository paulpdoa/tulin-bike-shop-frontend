import { useState } from 'react';

const CartTable = () => {

    const [quantity,setQuantity] = useState(0);

  return (
      <div className="content">
        <table className="max-content w-full">
            <tbody className="h-screen">
                <tr className="bg-gray-200 h-10">
                    <th colSpan={2}>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
                <tr className="text-center">
                    <td>
                        <img className="w-52 h-32 object-cover rounded" src="/image/cycle.jpg" alt="cycle" />
                    </td>
                    <td>
                        <h2 className="font-semibold texr-gray-700 text-lg">Zipp 11-Speed Freehub Kit for 2013 - Current 188 Hub</h2>
                        <span>Blue, Campagnolo</span>
                    </td>
                    <td>Php. 2100.00</td>
                    <td>
                        <button onClick={() => quantity > 0 &&  setQuantity(quantity-1)} className="p-2 font-bold bg-gray-800 text-gray-100 rounded-md">-</button>
                        <span className="font-bold text-xl p-2">{ quantity }</span>
                        <button onClick={() => setQuantity(quantity+1)} className="p-2 font-bold  bg-gray-800 text-gray-100 rounded-md">+</button>
                    </td>
                    <td>Php. 2100.00</td>
                </tr>
            </tbody>
        </table>
      </div>
  );
};

export default CartTable;
