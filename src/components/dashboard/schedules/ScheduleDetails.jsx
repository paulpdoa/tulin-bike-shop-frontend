import { AiOutlineCloseCircle,AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useEffect,useState } from 'react';
import { putData } from '../../../helper/fetching';
import { baseUrl } from '../../../helper/baseUrl';

const ScheduleDetails = ({ setShowDetail,getDetail }) => {
   
    const imgLocation = 'https://tulinbikeshop.herokuapp.com/uploads/schedule/'
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        },1000)
    },[]);

    const approveSchedule = (id) => {
        putData(`${baseUrl()}/schedule/${id}`,{schedule_status : 'approved'});
        setShowDetail(false);
    }

  return (
    <>
      { isLoading ? 
       <div className="absolute w-full top-0 left-0 h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <h1 className="font-bold text-gray-100 flex items-center text-2xl gap-5"><AiOutlineLoading3Quarters className="animate-spin"/>Please wait...</h1>
       </div>
       : 
        <div className="absolute w-full top-0 left-0 h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-100 rounded shadow-2xl w-1/2 h-auto p-5 relative">
                <AiOutlineCloseCircle className="absolute right-3 top-3 text-2xl cursor-pointer font-semibold" onClick={() => setShowDetail(false)} />
                <h1 className="text-gray-800 font-semibold text-3xl">Schedule Details</h1>
                <div>
                    <h2 className="text-gray-800 text-lg">{ getDetail.customer_id.firstname } { getDetail.customer_id.lastname }</h2>
                    <h2 className="text-gray-800 text-lg">{ getDetail.customer_id.email }</h2>

                    <div className="flex items-center gap-5 mt-5">
                        <div className="flex items-center flex-col">
                            <h1 className=" text-gray-800 font-semibold text-lg">Concern:</h1>
                            <p>{ getDetail.customer_concern }</p>
                        </div>
                        <div className="flex items-center flex-col">
                            <h2>{ getDetail.reserved_date }</h2>
                            <h2>{ getDetail.reserved_time }</h2>
                        </div>
                        <div className="flex items-center">
                            { getDetail.schedule_status === 'pending' && <button onClick={() => approveSchedule(getDetail._id)} className="bg-green-500 text-gray-100 rounded p-3">Approve Schedule</button> }
                        </div>
                    </div>
                </div>
                <div className="px-5 py-6 flex justify-center">
                    <img className="w-52 h-52 object-cover" src={`${imgLocation}${getDetail.concern_image}`} alt={getDetail.customer_concern} />
                </div>
            </div>
        </div>
       }  
    </>
  )
}

export default ScheduleDetails