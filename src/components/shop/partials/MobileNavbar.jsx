
const MobileNavbar = () => {
  return (
    <nav className="md:hidden bg-black fixed bottom-0 w-full h-14 flex items-center">
        <ul className="flex items-center justify-around w-full p-2 text-gray-200 text-xs">
            <li className="flex flex-col justify-center items-center">
                <img className="w-7 h-7 object-cover" src="/image/icons/Home.png" alt="home" />
                <span>Home</span>
            </li>
            <li className="flex flex-col justify-center items-center">
                <img className="w-7 h-7 object-cover" src="/image/icons/schedule.png" alt="schedule" />
                <span>Schedule</span>
            </li>
            <li className="flex flex-col justify-center items-center bg-black w-16 h-16 border-4 border-gray-100 rounded-full transform -translate-y-6">
                <img className="w-7 h-7 object-cover" src="/image/icons/cart.png" alt="cart" />
                <span>Cart</span>
            </li>
            <li className="flex flex-col justify-center items-center">
                <img className="w-7 h-7 object-cover" src="/image/icons/bag.png" alt="bag" />
                <span>Shop</span>
            </li>
            <li className="flex flex-col justify-center items-center">
                <img className="w-7 h-7 object-cover" src="/image/icons/payment.png" alt="payment" />
                <span>Payment</span>
            </li>
        </ul>
    </nav>
  )
}

export default MobileNavbar