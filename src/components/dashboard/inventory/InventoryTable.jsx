
const InventoryTable = ({ products }) => {

    const imgLocation = 'http://localhost:8000/uploads/products/'

  return (
    <table className="w-full">
        <tbody>
            <tr className="text-center">
                <th>Product</th>
                <th>Colors</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            { products && products.map((product) => (
            <tr key={product._id}>
                <td className="flex gap-2" colSpan="2">
                    <img className="object-cover w-32 h-32 rounded" src={ `${imgLocation}${product.product_image}` } alt={ product.product_name } />
                    <div className="flex text-gray-800 flex-col">
                        <h2 className="text-xl">{ product.brand_name }</h2>
                        <span className="text-lg">{ product.product_name }</span>
                        <p>{ product.product_description }</p>
                    </div>
                </td>
                <td>
                    <div className={`w-5 h-5 rounded-full bg-${product.product_color}-500`}></div>
                </td>
                <td>{ product.product_size }</td>
                <td>Php. { product.product_price }</td>
                <td colSpan="2">{ product.product_quantity }</td>
                <td><button className="bg-gray-900 text-gray-100 rounded p-2">View Details</button></td>
            </tr>
            )) }
            
        </tbody>
    </table>
  )
}

export default InventoryTable