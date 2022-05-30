import { Link } from "react-router-dom";

const Offers = () => {

  return (
        <section id="offer" className="content md:py-20">
            <div className="max-content md:h-screen flex flex-col items-center">
                <h1 className="md:text-5xl text-4xl border-b-8 border-gray-300">What We <span className="font-bold">Offer?</span></h1>
                <div className="flex flex-col md:flex-row space-between gap-10 bg-gray-100 rounded-md md:p-10 p-5 w-4/5 md:w-auto mt-10 shadow-xl">
                    <img className="md:w-1/2 w-full object-cover" src="/image/home/bike1.png" alt="bike1" />
                    <article className="text-center md:text-left">
                        <h2 className="text-3xl">We sell bicycles</h2>
                        <label className="font-bold md:text-2xl text-xl" htmlFor="bike">About bike</label>
                        <p className="text-sm font-normal md:w-4/5 w-full">Bicycles helped create, or enhance, new kinds of businesses, such as bicycle messengers, traveling seamstresses, riding academies, and racing rinks. Their board tracks were later adapted to early motorcycle and automobile racing.</p>
                        <div className="mt-5">
                            <Link to='/products/bikes' className="bg-gray-800 text-gray-200 p-2 cursor-pointer w-full md:w-1/3 hover:border-2 hover:text-gray-800 transition duration-300 hover:border-gray-800 hover:bg-transparent">View Bicycles</Link>
                        </div>
                    </article>
                </div>
            </div>
        </section>
  );
};

export default Offers;