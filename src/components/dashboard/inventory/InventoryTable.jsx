
import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const InventoryTable = ({ products }) => {

  const { imgLocation,setShowInventoryDetail,setInventoryId,numberFormat } = useContext(GlobalContext);

  const showDetail = (id) => {
    setShowInventoryDetail(true)
    setInventoryId(id);
  }

  return (
    <table className="w-full">
        <tbody>
            <tr className="text-left">
                <th>Product</th>
                <th>Colors</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
            </tr>
            { products && products.map((product,key) => (
            <tr key={key}>
                <td className="flex gap-2 max-w-max">
                    <img className="object-cover w-32 h-32 rounded" src={ `${imgLocation}${product.product_image}` } alt={ product.product_name } />
                    <div className="flex text-gray-800 max-w-sm flex-col">
                        <h2 className="text-xl">{ product.brand_name }</h2>
                        <span className="text-lg">{ product.product_name }</span>
                        <p>{ product.product_description }</p>
                    </div>
                </td>
                <td>
                    { product.product_color[0].split(",").map(col => (
                        <div className={`w-5 h-5 rounded-full bg-${col}-500 inline-block ml-2`}></div>
                    )) }
                </td>
                <td>{ product.product_size }</td>
                <td>₱{ numberFormat.format(product.product_price) }</td>
                <td>{ product.product_quantity }</td>
                <td><button onClick={() => showDetail(product._id)} className="bg-gray-900 text-gray-100 rounded p-2 hover:bg-transparent hover:border-[0.5px] hover:border-gray-800 hover:text-gray-800 transition duration-300">View Details</button></td>
            </tr>
            )) }
        </tbody>
    </table>
  )
}

export default InventoryTable