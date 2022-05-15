import Forks from './Forks';
import Frames from './Frames';
import Shocks from './Shocks';
import Wheels from './Wheels';
import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import Tires from './Tires';
import Seats from './Seats';
import Groupsets from './Groupsets';

const CustomChoice = ({ setBuild }) => {

  const { active,setActive } = useContext(GlobalContext);

  const sendBike = (id,display,name,price,code) => {
    const selectedPart = {
      id,
      display,
      name,
      price
    }
    setBuild(current => [...current,selectedPart])
  }

  return (
    <div className="p-10 flex justify-center items-center fixed bottom-0 bg-white w-full bg-opacity-50">   
        <div className="flex overflow-auto gap-3 w-full h-auto">
            { active === 'frame' && <Frames setBuild={setBuild} /> }
            { active === 'fork' && <Forks setBuild={setBuild} /> }
            { active === 'shock' && <Shocks setBuild={setBuild} /> }
            { active === 'wheels' && <Wheels setBuild={setBuild} /> }
            { active === 'tire' && <Tires setBuild={setBuild} /> }
            { active === 'seat' && <Seats setBuild={setBuild} /> }
            { active === "groupset" && <Groupsets setBuild={setBuild} /> }
        </div>
    </div>
  )
}

export default CustomChoice;