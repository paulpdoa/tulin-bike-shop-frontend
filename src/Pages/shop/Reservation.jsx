import { Helmet } from 'react-helmet';
import Calendar from '../../components/shop/scheduling/Calendar';
import DateInput from '../../components/shop/scheduling/DateInput';
const Reservation = () => {
  return (
      <>
          <Helmet><title>Tulin Bicycle Shop | Schedule</title></Helmet>
          <div className="content">
            <div className="max-content p-20 w-full flex flex-col h-screen justify-center">
              <h1 className="text-4xl text-gray-800 font-semibold uppercase">SELECT YOUR SCHEDULE</h1>
              <div className=" grid grid-cols-2 justify-items-center mt-10">
                <Calendar />
                <DateInput />
              </div>
            </div>
          </div>
      </>
     
  );
};

export default Reservation;
