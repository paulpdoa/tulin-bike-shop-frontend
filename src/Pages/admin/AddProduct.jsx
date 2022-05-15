import { Helmet } from 'react-helmet';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Datetime from '../../components/dashboard/partials/Datetime';
import { GlobalContext } from '../../helper/Context';
import { baseUrl } from '../../helper/baseUrl';
const AddProduct = () => {

  const { setShowAlert,setAlertMssg } = useContext(GlobalContext);

  const [type,setType] = useState('');
  const [size,setSize] = useState('');
  const [brand,setBrand] = useState('');
  const [color,setColor] = useState([]);
  const [price,setPrice] = useState(0);
  const [description,setDescription] = useState('');
  const [itemName,setItemName] = useState('');
  const [quantity,setQuantity] = useState(0);
  const [productImg,setProductImg] = useState();
  const [image,setImage] = useState();
  
  const navigate = useNavigate();

  const uploadProduct = (e) => {
    e.preventDefault();

    const uniqueColor = color.filter((col,key) => color.indexOf(col) === key);

    const productDetails = new FormData();
    
    productDetails.append('product_image',image);
    productDetails.append('product_type',type);
    productDetails.append('brand_name',brand);
    productDetails.append('product_name',itemName);
    productDetails.append('product_size',size);
    productDetails.append('product_color',uniqueColor);
    productDetails.append('product_quantity',quantity);
    productDetails.append('product_price',price);
    productDetails.append('product_description',description);
    
    axios.post(`${baseUrl()}/inventory`, productDetails)
    .then((data) => {
      setAlertMssg(data.data.mssg);
      setShowAlert(true);
      navigate(data.data.redirect);
    }).catch(err => console.log(err))
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
    setImage(e.target.files[0]);
  }

  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Add Product</title></Helmet>
      <div className="p-20">
        <div className="flex justify-between items-center border-b border-gray-400">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Add Product</h1>
          <Datetime />
        </div>

        <form onSubmit={uploadProduct} className="grid grid-cols-3 gap-5 mt-10" encType="multipart/form-data">
            <div className="relative bg-white border-2 h-72 w-72 border-gray-400 rounded overflow-hidden flex items-center justify-center flex-col">
              { productImg ? <img className="object-cover" src={productImg} alt="Product View" /> : 
              <>
                <AiOutlinePlus className="text-8xl" />
                <h2 className="font-bold text-gray-300 select-none">Upload Photo</h2>
              </> }
              <input required onChange={readImage} className="absolute h-full w-full opacity-0 cursor-pointer" type="file" accept="image/*" name="product_image" />
            </div>

            <div className="flex flex-col gap-4">
              <section className="flex flex-col">
                <label htmlFor="type">Select type:</label>
                <select onChange={(e) => setType(e.target.value)} value={type} className="p-2 w-1/2 outline-none border border-gray-300 rounded cursor-pointer">
                  <option defaultValue="" disabled selected hidden>Type</option>
                  <option defaultValue="Bicycle">Bicycle</option>
                  <option defaultValue="Accessory">Accessory</option>
                  <option defaultValue="Part">Part</option>
                </select>
              </section>
              { type === 'Bicycle' ? 
              <section className="flex flex-col">
              <label htmlFor="brandname">Product Size:</label>
              <select onChange={(e) => setSize(e.target.value)} className="p-2 w-1/2 outline-none border border-gray-300 rounded cursor-pointer">
                <option defaultValue="" disabled selected hidden>Size</option>
                <option defaultValue="XS">XS</option>
                <option defaultValue="S">S</option>
                <option defaultValue="M">M</option>
                <option defaultValue="XL">XL</option>
                <option defaultValue="L">L</option>
              </select>
            </section> : ''
              }
              <section className="flex flex-col">
                <label htmlFor="brandname">Price:</label>
                <input required type="number" onChange={(e) => setPrice(e.target.value)} value={price} className="p-2 w-1/2 outline-none border border-gray-300 rounded cursor-pointer" />
              </section>
              <section className="flex flex-col">
                <label htmlFor="brandname">Product Color:</label>
                <div className="flex items-center gap-2">
                  <label htmlFor="red">Red</label>
                  <input type="checkbox" onChange={(e) => e.target.checked && setColor(currCol => [...currCol,e.target.value])} value="red" />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="green">Green</label>
                  <input type="checkbox" onChange={(e) => e.target.checked && setColor(currCol => [...currCol,e.target.value])} value="green" />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="blue">Blue</label>
                  <input type="checkbox" onChange={(e) => e.target.checked && setColor(currCol => [...currCol,e.target.value])} value="blue" />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="yellow">Yellow</label>
                  <input type="checkbox" onChange={(e) => e.target.checked && setColor(currCol => [...currCol,e.target.value])} value="yellow" />
                </div>
              </section>
              <section className="flex flex-col">
                <label htmlFor="brandname">Brand Name:</label>
                <input required onChange={(e) => setBrand(e.target.value)} value={brand} className="p-2 outline-none cursor-pointer border border-gray-300 rounded" type="text"  />
              </section>
              <section className="flex flex-col">
                <label htmlFor="brandname">Item Name:</label>
                <input required onChange={(e) => setItemName(e.target.value)} value={itemName} className="p-2 outline-none cursor-pointer border border-gray-300 rounded" type="text"  />
              </section>
              <section className="flex flex-col">
                <label htmlFor="brandname">Quantity:</label>
                  <div className="flex items-center gap-3">
                    <span className="p-1 bg-gray-900 text-gray-100 rounded w-14 font-semibold text-xl text-center cursor-pointer select-none" onClick={() => quantity > 0 && setQuantity(quantity-1)}>-</span>
                    <span className="font-semibold text-gray-800 text-lg">{quantity}</span>
                    <span className="p-1 bg-gray-900 text-gray-100 rounded w-14 font-semibold text-xl text-center cursor-pointer select-none" onClick={() => setQuantity(quantity+1)}>+</span>
                  </div>
                  <span className="text-sm text-red-500 font-semibold">{ quantity < 1 && 'product cannot be 0' }</span>
              </section>
            </div>

            <div className="flex flex-col">
              <label htmlFor="description">Product Description:</label>
              <textarea onChange={(e) => setDescription(e.target.value)} value={description} required className="p-2 outline-none cursor-pointer border border-gray-300 rounded" cols="30" rows="10"></textarea>
              <button className="p-2 text-gray-100 bg-gray-900 mt-2 rounded w-1/2">Add Product</button>
            </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
