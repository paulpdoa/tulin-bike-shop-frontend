import { Link } from "react-router-dom";

const Header = () => {
    return (
        <section className="md:h-screen h-auto content items-center">
            <div className="max-content mb-20">
                <div className="md:flex hidden items-center rounded overflow-hidden relative w-full">
                    <di v className="relative">
                        <img className="w-3/4" src="/image/hero/hero1.png" alt="hero1" />
                        <article className="absolute left-0 top-0 flex flex-col ml-14 justify-center h-full z-40 text-gray-100">
                            <h1 className="font-bold text-5xl">Perfection</h1>
                            <p className="text-3xl font-light">In every shape</p>
                            <Link to='/products/bikes' className="p-2 rounded-md w-3/4 mt-5 border-2 text-center cursor-pointer border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-300">Find out more</Link>
                        </article>
                    </di>
                    <div className="flex flex-col items-end justify-between gap-5 h-full w-max absolute right-0">
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
            </div>
        </section>
    )
}

export default Header;