import { Helmet } from 'react-helmet';

const DashboardMessages = () => {
  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Messages</title></Helmet>
      <div className="p-20">
        <h1 className="font-semibold text-4xl text-gray-800 uppercase">Messages</h1>
      </div>
    </>
  );
};

export default DashboardMessages;
