import {GoLocation} from 'react-icons/go';
import {AiOutlinePhone,AiOutlineMail} from 'react-icons/ai';
import { BsFacebook,BsTwitter,BsInstagram } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [email,setEmail] = useState('');

  const subscribeUser = async () => {
    await console.log(email);
  }

  return (
    <footer className="content footer-bg">
        <div className="max-content flex justify-center text-gray-100 items-center">
            <div className="flex flex-col md:max-w-max">
               <div className="flex justify-center md:justify-start items-center max-w-max">
                  <img className="w-4/5 md:w-auto" src="/image/Footer-Logo.png" alt="footer logo" />
               </div>
               <div className="flex flex-col items-center md:items-start gap-4 mt-5 text-sm md:text-base">
                <div className="flex items-center gap-2 w-4/5">
                  <GoLocation className="md:text-2xl text-lg" />
                  <p>05 Lt. Aster Street, Sta. Cecilia 1 Subdivision, Tanza, 4108 Cavite</p>
                </div>
                <div className="flex items-center gap-2 w-4/5">
                  <AiOutlinePhone className="md:text-2xl text-lg" />
                  <p>482-3491-31</p>
                </div>
                <div className="flex items-center gap-2 w-4/5">
                  <AiOutlineMail className="md:text-2xl text-lg" />
                  <p>tulinbikeshop@gmail.com</p>
                </div>
               </div>
            </div>
            
            <div className="hidden md:flex gap-10 items-start">
              <div className="w-full">
                  <h1 className="font-bold text-2xl rockwell">Tulin</h1>
                  <div className="flex flex-col mt-5 gap-2">
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/contact'>Contact Us</Link>
                  </div>
              </div>
              <div className="w-full">
                  <h1 className="font-bold text-2xl rockwell">Services</h1>
                  <div className="flex flex-col mt-5 gap-2">
                    <Link to='/products/bikes'>Bicycles</Link>
                    <Link to='/products/parts'>Parts  </Link>
                    <Link to='/products/accessories'>Accessories</Link>
                    <Link to='/customize'>Customize</Link>
                    <Link to='/schedule'>Schedule</Link>
                  </div>
              </div>
              <div>
                  <h1 className="font-bold text-2xl rockwell">About Tulin</h1>
                  <div className="flex flex-col mt-5">
                    <p>Our bicycle shop started on 1998 and our business is almost 24 years and we are focusing on alignment of motorcycle parts, wheels, and selling of bicycles.</p>
                  </div>
              </div>
            </div>
        </div>
        {/* <p className="absolute bottom-0 bg-red-200">All Rights Reserved. Tulin Bicycle 2022.</p> */}
    </footer>
  );
};

export default Footer;
