import { IoSend } from 'react-icons/io5';
import { useState,useEffect,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';

const Conversation = ({ senderName,profileImg,senderId }) => {

  const { socket,day,imgProfileLocation } = useContext(GlobalContext);

  const [chatDatas,setChatDatas] = useState([]);
  const [loading,setLoading] = useState(true);

  const [message,setMessage] = useState('');
  const [messageList,setMessageList] = useState([]);

  useEffect(() => {
      const abortCont = new AbortController();

      const fetchMessages = async () => {
        try {
          const data = await axios.get('/chat',{ signal:abortCont.signal });
          setChatDatas(data.data);
          setLoading(false);
        }
        catch(err) {
          console.log(err);
        }
      }
      fetchMessages();

      // socket.on("receive_message",(data) => {
      //     setChatDatas((chat) => [...chat,data]);
      // });

      return () => abortCont.abort();
  },[chatDatas]);

  const sendMessage = async() => {
      
      if(message !== "") {
        const data = {
            room: senderId,
            user:'admin',
            sender: '61f8c1bc41276f1dd1ebdc26',
            receiver: senderId,
            admin: localStorage.getItem('adminName'),
            message:message.trim(),
            time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
            day: day[new Date().getDay()]
          }
         
          // await socket.emit("send_message",data);
          // setChatDatas(chat => [...chat,data]);
          setMessage('');

          try {
            await axios.post('/chat',data);
          }
          catch(err) {
            console.log(err);
          }
      }
  }
 

  return (
    <div className="w-full relative h-auto">
        <header className="border-b border-gray-600 p-3 flex gap-2 items-center">
            { profileImg ? <img className="rounded-full w-10 h-10" src={`${imgProfileLocation}${profileImg}`} alt={senderName} /> : <img className="rounded-full w-10 h-10" src='/image/blank-profile.png' alt={senderName} /> }
            <h1 className="font-semibold text-2xl">{senderName}</h1>
        </header>
        {/* Message Area */}
        <div className="w-full overflow-y-scroll h-4/5 py-2">
            <ScrollToBottom className="overflow-y-scroll h-full select-text">
                { loading ? <h1 className="text-gray-500 animate-pulse">Please wait...</h1> : 
                  chatDatas && chatDatas.filter(chatData => chatData.room === senderId).map((content,key) => (
                    <div className={`${content.user === 'admin' ? 'justify-end' : 'justify-start'} flex mt-2`} key={key}>
                        <div className={`${content.user === 'admin' ? 'bg-blue-500 text-gray-100'  : 'bg-gray-200 text-gray-800'} w-1/2 rounded-md p-2`}>
                            <p className="text-sm">{ content.message }</p>
                            <span className="text-xs">{content.day} {content.time}</span>
                        </div>
                    </div>
                ))
                }
            </ScrollToBottom>
        </div>
        {/* Message Area */}

        {/* Input Area */}
        <div className="w-full flex gap-1 items-center overflow-hidden">
            <input onKeyPress={(e) => e.key === "Enter" && sendMessage()} required value={message} onChange={(e) => setMessage(e.target.value)} className="p-2 w-full outline-none" type="text" placeholder="Aa" />
            <button onClick={sendMessage} className="text-2xl group"><IoSend className="group-hover:scale-150 transition duration-300" /></button>
        </div>
        {/* Input Area */}
    </div>
  )
}

export default Conversation