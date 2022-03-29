import { Link } from "react-router-dom";

const Offers = () => {
  return (
        <section className="content py-20">
            <div className="max-content h-screen flex flex-col items-center">
                <h1 className="text-5xl border-b-8 border-gray-300">Our New <span className="font-bold">Arrivals</span></h1>
                <div className="flex space-between gap-10 bg-gray-100 rounded-md p-10 mt-10 shadow-xl">
                    <img className="w-1/2 object-cover" src="/image/home/bike1.png" alt="bike1" />
                    <article>
                        <h2 className="text-3xl">Yeti Cycles</h2>
                        <label className="font-bold text-4xl" htmlFor="bike">SB130 C2</label>
                        <p className="text-sm font-normal w-4/5">The Rebel Yell of the middle child. Fed a steady diet of super-tech climbs, the SB130 was built to crush the biggest terrain. No trail is "too" anything. Point it up or down. Enter a last-minute enduro just for the fun of it. We like to say no one bike can rule it all. But the SB130? Its one bike that rules.</p>
                        <button className="bg-gray-800 text-gray-200 p-2 cursor-pointer w-1/3 mt-5 hover:border-2 hover:text-gray-800 transition duration-300 hover:border-gray-800 hover:bg-transparent">Take a look</button>
                    </article>
                </div>
            </div>
        </section>
  );
};

export default Offers;
