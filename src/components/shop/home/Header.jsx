import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header-banner content">
            <div className="max-content flex items-center text-gray-300 select-none">
                <div className="flex flex-col">
                    <h1 className="text-7xl font-bold w-1/2 animate-pulse">DISCOVER DIFFERENT</h1>
                    <Link className="p-2 border-2 border-gray-300 w-1/4 text-center font-semibold" to="/bikes">FIND OUT MORE</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;