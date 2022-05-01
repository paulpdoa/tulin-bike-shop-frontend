import { useState,useEffect } from 'react';
import { fetchData } from '../../../helper/fetching';
import { baseUrl } from '../../../helper/baseUrl';
const ScheduleTable = ({ setShowDetail,setGetDetail }) => {

    const [details,setDetails] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    // All schedules
    useEffect(() => {
        const abortCont = new AbortController();

        fetchData({ signal:abortCont.signal },`${baseUrl()}/schedule`,setDetails,setIsLoading);

        return () => abortCont.abort();
    },[details])
    // Schedule detail for each customer
    const viewDetail = (id) => {
        const abortCont = new AbortController();
        setShowDetail(true);
        fetchData({ signal:abortCont.signal },`${baseUrl()}/schedule/${id}`,setGetDetail,setIsLoading);
       
        return () => abortCont.abort();
    }

  return (
    <div className="h-96 mt-5 overflow-y-scroll">
        <table className="w-full table-auto">
            <tbody className="w-full text-center">
                <tr className="bg-gray-200 text-gray-800 h-10">
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                { details.length < 1 ? 
               <tr className="w-full h-52">
                { isLoading && <td>Please wait...</td>}
                <td colSpan={6} className="font-semibold text-gray-800 text-4xl animate-pulse">No schedules yet...</td>
               </tr>  : 
               details.map((detail) => (
                <tr className="border-b-2 border-gray-300 h-12" key={detail._id}>
                    <td>{detail.customer_id.firstname} {detail.customer_id.lastname}</td>
                    <td>{detail.customer_id.email}</td>
                    <td>{detail.reserved_date}</td>
                    <td>{detail.reserved_time}</td>
                    <td className={detail.schedule_status === 'pending' ? 'text-yellow-500 font-semibold' : 'text-green-500 font-semibold'}>{detail.schedule_status}</td>
                    <td>
                        <button onClick={() => viewDetail(detail._id)} className="bg-gray-900 text-gray-100 p-2 rounded">View Details</button>
                    </td>
                </tr>
               )) }
            </tbody>
        </table>
    </div>
  )
}

export default ScheduleTable