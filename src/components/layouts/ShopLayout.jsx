import { Outlet } from "react-router-dom";

import Navbar from "../shop/partials/Navbar";
import Footer from "../shop/partials/Footer";
import MobileSideNav from "../shop/partials/MobileSideNav";
import MobileNav from "../shop/partials/MobileNav";

const ShopLayout = ({ customerCookie }) => {
  return (
    <main className="h-full">
      <Navbar customerCookie={customerCookie} />
      {/* For navbars of mobile view */}
      <MobileNav />
      <MobileSideNav />
      {/* Navbars  of mobile view */}
      <Outlet />
      <Footer />
    </main>
  );
};

export default ShopLayout;
