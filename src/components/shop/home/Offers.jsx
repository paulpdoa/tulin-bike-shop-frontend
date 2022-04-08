import { Link } from "react-router-dom";

const Offers = () => {
  return (
        <section className="content md:py-20">
            <div className="max-content md:h-screen flex flex-col items-center">
                <h1 className="md:text-5xl text-4xl border-b-8 border-gray-300">Our New <span className="font-bold">Arrivals</span></h1>
                <div className="flex flex-col md:flex-row space-between gap-10 bg-gray-100 rounded-md md:p-10 p-5 w-4/5 md:w-auto mt-10 shadow-xl">
                    <img className="md:w-1/2 w-full object-cover" src="/image/home/bike1.png" alt="bike1" />
                    <article className="text-center md:text-left">
                        <h2 className="text-3xl">Yeti Cycles</h2>
                        <label className="font-bold md:text-4xl text-3xl" htmlFor="bike">SB130 C2</label>
                        <p className="text-sm font-normal md:w-4/5 w-full">The Rebel Yell of the middle child. Fed a steady diet of super-tech climbs, the SB130 was built to crush the biggest terrain. No trail is "too" anything. Point it up or down. Enter a last-minute enduro just for the fun of it. We like to say no one bike can rule it all. But the SB130? Its one bike that rules.</p>
                        <button className="bg-gray-800 text-gray-200 p-2 cursor-pointer w-full md:w-1/3 mt-5 hover:border-2 hover:text-gray-800 transition duration-300 hover:border-gray-800 hover:bg-transparent">Take a look</button>
                    </article>
                </div>
            </div>
        </section>
  );
};

export default Offers;
