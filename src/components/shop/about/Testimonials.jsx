import { IoChevronForwardSharp,IoChevronBackSharp } from 'react-icons/io5';

const Testimonials = () => {
  return (
    <section className="md:h-screen content">
        <div className="max-content flex items-center justify-start relative">
            <div className="bg-gray-800 w-3/4 flex flex-col p-10 text-gray-100 h-auto">
                <h1 className="rochester text-5xl">What our customer says about us</h1>
                <span className="rochester text-9xl">“</span>
                <div className="w-1/2">
                    <p>I love tulin, good quality and service, I would recommend it to any bike lovers out there.</p>
                    <div className="flex items-center gap-5 mt-5">
                        <img className="rounded-full w-20 h-20 object-cover" src="/image/admin-icon.png" alt="temp" />
                        <span>Temporary Name</span>
                    </div>
                </div>
            </div>
            <img className="absolute top-52 w-1/3 right-24 h-3/5 object-cover" src="/image/about/walkingperson.png" alt="walking person on shop" />
        </div>
    </section>
  )
}

export default Testimonials