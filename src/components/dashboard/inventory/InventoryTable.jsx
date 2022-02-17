
const InventoryTable = () => {
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
            <tr>
                <td className="flex gap-2" colSpan="2">
                    <img className="object-cover w-32 h-32 rounded" src="/image/cycle.jpg" alt="temporary" />
                    <div className="flex text-gray-800 flex-col">
                        <h2 className="text-xl">Brand Name</h2>
                        <span className="text-lg">Item Name</span>
                        <p>Description of the bike will be here</p>
                    </div>
                </td>
                <td>
                    <div className={`w-5 h-5 rounded-full bg-red-500`}></div>
                </td>
                <td>XL</td>
                <td>Php. 1000.00</td>
                <td colSpan="2">1</td>
                <td><button className="bg-gray-900 text-gray-100 rounded p-2">View Details</button></td>
            </tr>
            
        </tbody>
    </table>
  )
}

export default InventoryTable