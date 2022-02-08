import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileDetail = () => {

    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
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
        })
        return () => abortCont.abort;
    })

    const onUpdate = (e) => {
        e.preventDefault();
    }
 
  return (
    <div className="p-20 h-screen col-span-2">
        <div className="bg-gray-900 w-full h-4/5 text-gray-100 rounded-md p-10 overflow-hidden">
            <h1 className="font-semibold text-4xl border-b-2 border-gray-400 py-1">Personal Information</h1>
            <div className="h-full flex justify-between gap-2">
                <form onSubmit={onUpdate} className="flex gap-2 flex-wrap w-full">
                    <div className="flex flex-col mt-4">
                        <label htmlFor="firstname">First name</label>
                        <input className="p-2 rounded outline-none text-gray-900" type="text" placeholder={ firstname } />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="firstname">Last name</label>
                        <input className="p-2 rounded outline-none text-gray-900" type="text" placeholder={ lastname } />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="firstname">Username</label>
                        <input className="p-2 rounded outline-none text-gray-900" type="text" placeholder={ username } />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="firstname">Email</label>
                        <input className="p-2 rounded outline-none text-gray-900" type="text" placeholder={ email } />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="firstname">Password</label>
                        <input className="p-2 rounded outline-none text-gray-900" type="password" placeholder="Password" />
                    </div>
                    <div className="flex flex-col mt-10 w-32">
                        <button className="bg-green-700 h-10 w-full rounded text-gray-100">Update</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  );
};

export default ProfileDetail;
