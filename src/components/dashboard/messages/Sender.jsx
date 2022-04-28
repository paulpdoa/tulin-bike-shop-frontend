import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const Sender = ({ senderName,senderEmail,profileImg }) => {

  const { imgProfileLocation } = useContext(GlobalContext);

  return (
    <div className="border-l border-gray-600 w-1/3 flex justify-center">
        <div className="flex items-center flex-col mt-3">
          {profileImg ? <img className="object-cover rounded-full w-32 h-32" src={`${imgProfileLocation}${profileImg}`} alt={senderName} /> : <img className="object-cover rounded-full w-32 h-32" src='/image/blank-profile.png' alt={senderName} />}
          <h1 className="text-2xl font-semibold">{senderName}</h1>
          <span className="text-sm">{senderEmail}</span>
        </div>
    </div>
  )
}

export default Sender