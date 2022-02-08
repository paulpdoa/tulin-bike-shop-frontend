import { MdKeyboardArrowDown } from 'react-icons/md';

const ProductSidebar = () => {
  return (
    <nav className="col-span-1 h-full border-r-2 p-20 border-gray-600 overflow-auto">
        <h1 className="font-semibold text-5xl text-gray-800">Filter By:</h1>
        <section className="mt-5">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-400 uppercase">Availability</h2>
                <MdKeyboardArrowDown className="text-2xl cursor-pointer" />
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-green-700">In Stock</span>
            </div>
        </section>
        <section className="mt-5">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-400 uppercase">Categories</h2>
                <MdKeyboardArrowDown className="text-2xl cursor-pointer" />
            </div>
            <div className="text-gray-800 text-sm">
                <div className="flex items-center justify-between">
                    <span>Front</span>
                    <span>(72)</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Rear</span>
                    <span>(72)</span>
                </div>
            </div>
        </section>
        <section className="mt-5">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-400 uppercase">Brands</h2>
                <MdKeyboardArrowDown className="text-2xl cursor-pointer" />
            </div>
            <div className="text-gray-800 text-sm">
                <div className="flex items-center justify-between">
                    <span>Trinx</span>
                    <span>(72)</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Shimano</span>
                    <span>(72)</span>
                </div>
            </div>
        </section>
    </nav>
  );
};

export default ProductSidebar;
