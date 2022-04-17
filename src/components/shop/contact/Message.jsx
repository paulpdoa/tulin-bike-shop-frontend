import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AiOutlineMail } from 'react-icons/ai';
import { IoPersonOutline } from 'react-icons/io5';
import { RiFileList3Line } from 'react-icons/ri';
import { MdOutlineMessage } from 'react-icons/md';

const Message = () => {

  const [message,setMessage] = useState('');
  const [name,setName] = useState('');
  const [subject,setSubject] = useState('');
  const [email,setEmail] = useState('');  

  const navigate = useNavigate();

  // send message to tulin
  const onSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const data = await axios.post('/sendemail',{ message,name,email,subject });
      alert(data.data.mssg);
      navigate('/')
    } catch(err) {
      console.log(err);
    }
  
  }

  return (
    <div className="content">
        <div className="max-content flex flex-col md:flex-row justify-around items-center gap-3 py-20">
          <iframe className="w-4/5 md:w-[85%]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.686503362787!2d120.85162561462896!3d14.387541389938415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33962c86ebd844c7%3A0x67cb4930ead5600b!2sTulin%20Bicycle%20and%20Repair%20Shop!5e0!3m2!1sen!2sph!4v1649159449174!5m2!1sen!2sph" width="600" height="450" style={{ border:"0" }} title="tulin map" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <form className="w-4/5 md:w-auto" onSubmit={onSubmit}>
            <div className="border-b-4 border-gray-800 w-32 md:mt-auto mt-10">
              <h2 className="uppercase rockwell text-widest whitespace-nowrap text-2xl">Leave a message</h2>
            </div>
            <p className="text-gray-400 text-sm font-semibold mt-5">Please don’t hesitate to contact us for more information</p>
            <div className="flex gap-2 flex-col mt-4">
              <div className="flex gap-3 justify-around">
                <div className="border-2 border-gray-800 border-dashed flex items-center">
                  <input value={email} onChange={e => setEmail(e.target.value)} className="outline-none p-2 placeholder:italic placeholder:font-light md:w-auto w-full" type="email" placeholder="Your Email" />
                  <AiOutlineMail className="mr-2" />
                </div>
                <div className="border-2 border-gray-800 border-dashed flex items-center">
                  <input value={name} onChange={e => setName(e.target.value)} className="outline-none p-2 placeholder:italic placeholder:font-light md:w-auto w-full" type="text" placeholder="Your Name" />
                  <IoPersonOutline className="mr-2" />
                </div>
              </div>
              <div className="border-2 border-gray-800 border-dashed flex items-center justify-between">
                <input value={subject} onChange={e => setSubject(e.target.value)} className="outline-none p-2 placeholder:italic placeholder:font-light w-full" type="text" placeholder="Your Subject" />
                <RiFileList3Line className="mr-2" />
              </div>
              <div className="border-2 border-gray-800 border-dashed flex items-center justify-between">
                <textarea value={message} onChange={e => setMessage(e.target.value)} className="outline-none p-2 placeholder:italic placeholder:font-light w-full" placeholder="Your Message"></textarea>
                <MdOutlineMessage className="mr-2" />
              </div>
            </div>
            <button className="p-2 bg-gray-800 text-gray-100 hover:bg-transparent hover:border-2 hover:border-gray-800 hover:text-gray-800 transition duration-300 rounded-md mt-5 text-sm">Send Message</button>
          </form>
        </div>
    </div>
  );
};

export default Message;
