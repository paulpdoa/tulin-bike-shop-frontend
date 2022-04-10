import { useContext,useState,useEffect } from 'react';
import { GlobalContext } from '../../helper/Context';

import { GrClose } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';


const Chatbox = () => {
   
  const [message,setMessage] = useState('');

  const [send,setSend] = useState('');
  const [received,setReceived] = useState('');
  const { setShowChatbox,socket } = useContext(GlobalContext);
  console.log(socket);
  const sendMessage = () => {
    socket.emit("send_message",{ message });
    setMessage('');
  }
    
  return (
    <div className="fixed bottom-0 right-5 bg-gray-100 shadow-3xl w-96 h-96 rounded-t-md overflow-hidden">
        <header onClick={() => setShowChatbox(false)} className="bg-blue-600 flex justify-between p-2 text-gray-100 cursor-pointer">
            <h1>Tulin Bike Shop - Admin</h1>
            <button className="group" onClick={() => setShowChatbox(false)}><GrClose className="group-hover:scale-150 transition duration-200 text-gray-100"/></button>
        </header>
        {/* Messages Area */}
        <div className="w-full h-full mt-3 overflow-auto">
          <div className="flex justify-end w-full mt-2">
            <div className="bg-blue-500 w-1/2 rounded-md p-2">
              <p className="text-sm break-all">Sent</p>
              <span className="text-xs">Tuesday 8:00</span>
            </div>
          </div>
          
          <div className="flex justify-start w-full mt-2">
            <div className="bg-gray-200 w-1/2 rounded-md p-2">
              <p className="text-sm break-all">Received</p>
              <span className="text-xs">Tuesday 8:00</span>
            </div>
          </div>
        </div>
        {/* Messages Area */}
        {/* Input Area */}
        <div className="bottom-0 absolute bg-gray-100 w-full h-10 flex items-center gap-5 overflow-hidden"> 
          <textarea onKeyPress={(e) => e.key === "Enter" && sendMessage()} onChange={(e) => setMessage(e.target.value)} value={message} className="h-full p-2 w-full outline-none text-sm" type="text" placeholder="Aa"></textarea>
          <IoSend onClick={ sendMessage } className="text-2xl cursor-pointer mr-5 hover:scale-150 transition duration-300" />
        </div>
        {/* Input Area */}
    </div>
  )
}

export default Chatbox