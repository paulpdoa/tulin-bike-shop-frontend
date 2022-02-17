
const Datetime = () => {

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const date = new Date();
    const today = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

  return (
    <h1 className="font-bold text-gray-800 select-none">{ today }</h1>
  )
}

export default Datetime