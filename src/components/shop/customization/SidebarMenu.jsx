import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import { GrPowerReset } from 'react-icons/gr';
import { IoArrowBackOutline } from 'react-icons/io5';

import Forks from './Forks';
import Frames from './Frames';
import Shocks from './Shocks';
import Wheels from './Wheels';
import Tires from './Tires';
import Seats from './Seats';
import Groupsets from './Groupsets';

const SidebarMenu = () => {

  const { active,setBuild,setActive,setBikeDisplay,setPreviousCode,previousCode,setProdCode,prodCode } = useContext(GlobalContext);

  const resetBuild = () => {
    setBuild([]);
    setActive('frame');
    setBikeDisplay('');
    setPreviousCode([]);
  }


  console.log(previousCode);
  console.log(prodCode);
  const goBackToPreviousPart = () => {
    // every select on part, add it on array
    // when clicking previous, look upon the last array inserted then get code and type
    setActive(previousCode[previousCode.length - 1].type);
    setProdCode(previousCode[previousCode.length - 2].code);
    setPreviousCode(previousCode.pop());
  }

  return (
    <nav className="text-gray-100 p-10 h-full w-1/2 overflow-hidden">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-3xl font-semibold uppercase">Build your bike!</h1>
        <button onClick={resetBuild} className="flex items-center gap-2 bg-red-500 text-gray-100 p-2 rounded"><GrPowerReset className="text-gray-100 invert" />Reset</button>
        {/* <button onClick={goBackToPreviousPart} className="bg-orange-500 text-gray-100 rounded p-2 flex items-center gap-2"><IoArrowBackOutline className="text-gray-100" />Previous</button> */}
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