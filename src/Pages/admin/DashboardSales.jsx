import { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Datetime from '../../components/dashboard/partials/Datetime';
import LineChart from '../../components/dashboard/sales/LineChart';
import moment from 'moment';

const DashboardSales = () => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const [sales,setSales] = useState([]);
  const monthSale = 0;
  
  // Get start up to end of the month
  const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD');
  const endOfMonth   = moment().clone().endOf('month').format('YYYY-MM-DD');
  // Get total sales in a month
  const validMonths = sales.filter(sale => {
    if(moment(sale.createdAt).format('YYYY-MM-DD') <= endOfMonth || startOfMonth >= moment(sale.createdAt).format('YYYY-MM-DD')) 
    return sale
  });

  console.log(validMonths.map(valid => valid.amount_paid));

  useEffect(() => {
    const abortCont = new AbortController();

    axios.get('/ordereditem', { signal:abortCont.signal })
    .then((data) => {
     setSales(data.data);
    })
    .catch(err => {
      console.log(err);
    })

    return () => abortCont.abort();
  },[])

  const [line,setLine] = useState({
  labels: months.map(month => month),
  datasets: [
    {
      label: "Monthly Sales",
      data: [validMonths.map(valid => valid.amount_paid)],
      backgroundColor: ["#111827"],
      borderColor: ["black"],
      borderWidth: 1,
      fill:false
    },
    {
      label: "Total Expense",
      data: ['4','3','2','1'],
      backgroundColor: ["#8E9296"],
      borderColor: ["black"],
      borderWidth: 1,
      fill:false
    }
  ]
});

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
