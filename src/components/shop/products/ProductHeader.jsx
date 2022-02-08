
const ProductHeader = () => {
  return (
    <header className="flex justify-between items-center">
        <div className="flex gap-2 items-center mt-2">
            <span>Sort by:</span>
            <select className="outline-none w-52 p-2 rounded-md">
                <option value="Latest">Latest</option>
            </select>
        </div>
        <div className="flex gap-3 items-center">
            <span className="cursor-pointer">Previous</span>
            <span className="cursor-pointer">Next</span>
        </div>
    </header>
  );
};

export default ProductHeader;
