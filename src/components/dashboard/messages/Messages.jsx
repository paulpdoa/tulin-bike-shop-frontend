import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const Messages = ({ senders,setSenderName,setProfileImg,setSenderEmail,setSenderId }) => {
 
  const { imgProfileLocation,socket } = useContext(GlobalContext);  

  const handleSearch = (e) => {
      e.preventDefault();
      const name = e.target.value;

      console.log(handleSearch);
  }

  const joinRoom = async (id,name,image,email) => {
      socket.emit("join_room",id);
      setSenderId(id);
      setSenderName(name);
      setProfileImg(image);
      setSenderEmail(email);
  }

  return (
    <div className="w-1/3 border-r border-gray-600 overflow-y-scroll">
        <div className="flex items-center gap-2 overflow-hidden">
            <input onChange={handleSearch} className="p-2 outline-none rounded" type="search" placeholder="Search name" />
        </div>
        { senders && senders.map((sender) => (
            <>
                { sender && 
                <div onClick={() => joinRoom(sender._id,`${sender.firstname} ${sender.lastname}`,sender.profilePicture,sender.email)} className="flex gap-2 py-2 cursor-pointer hover:bg-gray-100 transition duration-300 rounded" key={sender._id}>
                    { sender.profilePicture ? <img className="w-14 h-14 rounded-full object-cover" src={`${imgProfileLocation}${sender.profilePicture}`} alt={sender.username} /> : <img className="w-14 h-14 rounded-full object-cover" src='/image/blank-profile.png' alt={sender.username} /> }
                    <div>
                        <label className="text-sm font-semibold" htmlFor="name">{sender.firstname} {sender.lastname}</label>
                        <p className="break-all text-xs">Chat now</p>
                    </div>
                </div> 
                }
            </>
        )) }
    </div>
  )
}

export default Messages