import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imgLocation = 'http://localhost:8000/uploads/products/'

  return (
    <div className="shadow-lg" key={product._id}>
        <div className="h-44 overflow-hidden rounded-lg">
          <Link to={`/products/${product._id}`}>
            <img className="object-cover cursor-pointer duration-300 transition hover:scale-150" src={ `${imgLocation}${product.product_image}` } alt={product.product_name} />
          </Link>
        </div>
        <div className="flex flex-col items-center">
            <h2 className="font-semibold text-lg text-gray-800">{ product.brand_name }</h2>
            <span className="text-gray-700 text-sm">{ product.product_name }</span>
            <span className="font-semibold text-gray-800">Php. { product.product_price.toLocaleString() }</span>
        </div>
    </div>
  );
};

export default ProductCard;

