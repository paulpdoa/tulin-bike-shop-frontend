import { Outlet } from "react-router-dom";

import Navbar from "../shop/partials/Navbar";
import Footer from "../shop/partials/Footer";
import MobileNavbar from "../shop/partials/MobileNavbar";

const ShopLayout = ({ customerCookie }) => {
  return (
    <main className="h-full">
      <Navbar customerCookie={customerCookie} />
      <MobileNavbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default ShopLayout;
