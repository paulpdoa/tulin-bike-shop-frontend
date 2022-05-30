import { useContext,useState,useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../helper/Context';
import Cookies from 'js-cookie';
import ScrollToBottom from 'react-scroll-to-bottom';
import { GrClose } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { baseUrl } from '../../helper/baseUrl';
import { BsFillCircleFill } from 'react-icons/bs';

const Chatbox = () => {

  const [chatDatas,setChatDatas] = useState([]);

  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(true);

  const [admin,setAdmin] = useState();
 
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

  // Get admin if logged in
  useEffect(() => {
    const abortCont = new AbortController();

    const fetchAdminStatus = async () => {
      try {
        const data = await axios.get(`${baseUrl()}/admin`,{ signal: abortCont.signal });
        setAdmin(data.data);
      }
      catch(err) {
        console.log(err);
      }
    } 
    fetchAdminStatus();

    return () => abortCont.abort();
  },[admin])
  
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
      await axios.post(`${baseUrl()}/chat`,data);
    }
    catch(err) {
      console.log(err);
    }
   }
  }

    
  return (
    <div className="fixed bottom-1 right-5 bg-gray-100 shadow-3xl w-96 h-96 rounded-t-md overflow-hidden z-50">
        <header onClick={() => setShowChatbox(false)} className="bg-blue-600 flex justify-between p-2 text-gray-100 cursor-pointer">
            { admin && admin.map(status => (
              <div className="flex flex-col">
                <h1 className="text-xs">Tulin Bike Shop - Admin</h1>
                <span className="text-xs gap-1 flex items-center"><BsFillCircleFill className={status.active_status ? 'text-green-500 text-xs' : 'text-xs text-gray-300'} />{ status.active_status ? 'Active now' : 'Offline' }</span>
              </div>
            )) }
            <button className="group" onClick={() => setShowChatbox(false)}><GrClose className="group-hover:scale-150 transition duration-200 invert"/></button>
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
          <input onKeyPress={(e) => e.key === "Enter" && sendMessage()} onChange={(e) => setMessage(e.target.value)} value={message} className="h-full p-2 w-full outline-none text-sm" type="text" placeholder="Aa" required />
          <IoSend onClick={ sendMessage } className="text-2xl cursor-pointer mr-5 hover:scale-150 transition duration-300" />
        </div>
        {/* Input Area */}
    </div>
  )
}

export default Chatbox