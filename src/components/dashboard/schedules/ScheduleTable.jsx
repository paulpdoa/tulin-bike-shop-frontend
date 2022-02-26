import axios from 'axios';
import { useState,useEffect } from 'react';

const ScheduleTable = () => {

    const [details,setDetails] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        
        const fetchData = async () => {
           try {
            const data = await axios.get('/schedule',{ signal:abortCont.signal });
            setDetails(data.data);
           }
           catch(err) {
               console.log(err);
           }
        }
        fetchData();

        return () => abortCont.abort();
    },[details])

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
                    <th>Details</th>
                </tr>
               { details && details.map((detail) => (
                <tr className="border-b-2 border-gray-300 h-12" key={detail._id}>
                    <td>{detail.customer_id.firstname} {detail.customer_id.lastname}</td>
                    <td>{detail.customer_id.email}</td>
                    <td>{detail.reserved_date}</td>
                    <td>{detail.reserved_time}</td>
                    <td>{detail.schedule_status}</td>
                    <td>
                        <button onClick={() => console.log('view details')} className="bg-gray-900 text-gray-100 p-2 rounded">View Details</button>
                    </td>
                </tr>
               )) }
            </tbody>
        </table>
    </div>
  )
}

export default ScheduleTable