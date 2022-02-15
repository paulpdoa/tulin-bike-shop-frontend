import { useNavigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from 'react';

import AdminNavbar from "../dashboard/partials/AdminNavbar";
import Sidebar from "../dashboard/partials/Sidebar";

const DashboardLayout = ({ adminCookie }) => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!Cookies.get('adminJwt')) {
      navigate('/adminlogin')
    }
  })

  return (
    <>
      <Sidebar adminCookie={adminCookie} />
      <div className="content ml-72">
        <div className="max-content w-full">
            <AdminNavbar />
            <Outlet />
        </div>
      </div>
    </>
  )
};

export default DashboardLayout;
