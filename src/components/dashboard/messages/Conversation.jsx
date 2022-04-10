import { IoSend } from 'react-icons/io5';
import { useState,useEffect } from 'react';

const Conversation = () => {

  const [sent,setSent] = useState('');
  const [received,setReceived] = useState('');  

  return (
    <div className="w-full relative h-auto">
        <header className="border-b border-gray-600 p-3 flex gap-2 items-center">
            <img className="rounded-full w-10 h-10" src="/image/admin-icon.png" alt="tulin" />
            <h1 className="font-semibold text-2xl">Paul Andres</h1>
        </header>
        {/* Message Area */}
        <div className="w-full overflow-y-scroll h-4/5 py-2">
            <div className="justify-end flex">
                <div className="bg-blue-500 text-gray-100 w-1/2 rounded-md p-2">
                    <p className="text-sm">Sent</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-start flex">
                <div className="bg-gray-200 text-gray-800 w-1/2 rounded-md p-2">
                    <p className="text-sm">Received</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-end flex">
                <div className="bg-blue-500 text-gray-100 w-1/2 rounded-md p-2">
                    <p className="text-sm">Sent</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-start flex">
                <div className="bg-gray-200 text-gray-800 w-1/2 rounded-md p-2">
                    <p className="text-sm">Received</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-end flex">
                <div className="bg-blue-500 text-gray-100 w-1/2 rounded-md p-2">
                    <p className="text-sm">Sent</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-start flex">
                <div className="bg-gray-200 text-gray-800 w-1/2 rounded-md p-2">
                    <p className="text-sm">Received</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-end flex">
                <div className="bg-blue-500 text-gray-100 w-1/2 rounded-md p-2">
                    <p className="text-sm">Sent</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-start flex">
                <div className="bg-gray-200 text-gray-800 w-1/2 rounded-md p-2">
                    <p className="text-sm">Received</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-end flex">
                <div className="bg-blue-500 text-gray-100 w-1/2 rounded-md p-2">
                    <p className="text-sm">Sent</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-start flex">
                <div className="bg-gray-200 text-gray-800 w-1/2 rounded-md p-2">
                    <p className="text-sm">Received</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-end flex">
                <div className="bg-blue-500 text-gray-100 w-1/2 rounded-md p-2">
                    <p className="text-sm">Sent</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-start flex">
                <div className="bg-gray-200 text-gray-800 w-1/2 rounded-md p-2">
                    <p className="text-sm">Received</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-end flex">
                <div className="bg-blue-500 text-gray-100 w-1/2 rounded-md p-2">
                    <p className="text-sm">Sent</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-start flex">
                <div className="bg-gray-200 text-gray-800 w-1/2 rounded-md p-2">
                    <p className="text-sm">Received</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-end flex">
                <div className="bg-blue-500 text-gray-100 w-1/2 rounded-md p-2">
                    <p className="text-sm">Sent</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
            <div className="justify-start flex">
                <div className="bg-gray-200 text-gray-800 w-1/2 rounded-md p-2">
                    <p className="text-sm">Received</p>
                    <span className="text-xs">Tuesday 8:00</span>
                </div>
            </div>
        </div>
        {/* Message Area */}

        {/* Input Area */}
        <div className="w-full flex gap-1 items-center overflow-hidden">
            <input className="p-2 w-full outline-none" type="text" placeholder="Aa" />
            <button className="text-2xl group"><IoSend className="group-hover:scale-150 transition duration-300" /></button>
        </div>
        {/* Input Area */}
    </div>
  )
}

export default Conversation