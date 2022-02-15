import { Helmet } from 'react-helmet';
import Datetime from '../../components/dashboard/partials/Datetime';

const AddProduct = () => {
  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Add Product</title></Helmet>
      <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Add Product</h1>
          <Datetime />
        </div>
      </div>
    </>
  );
};

export default AddProduct;
