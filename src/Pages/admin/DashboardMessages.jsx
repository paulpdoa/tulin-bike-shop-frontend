import { Helmet } from 'react-helmet';
import { useEffect,useState } from 'react';
import axios from 'axios';

import Conversation from '../../components/dashboard/messages/Conversation';
import Messages from '../../components/dashboard/messages/Messages';
import Sender from '../../components/dashboard/messages/Sender';
import Datetime from '../../components/dashboard/partials/Datetime';

const DashboardMessages = () => {

  const [senders,setSenders] = useState([]);
  const [senderId,setSenderId] = useState('');
  const [senderName,setSenderName] = useState('');
  const [profileImg,setProfileImg] = useState('');
  const [senderEmail,setSenderEmail] = useState('');

  // For getting the id of the user and displaying the senders
  useEffect(() => {
    const abortCont = new AbortController();

    axios.get('/chat',{ signal:abortCont.signal })
    .then((data) => {
        const senders = data.data.map(user => user.sender); 
        const uniqueSender = Array.from(new Set(senders.map(JSON.stringify))).map(JSON.parse); //Set unique senders
        setSenders(uniqueSender);
    });

    return () => abortCont.abort();
  },[senders]);

  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Messages</title></Helmet>
      <div className="p-20 h-screen">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Messages</h1>
          <Datetime />
        </div>
        <div className="flex justify-around bg-gray-50 rounded shadow-2xl p-2 h-full">
          <Messages senders={senders} setSenderName={setSenderName} setProfileImg={setProfileImg} setSenderEmail={setSenderEmail} setSenderId={setSenderId} />
          <Conversation senderName={senderName} profileImg={profileImg} senderId={senderId} />
          <Sender senderName={senderName} senderEmail={senderEmail} profileImg={profileImg} />
        </div>
      </div>
    </>
  );
};

export default DashboardMessages;
