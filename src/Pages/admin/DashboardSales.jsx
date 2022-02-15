import { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Datetime from '../../components/dashboard/partials/Datetime';
import LineChart from '../../components/dashboard/sales/LineChart';

// dasdasda
const DashboardSales = () => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const data = [
    {
      id:1,
      price:800,
      year: 2021
    },
    {
      id:2,
      price:200,
      year: 2022
    },
    {
      id:3,
      price:600,
      year: 2023
    }
  ];

  const [line,setLine] = useState({
    labels: months.map(month => month),
    datasets: [{
      label: "Total Sales",
      data: data.map(year => year.price),
      backgroundColor: ["red","blue","green"],
      borderColor: ["black"],
      borderWidth: 2
    }]
  });
  console.log(data)

  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Sales</title></Helmet>
      <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Sales</h1>
          <Datetime />
        </div>
        
        <div className="mt-10 shadow-lg p-10">
          <LineChart chartData={line} /> 
        </div>
      </div>
    </>
  );
};

export default DashboardSales;
