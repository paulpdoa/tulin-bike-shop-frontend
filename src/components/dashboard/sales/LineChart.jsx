import Chart from 'react-apexcharts';

const LineChart = ({ chartData }) => {

  return (
      <>
          <Chart 
            options={ chartData.options }
            series={ chartData.series }
            type="bar"
            height={350}
          />
      </>
  )
}

export default LineChart