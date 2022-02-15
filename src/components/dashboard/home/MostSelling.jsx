
const MostSelling = () => {
  return (
    <div className="col-span-3 bg-gray-100 shadow-lg p-10 h-full overflow-y-scroll">
       <h1 className="text-2xl uppercase font-semibold text-gray-800">Most Selling Items</h1>
       <div className="flex justify-between items-center">
            <div className="flex gap-2 mt-5">
                <img className="w-20 h-20 object-cover" src="/image/cycle.jpg" alt="cycle" />
                <div className="flex flex-col">
                    <h2 className="text-base text-gray-800">Item Name</h2>
                    <span className="text-sm text-gray-800">Item Type</span>
                </div>
            </div>
            <h2 className="font-bold text-gray-800 text-lg">$900</h2>
       </div>
       <div className="flex justify-between items-center">
            <div className="flex gap-2 mt-5">
                <img className="w-20 h-20 object-cover" src="/image/cycle.jpg" alt="cycle" />
                <div className="flex flex-col">
                    <h2 className="text-base text-gray-800">Item Name</h2>
                    <span className="text-sm text-gray-800">Item Type</span>
                </div>
            </div>
            <h2 className="font-bold text-gray-800 text-lg">$900</h2>
       </div>
       <div className="flex justify-between items-center">
            <div className="flex gap-2 mt-5">
                <img className="w-20 h-20 object-cover" src="/image/cycle.jpg" alt="cycle" />
                <div className="flex flex-col">
                    <h2 className="text-base text-gray-800">Item Name</h2>
                    <span className="text-sm text-gray-800">Item Type</span>
                </div>
            </div>
            <h2 className="font-bold text-gray-800 text-lg">$900</h2>
       </div>
       <div className="flex justify-between items-center">
            <div className="flex gap-2 mt-5">
                <img className="w-20 h-20 object-cover" src="/image/cycle.jpg" alt="cycle" />
                <div className="flex flex-col">
                    <h2 className="text-base text-gray-800">Item Name</h2>
                    <span className="text-sm text-gray-800">Item Type</span>
                </div>
            </div>
            <h2 className="font-bold text-gray-800 text-lg">$900</h2>
       </div>
    </div>
  )
}

export default MostSelling