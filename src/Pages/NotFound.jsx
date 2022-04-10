import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="content select-none">
    <Helmet><title>Sorry, this page is unavailable :(</title></Helmet>
        <div className="max-content h-screen flex flex-col-reverse md:flex-row items-center justify-center">
            <div className="md:w-1/3 w-4/5">
              <h1 className="font-bold md:error-title text-9xl">404</h1>
              <h2 className="md:text-2xl text-xl font-normal">Sorry, the page was not found</h2>
              <button className="error-button" onClick={() => navigate(-1)} to='/'>Go back</button>
            </div>
            <img className="object-cover md:w-96 w-52" src="/image/404.png" alt="404 logo" />
        </div>
    </div>
  );
};

export default NotFound;
