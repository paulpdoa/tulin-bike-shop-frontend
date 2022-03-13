import { AiOutlineClose } from 'react-icons/ai';
import { useContext,useEffect,useState } from 'react';
import { GlobalContext } from '../../../helper/Context';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const Cod = ({ setShowCod,products }) => {
  
  const { customerId } = useContext(GlobalContext);  
  const cartItemId = products.map((product) => product._id);
  const [customer,setCustomer] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [mobile,setMobile] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('')
  const [city,setCity] = useState('');
  const [province,setProvince] = useState('');
  const [postal,setPostal] = useState('');
  const [barangay,setBarangay] = useState('');
  
  const {id} = useParams();
  useEffect(() => {
    const abortCont = new AbortController();
    
    axios.get(`/customer/${id}`)
    .then((data) => {
      setFirstname(data.data.firstname);
      setLastname(data.data.lastname);
      setEmail(data.data.email);
      setMobile(data.data.mobile);
      setAddress(data.data.address);
      setCity(data.data.city);
      setProvince(data.data.province);
      setPostal(data.data.postalCode);
      setBarangay(data.data.barangay);
    })

    return abortCont.abort();
  },[]);
 

  const navigate = useNavigate();
  const paymentMethod = 'Cash on Delivery';
  const placeOrder = async () => {
    const transaction = await axios.post('/order',{ customerId,cartItemId, paymentMethod })
    navigate(transaction.data.redirect);
  }

  return (
    <div className="absolute h-screen bg-gray-900 bg-opacity-50 w-full flex items-center justify-center z-50">
        <div className="relative w-1/2 flex items-center justify-center">
            <AiOutlineClose onClick={() => setShowCod(false)} className="absolute font-bold text-3xl cursor-pointer right-40 top-2 rounded-full" />
            <div className="bg-white p-5 rounded-md">
                
                <div>
                  <h2 className="text-3xl uppercase text-gray-800">Details</h2>
                  <div className="flex gap-5 items-center">
                    <div className="flex flex-col">
                      <label htmlFor="firstname">First Name:</label>
                      <input className="p-2 border border-gray-500 rounded outline-none placeholder:text-gray-800" type="text" placeholder={firstname} />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="lastname">Last Name:</label>
                      <input className="p-2 border border-gray-500 rounded outline-none placeholder:text-gray-800" type="text" placeholder={lastname} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="p-2 border border-gray-500 rounded placeholder:text-gray-800 outline-none" placeholder={email} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="mobile">Mobile Number:</label>
                    <input type="email" className="p-2 border border-gray-500 rounded placeholder:text-gray-800 outline-none" placeholder={mobile} />
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-3xl uppercase text-gray-800">Address</h2>
                  <div className="flex flex-col">
                    <label htmlFor="housenumber">House no. & Street:</label>
                    <input type="text" className="p-2 border border-gray-500 rounded placeholder:text-gray-800 outline-none" placeholder={address} />
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="flex flex-col">
                      <label htmlFor="barangay">Barangay:</label>
                      <input className="p-2 border border-gray-500 rounded outline-none placeholder:text-gray-800" type="text" placeholder={barangay} />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="city">City:</label>
                      <input className="p-2 border border-gray-500 rounded outline-none placeholder:text-gray-800" type="text" placeholder={city} />
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="flex flex-col">
                      <label htmlFor="province">Province:</label>
                      <input className="p-2 border border-gray-500 rounded outline-none placeholder:text-gray-800" type="text" placeholder={province} />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="postal code">Postal Code:</label>
                      <input className="p-2 border border-gray-500 rounded outline-none placeholder:text-gray-800" type="text" placeholder={postal} />
                    </div>
                  </div>
                </div>
                <div className="w-full mt-5">
                  <button onClick={placeOrder} className="bg-gray-900 text-gray-100 p-2 rounded w-full">Place Order</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Cod