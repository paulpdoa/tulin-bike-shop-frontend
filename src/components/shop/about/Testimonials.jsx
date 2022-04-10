import { IoChevronForwardSharp,IoChevronBackSharp } from 'react-icons/io5';

const Testimonials = () => {
  return (
    <section className="md:h-screen content">
        <div className="max-content flex flex-col md:flex-row items-center justify-start relative">
            <div className="bg-gray-800 md:w-3/4 w-full flex flex-col p-10 text-gray-100 h-auto mt-10 md:mt-0">
                <h1 className="rochester md:text-5xl text-4xl">What our customer says about us</h1>
                <span className="rochester text-9xl">“</span>
                <div className="md:w-1/2 w-full">
                    <p>I love tulin, good quality and service, I would recommend it to any bike lovers out there.</p>
                    <div className="flex justify-center md:justify-start items-center gap-5 mt-5">
                        <img className="rounded-full w-20 h-20 object-cover" src="/image/admin-icon.png" alt="temp" />
                        <span>Temporary Name</span>
                    </div>
                </div>
            </div>
            <img className="md:absolute static top-52 md:w-1/3 w-4/5 right-24 h-3/5 object-cover -mt-7 md:mt-0 mb-10 md:mb-0" src="/image/about/walkingperson.png" alt="walking person on shop" />
        </div>
    </section>
  )
}

export default Testimonials