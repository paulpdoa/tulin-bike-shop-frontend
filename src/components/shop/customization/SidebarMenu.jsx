import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import { GrPowerReset } from 'react-icons/gr';
import Forks from './Forks';
import Frames from './Frames';
import Shocks from './Shocks';
import Wheels from './Wheels';
import Tires from './Tires';
import Seats from './Seats';
import Groupsets from './Groupsets';

const SidebarMenu = () => {

  const { active,setBuild,setActive,setBikeDisplay,bikeDisplay } = useContext(GlobalContext);

  const resetBuild = () => {
    setBuild([]);
    setActive('frame');
    setBikeDisplay('');
  }

  return (
    <nav className="text-gray-100 p-10 h-full w-1/2 overflow-hidden">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold uppercase">Build your bike!</h1>
        <button onClick={resetBuild} className="flex items-center gap-2 bg-red-500 text-gray-100 p-2 rounded"><GrPowerReset className="text-gray-100 invert" />Reset</button>
      </div>
      <h2 className="font-semibold">Select { active.slice(0,1).toUpperCase() + active.slice(1,active.length) }</h2>
      <div className="flex flex-wrap gap-3 w-full h-72 overflow-y-scroll mt-5">
            { active === 'frame' && <Frames /> }
            { active === 'fork' && <Forks /> }
            { active === 'shock' && <Shocks /> }
            { active === 'wheels' && <Wheels /> }
            { active === 'tire' && <Tires /> }
            { active === 'seat' && <Seats /> }
            { active === "groupset" && <Groupsets /> }
        </div>
        
    </nav>
  )
}

export default SidebarMenu