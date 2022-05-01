import { useState,useContext,useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../helper/Context';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseUrl } from '../../../helper/baseUrl';
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

const DateInput = ({today: chosenDate,hour,minute,setToday}) => {

    const { setAlertMssg,setShowAlert } = useContext(GlobalContext);

    const [showImage,setShowImage] = useState(false);
    const [time,setTime] = useState('');
    const [image,setImage] = useState([]);
    const [displayImage,setDisplayImage] = useState();
    const [concern,setConcern] = useState('');
    const [schedules,setSchedules] = useState([]);

    // Checks date today to compare with actual input by user for validation purposes
    const presentDay = `${new Date().getFullYear()}-${new Date().getMonth() < 10 ? 0 + '' + Number(new Date().getMonth() + 1) : Number(new Date().getMonth() + 1)}-${new Date().getDate()}`;

    useEffect(() => {
        const abortCont = new AbortController();

        axios.get(`${baseUrl()}/schedule`,{ signal:abortCont.signal })
        .then(data => {
            const scheds = data.data.filter((date) => date.reserved_date === chosenDate).map(date => date.reserved_time);
            setSchedules(scheds);
        })

        return () => abortCont.abort();
    },[chosenDate]);

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
        
        // Prevent the user to schedule a behind date
        if(new Date(chosenDate) < new Date(presentDay)) {
            setAlertMssg('Please select date today or the next days');
            setShowAlert(true);
        } else {
            try {
                if(schedules.includes(time)) {
                    setAlertMssg('this time has been occupied, please select another time');
                    setShowAlert(true);
                } else {
                    const productDetails = new FormData();
                    productDetails.append('concern_image',image);
                    productDetails.append('reserved_time',time);
                    productDetails.append('reserved_date',chosenDate);
                    productDetails.append('customer_concern',concern);
                    productDetails.append('customer_id',Cookies.get('customerId'));
                    
                    const postSched = await axios.post(`${baseUrl()}/schedule`,productDetails);
                    setAlertMssg(postSched.data.mssg);
                    setShowAlert(true);
                    navigate(postSched.data.redirect);
                }
            }
            catch(err) {
                const mute = err;
            }
        }

        
    }

  return (
    <>
        <form onSubmit={onSchedule} encType="multipart/form-data" className="bg-white border border-gray-200 rounded-md shadow-lg w-full p-10 md:col-span-2 col-span-1 md:-mt-16 mt-0">
            <section className="flex flex-col">
                <label htmlFor="date">Date:</label>
                <input disabled className="outline-none p-2 border border-gray-400 rounded" type="date" value={chosenDate} onChange={(e) => setToday(e.target.value)} />               
            </section>
            <section className="flex flex-col">
                <label htmlFor="date">Time:</label>
                <select required value={time} onChange={(e) => setTime(e.target.value)} className="outline-none p-2 border border-gray-400 rounded" name="time">
                    <option hidden>Select time</option>
                    <option value="8:00am - 10:00am">8:00am - 10:00am</option>
                    <option value="10:00am - 12:00pm">10:00am - 12:00am</option>
                    <option value="1:00pm - 3:00pm">1:00pm - 3:00pm</option>
                    <option value="3:00pm - 5:00pm">3:00pm - 5:00pm</option>
                </select>
               
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