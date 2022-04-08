import { Link } from "react-router-dom";

const Header = () => {
    return (
        <section className="md:h-screen h-auto content items-center">
            <div className="max-content mb-20">
                {/* Desktop */}
                <div className="md:flex hidden items-center rounded overflow-hidden relative w-full">
                    <div className="relative">
                        <img className="w-3/4" src="/image/hero/hero1.png" alt="hero1" />
                        <article className="absolute left-0 top-0 flex flex-col ml-14 justify-center h-full z-40 text-gray-100">
                            <h1 className="font-bold text-5xl">Perfection</h1>
                            <p className="text-3xl font-light">In every shape</p>
                            <Link to='/products/bikes' className="p-2 rounded-md w-3/4 mt-5 border-2 text-center cursor-pointer border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-300">Find out more</Link>
                        </article>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-5 h-full w-max absolute right-0 -z-10">
                        <Link to="/products/bikes" className="relative cursor-pointer flex justify-end hover:animate-pulse">
                            <img className="hero--item2" src="/image/hero/hero2.png" alt="hero2" />
                        </Link>
                        <Link to='/products/accessories' className="relative cursor-pointer flex justify-end hover:animate-pulse">
                            <img className="hero--item3" src="/image/hero/hero3.png" alt="hero3" />
                        </Link>
                        <Link to="/products/parts" className="relative cursor-pointer flex justify-end hover:animate-pulse">
                            <img className="hero--item1" src="/image/hero/hero4.png" alt="hero4" />
                        </Link>
                    </div>
                </div>
                {/* Desktop */}
                
                {/* Mobile */}
                <div className="flex justify-center items-center flex-col w-full gap-2 md:hidden py-10">
                    <div className="relative w-4/5 justify-center flex">
                        <img className="w-full object-cover" src="/image/mobile/hero.png" alt="hero" />
                        <article className="z-30 absolute text-white text-center h-full flex flex-col items-center justify-center">
                            <h1 className="font-bold text-4xl">Perfection</h1>
                            <p className="text-white text-base">In every shape</p>
                            <button className="p-2 border-2 mt-5 border-white text-white rounded text-sm">Find out more</button>
                        </article>
                    </div>
                    <div className="flex w-4/5 justify-center gap-2 items-center">
                        <div className="relative text-white flex justify-center items-center w-full">
                            <img className="object-cover w-full" src="/image/mobile/bikes.png" alt="bikes" />
                            <div className="absolute z-30 bg-gray-800 bg-opacity-75 flex items-center w-full justify-center">
                                <span className="font-semibold text-xl">Bikes</span>
                            </div>
                        </div>
                        <div className="relative text-white flex justify-center items-center w-full">
                            <img className="object-cover w-full" src="/image/mobile/parts.png" alt="parts" />
                            <div className="absolute z-30 bg-gray-800 bg-opacity-75 flex items-center w-full justify-center">
                                <span className="font-semibold text-xl">Bike Parts</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative text-white w-4/5 flex justify-center items-center">
                        <img className="object-cover w-full" src="/image/mobile/accessories.png" alt="accessory" />
                        <div className="absolute z-30 bg-gray-800 bg-opacity-75 flex items-center w-full justify-center">
                            <span className="font-semibold text-xl">Accessories</span>
                        </div>
                    </div>
                </div>
                {/* Mobile */}
            </div>
        </section>
    )
}

export default Header;