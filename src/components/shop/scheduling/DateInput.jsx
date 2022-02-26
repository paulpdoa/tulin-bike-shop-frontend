import { useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

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
    },
    exit: {
        scale:0,
        transition: {
            type: 'spring',
            duration:1
        }
    }
}

const DateInput = ({today,hour,minute,setToday}) => {

    const [showImage,setShowImage] = useState(false);
    const [time,setTime] = useState(`${hour}:${minute}`);
    const [image,setImage] = useState([]);
    const [displayImage,setDisplayImage] = useState();
    const [concern,setConcern] = useState('');
    
    const previewImage = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setDisplayImage(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    
    const navigate = useNavigate();

    const onSchedule = async (e) => {
        e.preventDefault();

        try {
            const productDetails = new FormData();
            productDetails.append('concern_image',image);
            productDetails.append('reserved_time',time);
            productDetails.append('reserved_date',today);
            productDetails.append('customer_concern',concern);
            productDetails.append('customer_id',Cookies.get('customerId'));
            // Limit the reservation power of customer
            

            const postSched = await axios.post('/schedule',productDetails);
            alert(postSched.data.mssg);
            navigate(postSched.data.redirect);
        }
        catch(err) {
            console.log(err)
        }
    }

  return (
    <>
        <form onSubmit={onSchedule} encType="multipart/form-data" className="bg-white rounded shadow-lg w-full p-10">
            <section className="flex flex-col">
                <label htmlFor="date">Date:</label>
                <input className="outline-none p-2 border border-gray-400 rounded" 
                    type="date" 
                    value={today} 
                    onChange={(e) => setToday(e.target.value)}
                    required
                />
            </section>
            <section className="flex flex-col">
                <label htmlFor="date">Time:</label>
                <input className="outline-none p-2 border border-gray-400 rounded" 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </section>
            <section className="flex flex-col">
                <label htmlFor="date">Concern:</label>
                <textarea onChange={(e) => setConcern(e.target.value)} value={concern} required className="outline-none p-2 border border-gray-400 rounded"></textarea>
            </section>
            <section className="flex flex-col">
                <label htmlFor="date">Upload Image:</label>
                <div className="flex justify-between items-center gap-5 bg-white rounded shadow-lg p-5 border border-gray-300">
                    <div className="relative z-50 cursor-pointer">
                        <input onChange={previewImage} className="absolute w-32 opacity-0" type="file" accept="image/*" />
                        <span className="bg-green-500 text-gray-100 font-semibold p-2 rounded cursor-pointer">Upload Image</span>
                    </div>
                   { displayImage &&  
                   <div onClick={() => setShowImage(!showImage)}>
                        <h2 className="bg-gray-900 text-gray-100 font-semibold p-2 rounded cursor-pointer">View Uploaded Image</h2>
                    </div> }
                </div>
            </section>
            <button className="p-2 w-full text-gray-100 font-semibold bg-gray-900 rounded mt-4">Schedule Now</button>
        </form>
        { showImage && 
            <div className="flex items-center justify-center h-screen fixed bg-black w-full top-0 bg-opacity-50 z-50">
                <AnimatePresence>
                    <motion.div className="relative bg-white shadow-lg"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={enterVar}
                    >
                        <span onClick={() => setShowImage(!image)} className="absolute font-bold text-xl cursor-pointer right-0 -top-7 text-gray-100">X</span>
                        <img className="w-72 h-72 z-50 rounded" src={displayImage} alt="Uploaded Concern" />
                    </motion.div>
                </AnimatePresence>
            </div>
        }
    </>
  )
}

export default DateInput