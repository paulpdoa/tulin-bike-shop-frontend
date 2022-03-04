import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ScheduleTable from "../../components/dashboard/schedules/ScheduleTable";
import Datetime from "../../components/dashboard/partials/Datetime"
import ScheduleDetails from '../../components/dashboard/schedules/ScheduleDetails';

const Schedule = () => {

  const [showDetail,setShowDetail] = useState(false);
  const [getDetail,setGetDetail] = useState([]);

  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Schedule</title></Helmet>
      <div className="p-20 relative">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Schedules</h1>
          <Datetime />
        </div>
        <ScheduleTable setShowDetail={setShowDetail} setGetDetail={setGetDetail} />
        { showDetail && <ScheduleDetails setShowDetail={setShowDetail} showDetail={showDetail} getDetail={getDetail} /> }
      </div>
    </>
  )
}

export default Schedule