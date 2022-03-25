import { Outlet } from "react-router-dom";

import Navbar from "../shop/partials/Navbar";
import Footer from "../shop/partials/Footer";

const ShopLayout = ({ customerCookie }) => {
  return (
    <main className="h-full">
      <Navbar customerCookie={customerCookie} />
      <Outlet />
      <Footer />
    </main>
  );
};

export default ShopLayout;
