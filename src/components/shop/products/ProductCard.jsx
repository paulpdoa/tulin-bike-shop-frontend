
const ProductCard = ({ product }) => {
  return (
    <div className="shadow-lg">
        <div className="h-44 overflow-hidden rounded-lg">
            <img className="object-cover cursor-pointer duration-300 transition hover:scale-150" src="/image/bicycletemp.png" alt="Bicycle Temp" />
        </div>
        <div className="flex flex-col items-center">
            <h2 className="font-semibold text-lg text-gray-800">{ product.productName }</h2>
            <span className="text-gray-700 text-sm">{ product.productBrand }</span>
            <span className="font-semibold text-gray-800">Php. { product.productPrice }</span>
        </div>
    </div>
  );
};

export default ProductCard;

