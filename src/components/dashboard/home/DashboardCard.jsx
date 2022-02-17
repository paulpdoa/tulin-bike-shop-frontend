import React from 'react'

const DashboardCard = ({ title,icon,number,sign,color }) => {
  return (
    <div className={`${color} text-gray-100 p-10 rounded w-1/2 shadow-2xl mt-10 select-none`}>
        <div className="flex justify-between">
            <h1 className="text-lg">{ title }</h1>
            <span className="text-2xl font-bold">{ icon }</span>
        </div>
        <h2 className="font-bold text-2xl">{sign} { Number(number.toLocaleString()) }</h2>
    </div>
  )
}

export default DashboardCard