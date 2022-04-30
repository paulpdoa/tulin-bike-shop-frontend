import { Helmet } from 'react-helmet';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Calendar from '../../components/shop/scheduling/Calendar';
import DateInput from '../../components/shop/scheduling/DateInput';
import ScheduledCustomer from '../../components/shop/scheduling/ScheduledCustomer';

const Reservation = () => {

    const d = new Date();
    const hour = d.getHours() < 10 ? 0 + '' + d.getHours() : d.getHours();
    const minute = d.getMinutes() < 10 ? 0 + '' + d.getMinutes() : d.getMinutes();
    const fixedDate = d.getDate() < 10 ? 0 + '' + d.getDate() : d.getDate();
    const fixedMonth = d.getMonth() < 10 ? 0 + '' + Number(d.getMonth() + 1) : Number(d.getMonth() + 1);
    
    const [isAuth,setIsAuth] = useState(false);
    const [date,setDate] = useState(d.getFullYear() + '-' + fixedMonth + '-' + fixedDate);

    const navigate = useNavigate();
    useEffect(() => {
      const abortCont = new AbortController();
      
      axios.get('/reservation',{ signal:abortCont.signal })
      .then((data) => {
        setIsAuth(data.data.isAuth);
        navigate(data.data.redirect);
      })
      .catch(err => {
        const mute = err;
      }) 

      return () => abortCont.abort();
    },[isAuth,navigate])
    
  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | Schedule</title></Helmet>
          <div className="content">
            <div className="max-content p-20 w-full flex flex-col h-full justify-center">
              <h1 className="md:text-4xl text-3xl text-gray-800 font-semibold uppercase">SELECT YOUR SCHEDULE</h1>
              <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-2 grid-rows-3 justify-items-center mt-10 h-full">
                <Calendar date={date} setDate={setDate} />
                <ScheduledCustomer date={date} />
                <DateInput today={date} setToday={setDate} hour={hour} minute={minute} />
              </div>
            </div>
          </div>
      </>
     
  );
};

export default Reservation;
