import Forks from './Forks';
import Frames from './Frames';

const CustomChoice = ({ setItemId,products,active,setBuild,setProdCode,prodCode,setActive }) => {

  const sendBike = (id,display,name,price,code) => {
    const selectedPart = {
      id,
      display,
      name,
      price
    }
    setItemId(id)
    setProdCode(code);
    setBuild(current => [...current,selectedPart])
  }

  return (
    <div className="p-10 flex justify-center items-center fixed bottom-0 bg-white w-full bg-opacity-50">   
        <div className="flex overflow-hidden gap-3 w-full h-auto">
            { active === 'frame' && <Frames setActive={setActive} setItemId={setItemId} setBuild={setBuild} setProdCode={setProdCode} /> }
            { active === 'fork' && <Forks setActive={setActive} setItemId={setItemId} setBuild={setBuild} prodCode={prodCode} /> }
        </div>
    </div>
  )
}

export default CustomChoice;