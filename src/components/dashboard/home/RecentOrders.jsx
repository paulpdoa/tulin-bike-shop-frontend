import { fetchData } from '../../../helper/fetching';
import { useEffect,useState } from 'react';

const RecentOrders = () => {

  const [recentOrders,setRecentOrders] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();
    fetchData({signal:abortCont.signal},'/neworders',setRecentOrders,setIsLoading);
    return () => abortCont.abort();
  },[recentOrders])

  return (
    <div className="col-span-2 bg-gray-100 p-10 shadow-lg rounded h-full overflow-y-scroll">
        <h1 className="text-2xl uppercase font-semibold text-gray-800">Recent Orders</h1>
        <section className="flex flex-col gap-5 text-gray-800 mt-5">
            { isLoading && <h2>Please wait...</h2> }
            { recentOrders.length < 1 ? <h2 className="text-lg animate-pulse text-gray-800">No orders yet...</h2> : 
              recentOrders.map((recent) => (
              recent.cart_id.map((orders) => (
                <span key={orders._id}>{ `${orders.inventory_id.brand_name} - ${orders.inventory_id.product_name}` }</span>
              ))
            )) }
        </section>
    </div>
  )
}

export default RecentOrders