import { Outlet } from "react-router-dom";

import Navbar from "../shop/partials/Navbar";
import Footer from "../shop/partials/Footer";
import MobileSideNav from "../shop/partials/MobileSideNav";
import MobileNav from "../shop/partials/MobileNav";
import Chathead from "../modals/Chathead";
import Chatbox from "../modals/Chatbox";
import {useContext} from 'react';
import { GlobalContext } from "../../helper/Context";
import Alert from "../modals/Alert";


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
      { showChatbox ? <Chatbox /> : <Chathead /> }
      { showAlert && <Alert /> }
    </main>
  );
};

export default ShopLayout;
