import { Helmet } from 'react-helmet';
import Datetime from '../../components/dashboard/partials/Datetime';

const DashboardMessages = () => {
  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Messages</title></Helmet>
      <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Messages</h1>
          <Datetime />
        </div>
      </div>
    </>
  );
};

export default DashboardMessages;
