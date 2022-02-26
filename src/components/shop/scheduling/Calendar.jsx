import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = ({date,setDate}) => {
    
  return <ReactCalendar value={new Date(date)} onClickDay={() => setDate(new Date(date))} />
}

export default Calendar