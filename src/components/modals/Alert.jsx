import { useContext } from 'react';
import { GlobalContext } from '../../helper/Context';

const Alert = () => {

  const { alertMssg,setShowAlert } = useContext(GlobalContext);
    console.log(alertMssg);
  return (
    <div className="fixed top-52 w-full z-50 flex justify-center">
        <dialog className="bg-white rounded p-3 h-52">
            <h1>{ alertMssg }</h1>
            <button onClick={() => setShowAlert(false)}>ok</button>
        </dialog>
    </div>
  )
}

export default Alert