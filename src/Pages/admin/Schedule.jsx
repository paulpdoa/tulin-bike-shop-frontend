import Datetime from "../../components/dashboard/partials/Datetime"
import { Helmet } from 'react-helmet';
import ScheduleTable from "../../components/dashboard/schedules/ScheduleTable";

const Schedule = () => {
  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Schedule</title></Helmet>
      <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Schedules</h1>
          <Datetime />
        </div>
        <ScheduleTable />
      </div>
    </>
  )
}

export default Schedule