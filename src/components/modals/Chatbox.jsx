import { useContext,useState,useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../helper/Context';
import Cookies from 'js-cookie';
import ScrollToBottom from 'react-scroll-to-bottom';
import { GrClose } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { baseUrl } from '../../helper/baseUrl';

const Chatbox = () => {

  const [chatDatas,setChatDatas] = useState([]);

  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(true);
 
  const { setShowChatbox,socket,day } = useContext(GlobalContext);

  // 1. show messages from database
  // 2. using socket.io, when messaging, push it to the chatDatas state and immediately display it
  useEffect(() => {
    const abortCont = new AbortController();

    const fetchMessages = async () => {
      try {
        const data = await axios.get(`${baseUrl()}/chat`,{ signal:abortCont.signal });
        setChatDatas(data.data);
        setLoading(false);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchMessages();

    // socket.on("receive_message",(data) => {
    //   // setMessageList([...messageList, data]);
    //   setChatDatas([...chatDatas, data]);
    //   console.log(data);
    // });

    return () => abortCont.abort();
  },[chatDatas])
  
  const sendMessage = async() => {
   if(message !== "") {
    const data = {
      room: Cookies.get('customerId'),
      user:'customer',
      sender: Cookies.get('customerId'),
      receiver: '61f8c1bc41276f1dd1ebdc26',
      customer: localStorage.getItem('customer_name'),
      message:message.trim(),
      time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      day: day[new Date().getDay()]
    }

    // await socket.emit("send_message",data);
    // // setMessageList((list) => [...list,data]);
    // setChatDatas([...chatDatas,data]);
    setMessage('');

    // Post to db
    try {
      await axios.post('/chat',data);
    }
    catch(err) {
      console.log(err);
    }
   }
  }

    
  return (
    <div className="fixed bottom-0 right-5 bg-gray-100 shadow-3xl w-96 h-96 rounded-t-md overflow-hidden">
        <header onClick={() => setShowChatbox(false)} className="bg-blue-600 flex justify-between p-2 text-gray-100 cursor-pointer">
            <h1>Tulin Bike Shop - Admin</h1>
            <button className="group" onClick={() => setShowChatbox(false)}><GrClose className="group-hover:scale-150 transition duration-200 text-gray-100"/></button>
        </header>
        {/* Messages Area */}
        <div className="w-full h-4/5 overflow-auto">
          <ScrollToBottom className="overflow-y-scroll h-full">
            { loading ? <h1>Please wait...</h1> : 
            chatDatas && chatDatas.filter(chatData => chatData.room === Cookies.get('customerId')).map((content,key) => (
              <div className={`flex ${content.user === 'customer' ? 'justify-end' : 'justify-start'} w-full mt-2`} key={key}>
                <div className={`${content.user === 'customer' ? 'bg-blue-500 text-gray-100' : 'bg-gray-200 text-gray-800'} w-1/2 rounded-md p-2 ml-2`}>
                  <p className="text-sm break-all">{content.message}</p>
                  <span className="text-xs">{content.day} { content.time }</span>
                </div>
              </div>
            ))
            }
          </ScrollToBottom>
        </div>
        {/* Messages Area */}
        {/* Input Area */}
        <div className="bg-gray-100 w-full h-10 flex items-center gap-5 overflow-hidden static"> 
          <textarea onKeyPress={(e) => e.key === "Enter" && sendMessage()} onChange={(e) => setMessage(e.target.value)} value={message} className="h-full p-2 w-full outline-none text-sm" type="text" placeholder="Aa" required></textarea>
          <IoSend onClick={ sendMessage } className="text-2xl cursor-pointer mr-5 hover:scale-150 transition duration-300" />
        </div>
        {/* Input Area */}
    </div>
  )
}

export default Chatbox