import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const ProductCard = ({ product }) => {
  
  const { imgLocation,numberFormat } = useContext(GlobalContext);

  return (
    <div className="shadow-lg p-3">
        <div className="h-44 overflow-hidden rounded-lg">
          <Link to={`/products/${product._id}`}>
            <img className="object-cover cursor-pointer duration-300 transition hover:scale-150" src={ `${imgLocation}${product.product_image}` } alt={product.product_name} />
          </Link>
        </div>
        <div className="flex flex-col items-center">
            <h2 className="font-semibold text-lg text-gray-800">{ product.brand_name }</h2>
            <span className="text-gray-700 text-sm">{ product.product_name }</span>
            <span className="font-semibold text-gray-800">₱{ numberFormat.format(product.product_price) }</span>
        </div>
    </div>
  );
};

export default ProductCard;

