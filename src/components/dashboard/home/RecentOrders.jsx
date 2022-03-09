import { fetchData } from '../../../helper/fetching';
import { useEffect,useState } from 'react';

const RecentOrders = () => {

  const [recentOrders,setRecentOrders] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    fetchData({signal:abortCont.signal},'/neworders',setRecentOrders);
    return () => abortCont.abort();
  },[recentOrders])

  return (
    <div className="col-span-2 bg-gray-100 p-10 shadow-lg rounded h-full overflow-y-scroll">
        <h1 className="text-2xl uppercase font-semibold text-gray-800">Recent Orders</h1>
        <section className="flex flex-col gap-5 text-gray-800 mt-5">
            { recentOrders && recentOrders.map((recent) => (
              recent.cart_id.map((orders) => (
                <span key={orders._id}>{ `${orders.inventory_id.brand_name} - ${orders.inventory_id.product_name}` }</span>
              ))
            )) }
        </section>
    </div>
  )
}

export default RecentOrders