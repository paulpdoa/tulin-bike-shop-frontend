import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const DashboardCard = ({ title,icon,number,sign,color,isLoading }) => {
  
  const { numberFormat } = useContext(GlobalContext);

  return (
    <div className={`${color} text-gray-100 p-10 rounded w-1/2 shadow-2xl mt-10 select-none`}>
        <div className="flex justify-between">
            <h1 className="text-lg">{ title }</h1>
            <span className="text-2xl font-bold">{ icon }</span>
        </div>
        <h2 className="font-bold text-2xl">{ isLoading ? <span className="text-sm text-red-500">Please wait...</span> : <>{sign} {numberFormat.format(number)}</> }</h2>
    </div>
  )
}

export default DashboardCard