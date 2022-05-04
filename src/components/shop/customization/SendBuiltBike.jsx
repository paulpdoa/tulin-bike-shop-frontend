import { GlobalContext } from "../../../helper/Context";
import { useContext } from 'react';

const SendBuiltBike = ({ build: builds }) => {

  const { numberFormat } = useContext(GlobalContext);
  
  const sendBikeToAdmin = () => {
      console.log('Send the bike to admin');
  }  

  return (
    <div className="p-10 relative">
        <span onClick={sendBikeToAdmin} className="bg-orange-500 p-2 text-gray-800 rounded select-none cursor-pointer absolute right-10">Send Us Your Build</span>
        <div className="bg-gray-900 h-52 text-gray-100 p-10 w-full overflow-y-scroll mt-12 rounded">
            { builds && builds.map((product) => (
                <div className="flex gap-2 mt-3">
                    <img className="object-cover w-20 h-20" src={product.display} alt={product.name} />
                    <div className="flex flex-col">
                        <h2>{ product.name }</h2>
                        <span className="text-xs">₱{ numberFormat.format(product.price) }</span>
                    </div>
                </div>
            )) }

        </div>
    </div>
  )
}

export default SendBuiltBike