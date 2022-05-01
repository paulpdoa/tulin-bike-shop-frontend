import { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Datetime from '../../components/dashboard/partials/Datetime';
import LineChart from '../../components/dashboard/sales/LineChart';
import moment from 'moment';

const DashboardSales = () => {
  // Create a code that filters total sales per month 
  // Ex. April = 500,000php
  // Filter this month === month to show sales for that month

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const [chartData,setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: "Monthly Sales",
        data: []
      }
    ]
  });

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchSales = async () => {
      try {
        const data = await axios.get('/ordereditem', {signal:abortCont.signal});
        // First is to get Month equal to all months variable
        const filterMonthSale = data.data.filter((month) => {
          for(let i = 0; i < months.length; i++) {
            if(moment(month.createdAt).format('MMMM') === months[i]) {
              return month
            } 
          }          
        });
        const allMonths = filterMonthSale.map(month => moment(month.createdAt).format('MMMM'));
        
        // Modify the array 
        const getMonthValues = filterMonthSale.map(monthVal => ({ month: moment(monthVal.createdAt).format('MMMM'), amount: monthVal.amount_paid }));
        const sumPerMonth = getMonthValues.reduce((total,curr) => {
          total[curr.month] = total[curr.month] + Number(curr.amount) || Number(curr.amount)
          return total
        },[]);

        // Select same month then add each amount
        setChartData({
          options: {
            chart: {
              id: "basic-bar"
            },  
            xaxis: {
              categories: Array.from(new Set(allMonths.map(JSON.stringify))).map(JSON.parse)
            }
          },
          series: [
            {
              name: "Monthly Sales",
              data: Object.values(sumPerMonth)
            },
            {
              name: "Monthly Expense",
              data: Object.values(sumPerMonth)
            }
          ]
        })
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchSales();

    return () => abortCont.abort();
  },[]);

  return (
    <>
      <Helmet><title>Tulin Bicycle Shop | Sales</title></Helmet>
      <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Sales</h1>
          <Datetime />
        </div>
        
        <div className="mt-10 shadow-lg p-10">
          <LineChart chartData={chartData} /> 
        </div>
      </div>
    </>
  );
};

export default DashboardSales;
