import { useState } from 'react';

const Message = () => {

  const [message,setMessage] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');  

  const onSubmit = (e) => {
    e.preventDefault();
    const dataMessage = {
        message,
        name,
        email
    };
    console.log(dataMessage);
  }

  return (
    <div className="bg-gray-900 content">
        <div className="max-content py-20">
            <h1 className="font-semibold text-4xl text-gray-100 text-center uppercase">Message Us!</h1>
            <form onSubmit={onSubmit} className="flex gap-2 items-center justify-center py-10">
                <textarea 
                    onChange={(e) => setMessage(e.target.value)} 
                    value={message}
                    className="h-36 p-2 rounded-md outline-none" 
                    placeholder="Message" 
                    cols="30" 
                    rows="10"></textarea>
                <div className="flex flex-col gap-3 w-64 h-full">
                    <input onChange={(e) => setName(e.target.value)} value={name} className="p-2 rounded-md outline-none" type="text" placeholder="Name" />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className="p-2 rounded-md outline-none" type="email" placeholder="Email" />
                    <button className="border-2 border-gray-100 p-2 w-1/2 rounded-md text-gray-100">Submit</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Message;
