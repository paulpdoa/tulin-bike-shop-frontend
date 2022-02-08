import { Outlet } from "react-router-dom";

import Navbar from "../shop/partials/Navbar";
import Footer from "../shop/partials/Footer";

const ShopLayout = ({ customerCookie }) => {
  return (
    <>
      <Navbar customerCookie={customerCookie} />
      <Outlet />
      <Footer />
    </>
  );
};

export default ShopLayout;
