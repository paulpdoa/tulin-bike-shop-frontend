import { useContext } from 'react';
import { GlobalContext } from '../../helper/Context';

const Chathead = () => {
 
  const { setShowChatbox } = useContext(GlobalContext);
    
  return (
    <div onClick={() => setShowChatbox(true)} className="fixed bottom-5 right-5 animate-bounce w-14 h-14 cursor-pointer group">
        <img className="object-cover rounded-full group-hover:scale-150 duration-300 transition border border-gray-300" src="/image/admin-icon.png" alt="admin icon" />
    </div>
  )
}

export default Chathead