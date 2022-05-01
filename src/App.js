// Dependencies and Hooks
import { Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

// Components for Shop and Dashboard
import NotFound from './Pages/NotFound';

//Page Layout
import ShopLayout from './layouts/ShopLayout';
import DashboardLayout from './layouts/DashboardLayout';

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
import Schedule from './Pages/admin/Schedule';
import Productdetail from './components/dashboard/inventory/Productdetail';

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

import { GlobalContext } from './helper/Context';

// const socket = io.connect("http://localhost:8000/");
const socker = io.connect("https://tulinbikeshop.herokuapp.com/");

const App = () => {

  const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  // Website Loader
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },3000)
  },[]);

  // Sidebar products shop filtering brands
  const [brandChosen,setBrandChosen] = useState('');

  // Set total amount paid for order tracking
  const [totalAmount,setTotalAmount] = useState(0);

  const [customerCookie,setCustomerCookie] = useState(Cookies.get('customerJwt'));
  const [adminCookie,setAdminCookie] = useState(Cookies.get('adminJwt'));
  const [customerId] = useState(Cookies.get('customerId'));
  const imgLocation = "https://tulinbikeshop.herokuapp.com/uploads/products/";
  const imgProfileLocation = "https://tulinbikeshop.herokuapp.com/uploads/profilePics/";

  // show inventory detail on admin
  const [showInventoryDetail,setShowInventoryDetail] = useState(false);
  const [inventoryId,setInventoryId] = useState('');

  // Show order history detail on admin
  const [showOrderDetail,setShowOrderDetail] = useState(false);
  const [historyOrderId,setHistoryOrderId] = useState('');

  // Showing side nav for mobile
  const [showSideNav,setShowSideNav] = useState(false);
  // Clicking chat head
  const [showChatbox,setShowChatbox] = useState(false);

  // Show Alerts and show messages in alert box
  const [alertMssg,setAlertMssg] = useState('');
  const [showAlert,setShowAlert] = useState(false);

  // Closing Modal
  const [showModal,setShowModal] = useState(false);

  // Getting Id for modal
  const [idDetail,setIdDetail] = useState();

  // For Paginations
  const [currentPage,setCurrentPage] = useState(1);
  const [productPerPage] = useState(9);
  const lastIndex = currentPage * productPerPage;
  const startIndex = productPerPage - lastIndex;
  // For changing pages
  const paginate = page => setCurrentPage(page);

  // separate with commas
  const numberFormat = new Intl.NumberFormat('en-US')
  
  return (
    <>
    { loading ? 
    <>
      <div id="loop" className="center"></div>
      <div id="bike-wrapper" className="center">
        <div id="bike" className="centerBike"></div>
      </div>
    </>
    : 
    <>
      <GlobalContext.Provider 
        value={{ customerCookie,setCustomerCookie,adminCookie,setAdminCookie,imgLocation,imgProfileLocation,startIndex,lastIndex,productPerPage,paginate,customerId,
        showModal,setShowModal,idDetail,setIdDetail,showSideNav,setShowSideNav,showChatbox,setShowChatbox,alertMssg,setAlertMssg,showAlert,setShowAlert,
        showInventoryDetail,setShowInventoryDetail,inventoryId,setInventoryId,showOrderDetail,setShowOrderDetail,historyOrderId,setHistoryOrderId,numberFormat,
        brandChosen,setBrandChosen,socket,day,totalAmount,setTotalAmount
      }}
      >
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
            <Route path='/checkout/:id' element={ <Checkout /> } />
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
              <Route path=':id' element={<Productdetail /> } />
            </Route>
            <Route path='/dashboard/settings' element={ <Settings /> } />
            <Route path='/dashboard/schedules' element={ <Schedule /> } />
          </Route>

          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </GlobalContext.Provider>
    </> 
    }
    </>
  );
}

export default App;
