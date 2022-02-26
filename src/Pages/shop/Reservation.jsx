import { Helmet } from 'react-helmet';
import { useState } from 'react'; 
import Calendar from '../../components/shop/scheduling/Calendar';
import DateInput from '../../components/shop/scheduling/DateInput';

const Reservation = () => {

    const d = new Date();
    const today = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? (0 + '' + (d.getMonth() + 1)) : (d.getMonth() + 1) ) + '-' + d.getDate();
    const [date,setDate] = useState(today);
    const hour = d.getHours();
    const minute = d.getMinutes();

  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | Schedule</title></Helmet>
          <div className="content">
            <div className="max-content p-20 w-full flex flex-col h-screen justify-center">
              <h1 className="text-4xl text-gray-800 font-semibold uppercase">SELECT YOUR SCHEDULE</h1>
              <div className=" grid grid-cols-2 justify-items-center mt-10">
                <Calendar date={date} setDate={setDate} />
                <DateInput today={date} setToday={setDate} hour={hour} minute={minute} />
              </div>
            </div>
          </div>
      </>
     
  );
};

export default Reservation;
