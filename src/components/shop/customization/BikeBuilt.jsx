import { GlobalContext } from "../../../helper/Context";
import { useContext } from "react";

const BikeBuilt = () => {

  const { bikeDisplay } = useContext(GlobalContext);

  return (
   <>
     <div className="p-10 text-gray-100 rounded flex justify-center">
          { bikeDisplay === '' ? '' : <img className="scale-150 w-1/2" src={bikeDisplay} alt="chosen parts" /> }
    </div> 
   </>
  )
}

export default BikeBuilt