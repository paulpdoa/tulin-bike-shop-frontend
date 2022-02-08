import { Helmet } from 'react-helmet';

const Dashboard = () => {
  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Dashboard</title></Helmet>
      <div className="p-20">
        <h1 className="font-semibold text-4xl text-gray-800 uppercase">Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
