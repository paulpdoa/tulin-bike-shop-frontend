import { BiUserCircle,BiShoppingBag,BiHistory,BiTrash } from 'react-icons/bi';
import { MdKeyboardArrowRight } from 'react-icons/md';

import axios from 'axios';
import { useState,useContext,useEffect } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GlobalContext } from '../../../helper/Context';

const ProfileSidebar = () => {

    const { imgProfileLocation } = useContext(GlobalContext);
    const [sideTitle,setSideTitle] = useState('My Account');
    const [profilePicture,setProfilePicture] = useState([]);
    const [displayImage,setDisplayImage] = useState();
    const [userImg,setUserImg] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

     // Get user to display image
    useEffect(() => {
        const abortCont = new AbortController();
        axios.get(`/customer/${id}`,{signal:abortCont.signal})
        .then(data => {
            setUserImg(data.data.profilePicture);
        })
        return () => abortCont.abort();
    },[id])

    const previewProfilePicture = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setDisplayImage(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setProfilePicture(e.target.files[0]);
    }

    const uploadProfilePicture = async() => {
        try {
            const profilePic = new FormData();
            profilePic.append('profile_image',profilePicture);
            const data = await axios.post(`/customer/profilepicture/${id}`,profilePic);
            alert(data.data.mssg);
            navigate('/');

        }
        catch(err) {
            console.log(err);
        }
    }

  return (
      <nav className="md:col-span-1 col-span-3 md:p-20 p-10">
        <h1 className="font-semibold text-4xl text-gray-800 whitespace-nowrap">{sideTitle}</h1>
        <div className="overflow-hidden md:flex justify-center relative hidden">
            { userImg ? <img onClick={previewProfilePicture} className="object-cover rounded-full w-32 h-32 cursor-pointer" src={`${imgProfileLocation}${userImg}`} alt="Blank Profile" /> :
                <>
                { displayImage ? 
                    <div className="flex flex-col">
                        <img className="object-cover rounded-full w-32 h-32 cursor-pointer" src={displayImage} alt="Blank Profile" />
                        <input onChange={previewProfilePicture} className="absolute h-full w-full opacity-0" type="file" accept='image/*' />
                        <button onClick={uploadProfilePicture} className="bg-gray-700 rounded p-2 text-gray-100 mt-2 z-50 cursor-pointer">Upload</button>
                    </div> :
                    <>
                        <img className="object-cover rounded-full w-32 h-32 cursor-pointer" src="/image/blank-profile.png" alt="Blank Profile" />
                        <input onChange={previewProfilePicture} className="absolute h-full w-full opacity-0" type="file" accept='image/*' />
                    </> 
                }
                </>
                }
        </div>
        <ul className="flex flex-col md:gap-5 gap-2 mt-5 text-gray-800 text-lg">
            <Link className="bg-gray-50 md:bg-transparent md:shadow-none md:border-none shadow-2xl border-gray-200 border w-full rounded-md p-3 md:p-0 flex justify-between items-center" onClick={() => setSideTitle('My Account')} to={`/profile/${Cookies.get('customerId')}`}>
                <li className="flex gap-2 items-center"><BiUserCircle />My Account</li>
                <MdKeyboardArrowRight className="text-3xl md:hidden block" />
            </Link>
            <Link className="bg-gray-50 md:bg-transparent md:shadow-none md:border-none shadow-2xl border-gray-200 border w-full rounded-md p-3 md:p-0 flex justify-between items-center" onClick={() => setSideTitle('Orders')} to={`/profile/orders/${Cookies.get('customerId')}`}>
                <li className="flex gap-2 items-center"><BiShoppingBag />Orders</li>
                <MdKeyboardArrowRight className="text-3xl md:hidden block" />
            </Link>
            <Link className="bg-gray-50 md:bg-transparent md:shadow-none md:border-none shadow-2xl border-gray-200 border w-full rounded-md p-3 md:p-0 flex justify-between items-center" onClick={() => setSideTitle('History')} to={`/profile/history/${Cookies.get('customerId')}`}>
                <li className="flex gap-2 items-center"><BiHistory />History</li>
                <MdKeyboardArrowRight className="text-3xl md:hidden block" />
            </Link>
            <Link className="bg-gray-50 md:bg-transparent md:shadow-none md:border-none shadow-2xl border-gray-200 border w-full rounded-md p-3 md:p-0 flex justify-between items-center" onClick={() => setSideTitle('Delete Account')} to={`/profile/delete/${Cookies.get('customerId')}`}>
                <li className="flex gap-2 items-center"><BiTrash />Delete Account</li>
                <MdKeyboardArrowRight className="text-3xl md:hidden block" />
            </Link>
        </ul>      
      </nav>
  );
};

export default ProfileSidebar;
