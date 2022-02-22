// Dependencies and Hooks
import { Route, Routes } from 'react-router-dom';
import { useState,createContext } from 'react';
import Cookies from 'js-cookie';

// Components for Shop and Dashboard
import NotFound from './Pages/NotFound';

//Page Layout
import ShopLayout from './components/layouts/ShopLayout';
import DashboardLayout from './components/layouts/DashboardLayout';

// Admin Page
import AdminLogin from './Pages/admin/auth/AdminLogin';
import AdminSignup from './Pages/admin/auth/AdminSignup';
import Dashboard from './Pages/admin/Dashboard';
import DashboardOrders from './Pages/admin/DashboardOrders';
import DashboardSales from './Pages/admin/DashboardSales';
import DashboardMessages from './Pages/admin/DashboardMessages';
import Inventory from './Pages/admin/Inventory';
import Bikes from './components/dashboard/inventory/Bikes';
import Parts from './components/dashboard/inventory/Parts';
import Accessories from './components/dashboard/inventory/Accessories';
import AddProduct from './Pages/admin/AddProduct';
import Settings from './Pages/admin/Settings';

// Shop Page
import Login from './Pages/shop/auth/Login';
import Signup from './Pages/shop/auth/Signup';
import VerifyCode from './Pages/shop/auth/VerifyCode';
import ForgotPassword from './Pages/shop/auth/ForgotPassword';
import Home from './Pages/shop/Home';
import About from './Pages/shop/About';
import Contact from './Pages/shop/Contact';
import Cart from './Pages/shop/Cart';
import Products from './Pages/shop/Products';
import ShopBike from './components/shop/products/ShopBike';
import ShopPart from './components/shop/products/ShopPart';
import ShopAccessories from './components/shop/products/ShopAccessories';
import Profile from './Pages/shop/Profile';
import ProfileDetail from './components/shop/profile/ProfileDetail';
import ProfileOrders from './components/shop/profile/ProfileOrders';
import OrderHistory from './components/shop/profile/OrderHistory';
import ProfileDelete from './components/shop/profile/ProfileDelete';
import Customization from './Pages/shop/Customization';
import Reservation from './Pages/shop/Reservation';
import ResetPassword from './Pages/shop/auth/ResetPassword';
import Checkout from './Pages/shop/Checkout';
import ProductDetail from './Pages/shop/ProductDetail';

import {GlobalContext} from './helper/Context';

const App = () => {

  const [customerCookie,setCustomerCookie] = useState(Cookies.get('customerJwt'));
  const [adminCookie,setAdminCookie] = useState(Cookies.get('adminJwt'));
    
  
  return (
    <GlobalContext.Provider value={{ customerCookie,setCustomerCookie,adminCookie,setAdminCookie }}>
      <Routes>
        <Route path='/adminlogin' element={ <AdminLogin setAdminCookie={setAdminCookie} /> } />
        <Route path='/adminsignup' element={ <AdminSignup /> } />

        <Route path='/login' element={ <Login setCustomerCookie={setCustomerCookie} /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/verify/:id' element={ <VerifyCode /> } />
        <Route path='/forgotpassword' element={ <ForgotPassword /> } />
        <Route path='/resetpassword/:id' element={ <ResetPassword /> } />

        {/* Client Page */}

        <Route element={ <ShopLayout customerCookie={customerCookie} /> }>
          <Route path='/' element={ <Home /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/contact' element={ <Contact /> } />
          <Route path='/cart/:id' element={ <Cart /> } />
          <Route path='/products/' element={ <Products /> }>
            <Route path='bikes' element={ <ShopBike /> } />
            <Route path='parts' element={ <ShopPart /> } />
            <Route path='accessories' element={ <ShopAccessories /> } />
          </Route>
          <Route path='/products/:id' element={ <ProductDetail /> } />
          <Route path='/profile/' element={ <Profile /> }>
            <Route path=":id" element={ <ProfileDetail /> } />
            <Route path="orders/:id" element={ <ProfileOrders /> } />
            <Route path="history/:id" element={ <OrderHistory /> } />
            <Route path="delete/:id" element={ <ProfileDelete /> } />
          </Route>
          <Route path='/reservation' element={ <Reservation /> } />
          <Route path='/customize' element={ <Customization /> } />
          <Route path='/checkout' element={ <Checkout /> } />
        </Route>

        {/* Admin Page */}
        <Route element={ <DashboardLayout adminCookie={adminCookie} /> }>
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/dashboard/orders' element={ <DashboardOrders /> } />
          <Route path='/dashboard/sales' element={ <DashboardSales /> } />
          <Route path='/dashboard/messages' element={ <DashboardMessages /> } />
          <Route path='/dashboard/addproduct' element={ <AddProduct /> } />
          <Route path='/dashboard/inventory/' element={ <Inventory /> }>
            <Route path='bikes' element={ <Bikes /> } />
            <Route path='parts' element={ <Parts /> } />
            <Route path='accessories' element={ <Accessories /> } />
          </Route>
          <Route path='/dashboard/settings' element={ <Settings /> } />
        </Route>

        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
