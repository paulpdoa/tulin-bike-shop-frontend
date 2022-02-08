import { useNavigate, Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from 'react';

import AdminNavbar from "../dashboard/partials/AdminNavbar";
import Sidebar from "../dashboard/partials/Sidebar";

const DashboardLayout = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!Cookies.get('adminJwt')) {
      navigate('/adminlogin')
    }
  })

  return (
    <div className="grid grid-cols-5">
      <Sidebar />
      <div className="col-span-4 content">
        <div className="max-content">
            <AdminNavbar />
            <Outlet />
        </div>
      </div>
    </div>
  )
};

export default DashboardLayout;
