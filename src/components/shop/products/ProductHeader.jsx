import { GlobalContext } from "../../../helper/Context";
import { useContext } from 'react';

const ProductHeader = ({ pageNumbers }) => {

  const { paginate } = useContext(GlobalContext);

  return (
    <header className="flex justify-between items-center">
        <div className="flex gap-2 items-center mt-2">
            <span>Sort by:</span>
            <select className="outline-none w-52 p-2 rounded-md">
                <option value="Latest">Latest</option>
            </select>
        </div>
        <div className="flex gap-3 items-center">
            { pageNumbers && pageNumbers.map((page,key) => (
              <button onClick={() => paginate(page)} key={key} className="cursor-pointer p-2 border-gray-800 border rounded">{ page }</button>
            )) }
        </div>
    </header>
  );
};

export default ProductHeader;
