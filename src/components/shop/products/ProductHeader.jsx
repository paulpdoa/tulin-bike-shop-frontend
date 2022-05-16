import { GlobalContext } from "../../../helper/Context";
import { useContext } from 'react';

const ProductHeader = ({ pageNumbers }) => {

  const { paginate } = useContext(GlobalContext);

  return (
    <header className="flex justify-end items-center">
        <div className="flex gap-3 items-center">
            { pageNumbers && pageNumbers.map((page,key) => (
              <button onClick={() => paginate(page)} key={key} className="cursor-pointer p-2 border-gray-800 border rounded">{ page }</button>
            )) }
        </div>
    </header>
  );
};

export default ProductHeader;
