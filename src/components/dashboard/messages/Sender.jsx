import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const Sender = ({ senderName,senderEmail,profileImg }) => {

  const { imgProfileLocation } = useContext(GlobalContext);

  return (
    <div className="border-l border-gray-600 w-1/3 flex gap-5 flex-col items-center">
        {profileImg && <img className="w-1/3 object-cover rounded-full" src={`${imgProfileLocation}${profileImg}`} alt={senderName} />}
        <h1 className="text-2xl font-semibold">{senderName}</h1>
        <span className="text-sm">{senderEmail}</span>
    </div>
  )
}

export default Sender