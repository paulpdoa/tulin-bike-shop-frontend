import { Helmet } from 'react-helmet';
import Conversation from '../../components/dashboard/messages/Conversation';
import Messages from '../../components/dashboard/messages/Messages';
import Sender from '../../components/dashboard/messages/Sender';
import Datetime from '../../components/dashboard/partials/Datetime';

const DashboardMessages = () => {
  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Messages</title></Helmet>
      <div className="p-20 h-screen">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Messages</h1>
          <Datetime />
        </div>
        <div className="flex justify-around bg-gray-50 rounded shadow-2xl p-2 h-full">
          <Messages />
          <Conversation />
          <Sender />
        </div>
      </div>
    </>
  );
};

export default DashboardMessages;
