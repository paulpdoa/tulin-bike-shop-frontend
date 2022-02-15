import Datetime from "../partials/Datetime";

const Bikes = () => {
  return (
    <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-4xl text-gray-800 uppercase">Bicycles</h1>
          <Datetime />
        </div>
    </div>
  );
};

export default Bikes;
