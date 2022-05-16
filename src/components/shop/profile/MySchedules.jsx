import axios from 'axios';
import { useEffect,useState,useContext } from 'react';
import { baseUrl } from '../../../helper/baseUrl';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { GlobalContext } from '../../../helper/Context';

const MySchedules = () => {

    const { setShowAlert,setAlertMssg } = useContext(GlobalContext);

    const [schedules,setSchedules] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchSchedule = async() => {
            try {
                const data = await axios.get(`${baseUrl()}/schedule`,{ signal:abortCont.signal });
                const customerScheds = data.data.filter(sched => sched.customer_id._id === id);
                setSchedules(customerScheds);
            }
            catch(err) {
                console.log(err);
            }   
        }
        fetchSchedule();

        return () => abortCont.abort();
    },[schedules]);

    const cancelSchedule = async(id) => {
        try {
            const data = await axios.delete(`${baseUrl()}/schedule/${id}`);
            setAlertMssg(data.data.mssg);
            setShowAlert(true);
        }
        catch(err) {
            console.log(err);
        }
    }

  return (
    <div className="md:p-20 p-10 md:h-screen md:col-span-2 col-span-3 md:mt-0 -mt-10 relative">
        <div className="md:bg-gray-900 bg-gray-100 shadow-2xl md:shadow-none w-full h-4/5 md:text-gray-100 text-gray-800 rounded-md p-10 overflow-y-scroll">
            <h1 className="font-semibold md:text-4xl text-3xl py-1 border-b border-gray-300">My Schedules</h1>
            { schedules && schedules.map(schedule => (
                <div key={schedule._id} className="border-b-2 border-gray-300 p-2 flex justify-between">
                    <div className="flex flex-col">
                        <h1 className="font-semibold">{ moment(schedule.reserved_date).format('MMMM Do YYYY') }</h1>
                        <h2>{ schedule.reserved_time }</h2>
                        <h1 className={ schedule.schedule_status !== 'approved' ? 'text-yellow-500' : 'text-green-500' }>{ schedule.schedule_status }</h1>
                        <p className="text-sm">{ schedule.customer_concern }</p>
                    </div>
                    <button onClick={() => cancelSchedule(schedule._id)} className="bg-red-500 text-gray-100 rounded p-2">Delete Schedule</button>
                </div>
            )) }
        </div>
    </div>
  )
}

export default MySchedules