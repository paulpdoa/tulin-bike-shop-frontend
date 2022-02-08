import { GoLocation } from 'react-icons/go';
import { AiOutlinePhone } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';

const ContactDetails = () => {
  return (
      <div className="content">
          <div className="max-content py-20">
              <h1 className="text-gray-800 font-semibold text-4xl uppercase text-center">Contact Us</h1>
              <div className="grid grid-cols-3 justify-items-center py-20">
                <div className="w-full flex flex-col gap-2 items-center">
                    <GoLocation className="text-2xl" />
                    <h2 className="font-semibold text-gray-800 text-2xl">OUR STORE</h2>
                    <p className="w-1/2 text-center">05 Lt. Aster Street, Sta. Cecilia 1 Subdivision, Tanza, Cavite 4108 Cavite</p>
                </div>
                <div className="border-l-2 border-r-2 border-gray-800 w-full flex flex-col gap-2 items-center">
                    <AiOutlinePhone className="text-2xl" />
                    <h2 className="font-semibold text-gray-800 text-2xl">OUR PHONE NUMBER</h2>
                    <p>Tel. No. 482-3491-31</p>
                    <p>Mobile No. 09325421176</p>
                    <p>Facebook Page: Tulin Bicycle Shop</p>
                </div>
                <div className="w-full flex flex-col gap-2 items-center">
                    <BiTimeFive className="text-2xl" />
                    <h2 className="font-semibold text-gray-800 text-2xl">OUR OPENING TIME</h2>
                    <p>Mon - Fri 11:00 - 19:00</p>
                    <p>Sat & Sun 10:00 - 18:00</p>
                </div>
              </div>
          </div>
      </div>
  );
};

export default ContactDetails;
