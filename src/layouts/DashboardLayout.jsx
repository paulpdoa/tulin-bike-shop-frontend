import { Outlet,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect,useState,useContext} from 'react';
import { GlobalContext } from "../helper/Context";
import { baseUrl } from "../helper/baseUrl";
import AdminNavbar from "../components/dashboard/partials/AdminNavbar";
import Sidebar from "../components/dashboard/partials/Sidebar";
import Alert from "../components/modals/admin/Alert";

const DashboardLayout = ({ adminCookie }) => {

  const { showAlert } = useContext(GlobalContext);

  const [isAuth,setIsAuth] = useState(false);
  const [showSidebar,setShowSidebar] = useState(true);

  // To protect dashboard routes
  const navigate = useNavigate();
  useEffect(() => {
    const abortCont = new AbortController();

    axios.get(`${baseUrl()}/dashboard`,{ signal:abortCont.signal })
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
    <main>
      <Sidebar adminCookie={adminCookie} showSidebar={showSidebar} />
      <div className={`content ${!showSidebar ? 'ml-0' : 'ml-72'}`}>
        <div className={`w-full relative ${showSidebar ? 'max-content' : ''}`}>
            <AdminNavbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            { isAuth ? <Outlet /> : <h1>Verifying User</h1> }
        </div>
      </div>
      { showAlert && <Alert /> }
    </main>
  )
};

export default DashboardLayout;
