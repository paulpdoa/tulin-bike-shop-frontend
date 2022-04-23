import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = ({setDate}) => {
      
  return <ReactCalendar 
  // minDate={new Date()} 
  value={new Date()} 
  onChange={(e) => {
    const fixedDate = e.getDate() < 10 ? 0 + '' + e.getDate() : e.getDate();
    const fixedMonth = e.getMonth() < 10 ? 0 + '' + Number(e.getMonth() + 1) : Number(e.getMonth() + 1);
    setDate(e.getFullYear() + '-' + fixedMonth + '-' + fixedDate)
  } } />
}

export default Calendar