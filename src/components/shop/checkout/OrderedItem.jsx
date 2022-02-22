
const OrderedItem = () => {
  return (
    <div className="flex gap-5 w-full mt-5">
        <img className="w-32 h-32 object-cover rounded" src="/image/cycle.jpg" alt="cycle" />
        <div className="flex flex-col w-full text-gray-800">
            <h2 className="text-xl">Brand Name</h2>
            <span className="text-lg">Item Name</span>
            <p className="text-sm">Item description</p>
            <div className="flex w-full items-center justify-between mt-5">
            <span>Qty. 2</span>
            <span className="font-semibold text-orange-500">₱1000</span>
            </div>
        </div>
    </div>
  )
}

export default OrderedItem