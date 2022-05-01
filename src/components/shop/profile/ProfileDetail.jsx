import { useEffect,useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../helper/baseUrl';

const ProfileDetail = () => {

    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('')
    const [password,setPassword] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const abortCont = new AbortController();

        axios.get(`${baseUrl()}/customer/${id}`,{ signal:abortCont.signal })
        .then((data) => {
            setFirstname(data.data.firstname);
            setLastname(data.data.lastname);
            setUsername(data.data.username);
            setEmail(data.data.email);
            setAddress(data.data.address);
        })
        return () => abortCont.abort();
    },[id])

    const onUpdate = (e) => {
        e.preventDefault();
        if(password !== '') {
            axios.patch(`/customer/${id}`,{ password })
            .then(data => {
                console.log(data);
                navigate('/');
            })
        } else {
            alert('Enter password');
        }
    }
 
  return (
    <div className="md:p-20 p-10 md:h-screen md:col-span-2 col-span-3 md:mt-0 -mt-10">
        <h1 className="text-gray-800 font-semibold md:text-4xl text-3xl">Personal Information</h1>
        
        <form className="grid grid-cols-2 grid-rows-4 gap-5" onSubmit={onUpdate}>
            <div className="flex flex-col">
                <label htmlFor="firstname">First Name:</label>
                <input className="p-2 rounded outline-none border border-gray-200 bg-white placeholder:text-gray-800" type="text" placeholder={firstname} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="lastname">Last Name:</label>
                <input className="p-2 rounded outline-none border border-gray-200 bg-white placeholder:text-gray-800" type="text" placeholder={lastname} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="username">Username:</label>
                <input className="p-2 rounded outline-none border border-gray-200 bg-white placeholder:text-gray-800" type="text" placeholder={username} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input className="p-2 rounded outline-none border border-gray-200 bg-white placeholder:text-gray-800" type="email" placeholder={email} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="address">Address:</label>
                <input className="p-2 rounded outline-none border border-gray-200 bg-white placeholder:text-gray-800" type="email" placeholder={address} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="firstname">Password:</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="p-2 rounded outline-none border border-gray-200 bg-white placeholder:text-gray-800" type="password" placeholder={password} />
            </div>
            <button onClick={onUpdate} className="p-2 bg-green-500 text-gray-100 w-1/2 h-4/5 rounded self-end">Update</button>
        </form>
    </div>
  );
};

export default ProfileDetail;
