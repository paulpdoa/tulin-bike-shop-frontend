import { Outlet } from "react-router-dom";

import Navbar from "../components/shop/partials/Navbar";
import Footer from "../components/shop/partials/Footer";
import MobileSideNav from "../components/shop/partials/MobileSideNav";
import MobileNav from "../components/shop/partials/MobileNav";
import Chathead from "../components/modals/Chathead";
import Chatbox from "../components/modals/Chatbox";
import { useContext } from 'react';
import { GlobalContext } from "../helper/Context";
import Alert from "../components/modals/Alert";


const ShopLayout = ({ customerCookie }) => {

  const { showSideNav,showChatbox,showAlert } = useContext(GlobalContext);

  return (
    <main className="h-full relative">
      <Navbar customerCookie={customerCookie} />
      {/* For navbars of mobile view */}
      <MobileNav />
      { showSideNav && <MobileSideNav /> }
      {/* Navbars  of mobile view */}
      <Outlet />
      <Footer />
      {/* Chathead to have a converstion with admin */}
      { customerCookie !== undefined && 
        <>
          { showChatbox ? <Chatbox /> : <Chathead /> }
        </> 
      }
      { showAlert && <Alert /> }
    </main>
  );
};

export default ShopLayout;
