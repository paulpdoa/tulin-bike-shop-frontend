import axios from 'axios';
import { useState,useEffect } from 'react'

const ScheduledCustomer = ({ date: sched }) => {

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const [dates,setDates] = useState([]);
  
  // Get date, when date is same with the data in db, show the date of all the same date with different time
  useEffect(() => {
    const abortCont = new AbortController();

    const fetchDates = async() => {
      try {
        const data = await axios.get('/schedule',{ signal:abortCont.signal });
        setDates(data.data);
      }
      catch(err) {
        const mute = err;
      }
     }
     fetchDates();

    return () => abortCont.abort();
  },[dates])

  return (
    <div className="p-3 md:h-auto h-max">
        <h1 className="md:text-3xl text-2xl font-semibold text-gray-800">Available Schedules</h1>
        <h2>Schedule for: { months[new Date(sched).getMonth()] + ' ' + new Date(sched).getDate() + ', ' + new Date(sched).getFullYear() }</h2>
        { dates && dates.filter(date => date.reserved_date === sched).map(date => (
          <div className="bg-gray-50 shadow-2xl p-2 mt-2 rounded-md border border-gray-200" key={date._id}>
            <div className="flex items-center gap-2">
              <h2>{ date.reserved_time }</h2>
              <span className="text-green-500">{ date.customer_id.firstname } { date.customer_id.lastname }</span>
            </div>
          </div>
        )) }
       
    </div>
  )
}

export default ScheduledCustomer