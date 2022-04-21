import axios from 'axios';
import { useState,useEffect } from 'react'

const ScheduledCustomer = ({ date: sched }) => {

  const [dates,setDates] = useState('');
  
  // Get date, when date is same with the data in db, show the date of all the same date with different time
  useEffect(() => {
    const abortCont = new AbortController();

    const fetchDates = async() => {
      try {
        const data = await axios.get('/schedule',{ signal:abortCont.signal });
        setDates(data.data);
      }
      catch(err) {
        console.log(err);
      }
     }
     fetchDates();

    return () => abortCont.abort();
  },[])

  return (
    <div className="p-3 h-auto">
        <h1 className="md:text-3xl text-2xl font-semibold text-gray-800">Available Schedules</h1>
        { dates && dates.filter(date => date.reserved_date === sched).map(date => (
          <div className="bg-gray-50 shadow-2xl p-2 mt-2 rounded-md border border-gray-200">
            <div className="flex items-center gap-2">
              <h2>{ console.log(date.reserved_time)  }</h2>
              <span className="text-green-500">Vacant</span>
            </div>
          </div>
        )) }
       
    </div>
  )
}

export default ScheduledCustomer