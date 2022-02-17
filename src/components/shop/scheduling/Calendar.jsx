import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const Calendar = () => {

    const [date,setDate] = useState(new Date());

  return (
    <ReactCalendar activeStartDate={date} value={date} />
  )
}

export default Calendar