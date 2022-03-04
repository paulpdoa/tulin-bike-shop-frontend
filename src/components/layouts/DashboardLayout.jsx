import { Outlet,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect,useState } from 'react';

import AdminNavbar from "../dashboard/partials/AdminNavbar";
import Sidebar from "../dashboard/partials/Sidebar";

const DashboardLayout = ({ adminCookie }) => {

  const [isAuth,setIsAuth] = useState(false);

  // To protect dashboard routes
  const navigate = useNavigate();
  useEffect(() => {
    const abortCont = new AbortController();

    axios.get('/dashboard',{ signal:abortCont.signal })
    .then((data) => {
      if(data.data.isAuth === false) {
        navigate(data.data.redirect);
        setIsAuth(data.data.isAuth)
      } else {
        setIsAuth(data.data.isAuth)
      }
    })
    .catch(err => {
      console.log(err);
    })
    return () => abortCont.abort();
    
  },[isAuth,navigate])

  return (
    <>
      <Sidebar adminCookie={adminCookie} />
      <div className="content ml-72">
        <div className="max-content w-full">
            <AdminNavbar />
            { isAuth ? <Outlet /> : <h1>Verifying User</h1> }
        </div>
      </div>
    </>
  )
};

export default DashboardLayout;
