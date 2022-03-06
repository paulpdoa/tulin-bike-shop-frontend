import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileDetail = () => {

    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('')
    const [password,setPassword] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const abortCont = new AbortController();

        axios.get(`/customer/${id}`)
        .then((data) => {
            setFirstname(data.data.firstname);
            setLastname(data.data.lastname);
            setUsername(data.data.username);
            setEmail(data.data.email);
            setAddress(data.data.address);
        })
        return () => abortCont.abort;
    })

    const onUpdate = (e) => {
        e.preventDefault();
    }
 
  return (
    <div className="p-20 h-screen col-span-2">
        <h1 className="text-gray-800 font-semibold text-4xl">Personal Information</h1>
        <form className="grid grid-cols-2 grid-rows-4 gap-5" onSubmit={onUpdate}>
            <div className="flex flex-col">
                <label htmlFor="firstname">First Name:</label>
                <input className="p-2 rounded outline-none bg-white placeholder:text-gray-800" type="text" placeholder={firstname} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="lastname">Last Name:</label>
                <input className="p-2 rounded outline-none bg-white placeholder:text-gray-800" type="text" placeholder={lastname} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="username">Username:</label>
                <input className="p-2 rounded outline-none bg-white placeholder:text-gray-800" type="text" placeholder={username} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input className="p-2 rounded outline-none bg-white placeholder:text-gray-800" type="email" placeholder={email} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="address">Address:</label>
                <input className="p-2 rounded outline-none bg-white placeholder:text-gray-800" type="email" placeholder={address} disabled />
            </div>
            <div className="flex flex-col">
                <label htmlFor="firstname">Password:</label>
                <input className="p-2 rounded outline-none bg-white placeholder:text-gray-800" type="password" placeholder={password} />
            </div>
            <button className="p-2 bg-green-500 text-gray-100 w-1/2 h-4/5 rounded self-end">Update</button>
        </form>
    </div>
  );
};

export default ProfileDetail;
