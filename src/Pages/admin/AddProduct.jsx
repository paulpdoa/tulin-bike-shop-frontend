import { Helmet } from 'react-helmet';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';

import Datetime from '../../components/dashboard/partials/Datetime';

const AddProduct = () => {
  

  const [type,setType] = useState('');
  const [size,setSize] = useState('');
  const [brand,setBrand] = useState('');
  const [color,setColor] = useState('');
  const [itemName,setItemName] = useState('');
  const [quantity,setQuantity] = useState(0);
  const [productImg,setProductImg] = useState();

  const uploadProduct = (e) => {
    e.preventDefault();
    const productDetails = {
      type,
      size,
      brand,
      itemName,
      quantity,
      productImg
    }

    console.log(productDetails);
  }

  // Preview image before upload
  const readImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2) {
        setProductImg(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Add Product</title></Helmet>
      <div className="p-20">
        <div className="flex justify-between items-center border-b border-gray-400">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Add Product</h1>
          <Datetime />
        </div>

        <form onSubmit={uploadProduct} className="grid grid-cols-3 gap-5 mt-10">
            <div className="relative bg-white border-2 h-72 w-72 border-gray-400 rounded overflow-hidden flex items-center justify-center flex-col">
              { productImg ? <img className="object-cover" src={productImg} alt="Product View" /> : 
              <>
                <AiOutlinePlus className="text-8xl" />
                <h2 className="font-bold text-gray-300 select-none">Upload Photo</h2>
              </> }
              <input onChange={readImage} className="absolute h-full w-full opacity-0 cursor-pointer" type="file" accept="image/*" name="Product Image" />
            </div>

            <div className="flex flex-col gap-4">
              <section className="flex flex-col">
                <label htmlFor="type">Select type:</label>
                <select onChange={(e) => setType(e.target.value)} value={type} className="p-2 w-1/2 outline-none border border-gray-300 rounded cursor-pointer">
                  <option value="Bicycle">Bicycle</option>
                  <option value="Accessory">Accessory</option>
                  <option value="Part">Part</option>
                </select>
              </section>
              <section className="flex flex-col">
                <label htmlFor="brandname">Product Size:</label>
                <select onChange={(e) => setSize(e.target.value)} value={size} className="p-2 w-1/2 outline-none border border-gray-300 rounded cursor-pointer">
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="XL">XL</option>
                  <option value="L">L</option>
                  
                </select>
              </section>
              <section className="flex flex-col">
                <label htmlFor="brandname">Product Color:</label>
                <input type="text" onChange={(e) => setColor(e.target.value)} value={color} className="p-2 w-1/2 outline-none border border-gray-300 rounded cursor-pointer" />
              </section>
              <section className="flex flex-col">
                <label htmlFor="brandname">Brand Name:</label>
                <input onChange={(e) => setBrand(e.target.value)} value={brand} className="p-2 outline-none cursor-pointer border border-gray-300 rounded" type="text"  />
              </section>
              <section className="flex flex-col">
                <label htmlFor="brandname">Item Name:</label>
                <input onChange={(e) => setItemName(e.target.value)} value={itemName} className="p-2 outline-none cursor-pointer border border-gray-300 rounded" type="text"  />
              </section>
              <section className="flex flex-col">
                <label htmlFor="brandname">Quantity:</label>
                  <div className="flex items-center gap-3">
                    <span className="p-1 bg-gray-900 text-gray-100 rounded w-14 font-semibold text-xl" onClick={() => quantity > 0 && setQuantity(quantity-1)}>-</span>
                    <span className="font-semibold text-gray-800 text-lg">{quantity}</span>
                    <span className="p-1 bg-gray-900 text-gray-100 rounded w-14 font-semibold text-xl" onClick={() => setQuantity(quantity+1)}>+</span>
                  </div>
                  <span className="text-sm text-red-500 font-semibold">{ quantity < 1 && 'product cannot be 0' }</span>
              </section>
            </div>

            <div className="flex flex-col">
              <label htmlFor="description">Product Description:</label>
              <textarea className="p-2 outline-none cursor-pointer border border-gray-300 rounded" cols="30" rows="10"></textarea>
              <button className="p-2 text-gray-100 bg-gray-900 mt-2 rounded w-1/2">Add Product</button>
            </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
