import { useState } from 'react';
import { motion } from 'framer-motion';

const enterVar = {
    hidden: {
       scale:0
    },
    visible: {
        scale: 1,
        transition: {
            type:'spring',
            duration:2
        }
    }
}

const DateInput = () => {

    const d = new Date();
    const today = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? (0 + '' + (d.getMonth() + 1)) : (d.getMonth() + 1) ) + '-' + d.getDate();
    const [showImage,setShowImage] = useState(false);

    const [date,setDate] = useState(today);
    const [image,setImage] = useState();
    
    const previewImage = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setImage(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const onSchedule = (e) => {
        e.preventDefault();

    }

  return (
    <>
        <form onSubmit={onSchedule} className="bg-white rounded shadow-lg w-full p-10">
            <section className="flex flex-col">
                <label htmlFor="date">Date:</label>
                <input className="outline-none p-2 border border-gray-400 rounded" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            </section>
            <section className="flex flex-col">
                <label htmlFor="date">Time:</label>
                <input className="outline-none p-2 border border-gray-400 rounded" type="time" />
            </section>
            <section className="flex flex-col">
                <label htmlFor="date">Concern:</label>
                <textarea className="outline-none p-2 border border-gray-400 rounded"></textarea>
            </section>
            <section className="flex flex-col">
                <label htmlFor="date">Upload Image:</label>
                <div className="flex justify-between items-center gap-5 bg-white rounded shadow-lg p-5 border border-gray-300">
                    <div className="relative z-50 cursor-pointer">
                        <input onChange={previewImage} className="absolute w-32 opacity-0" type="file" accept="image/*" />
                        <span className="bg-green-500 text-gray-100 font-semibold p-2 rounded cursor-pointer">Upload Image</span>
                    </div>
                   { image &&  
                   <div onClick={() => setShowImage(!showImage)}>
                        <h2 className="bg-gray-900 text-gray-100 font-semibold p-2 rounded cursor-pointer">View Uploaded Image</h2>
                    </div> }
                </div>
            </section>
            <button className="p-2 w-full text-gray-100 font-semibold bg-gray-900 rounded mt-4">Schedule Now</button>
        </form>
        { showImage && 
            <div className="flex items-center justify-center h-screen fixed bg-black w-full top-0 bg-opacity-50 z-50">
                <motion.div className="relative bg-white shadow-lg"
                    initial="hidden"
                    animate="visible"
                    variants={enterVar}
                >
                    <span onClick={() => setShowImage(!image)} className="absolute font-bold text-xl cursor-pointer right-0 -top-7 text-gray-100">X</span>
                    <img className="w-72 h-72 z-50 rounded" src={image} alt="Uploaded Concern" />
                </motion.div>
            </div>
        }
    </>
  )
}

export default DateInput