import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="content select-none">
    <Helmet><title>Sorry, this page is unavailable :(</title></Helmet>
        <div className="max-content h-screen flex items-center justify-center">
            <div className="w-1/3">
              <h1 className="font-bold error-title">404</h1>
              <h2 className="text-2xl font-normal">Sorry, the page was not found</h2>
              <button className="error-button" onClick={() => navigate(-1)} to='/'>Go back</button>
            </div>
            <img className="object-cover w-96" src="/image/404.png" alt="404 logo" />
        </div>
    </div>
  );
};

export default NotFound;
