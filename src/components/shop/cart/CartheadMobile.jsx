import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect,useState,useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const CartheadMobile = ({ cartContents }) => {

    const { numberFormat } = useContext(GlobalContext);

    const [totalPrice,setTotalPrice] = useState(0);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async() => {
            let previousNum = 0;
            const data = await cartContents.map((content) => {
            return content.inventory_id.product_price * content.order_quantity;
            });
            for(let i = 0; i < data.length; i++) {
            previousNum += data[i];
            }
            setTotalPrice(previousNum);
        }
        fetchData();
        return () => abortCont.abort();
    },[cartContents,totalPrice])

  return (
    <div className="md:hidden flex justify-around items-center bg-gray-200 p-3 fixed bottom-0 w-full">
        <label className="text-sm" htmlFor="subtotal">Subtotal: <span className="font-bold">₱{ numberFormat.format(totalPrice) }</span></label>
        <Link className="p-2 rounded-md bg-gray-800 text-gray-100 text-sm" to={`/checkout/${Cookies.get('customerId')}`}>Checkout</Link>
    </div>
  )
}

export default CartheadMobile