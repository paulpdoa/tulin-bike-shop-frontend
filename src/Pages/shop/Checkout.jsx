import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { fetchData } from '../../helper/fetching';

import OrderedItem from '../../components/shop/checkout/OrderedItem';
import PaymentCard from '../../components/shop/checkout/PaymentCard';
import Paypal from '../../components/shop/checkout/Paypal';
import Cod from '../../components/shop/checkout/Cod';
import { baseUrl } from '../../helper/baseUrl';
const Checkout = () => {

  const [showPaypal,setShowPaypal] = useState(false);
  const [showCod,setShowCod] = useState(false);
  const [products,setProducts] = useState([]);
  const [paymentVal,setPaymentVal] = useState(0);
  const [isLoading,setIsLoading] = useState(true);

  const {id} = useParams();
  useEffect(() => {
    const abortCont = new AbortController();
    fetchData({ signal:abortCont.signal },`${baseUrl()}/cart/${id}`,setProducts,setIsLoading);
    return () => abortCont.abort();
  },[id]);

  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Checkout</title></Helmet>
        <div className="content h-screen relative select-none">
            <div className="max-content flex flex-col justify-center w-full">
                <section className="flex items-center gap-5">
                  <img className="w-32 h-32 object-cover" src="/image/tulin.png" alt="Tulin Logo" />
                  <h1 className="text-4xl font-semibold uppercase text-gray-800">Checkout</h1>
                </section>
                <div className="flex gap-20">
                    <section className="shadow-2xl bg-white p-5 w-1/2 h-96 rounded overflow-y-scroll">
                      <h2 className="text-3xl font-semibold text-gray-800">Ordered Items</h2>
                      { isLoading && <h2>Please wait...</h2>}
                      { products && products.map((product) => (
                        <div key={product._id}>
                          <OrderedItem 
                            image={product.inventory_id.product_image}
                            brand={product.inventory_id.brand_name}
                            item={product.inventory_id.product_name}
                            description={product.inventory_id.product_description}
                            quantity={product.order_quantity}
                            price={product.inventory_id.product_price}
                          />   
                        </div>
                      )) }
                    </section>
                    <section className="shadow-2xl bg-white p-5 w-1/2 h-auto rounded">
                      <h2 className="text-3xl font-semibold text-gray-800">Order Summary</h2>
                      <PaymentCard products={products} setShowPaypal={setShowPaypal} setPaymentVal={setPaymentVal} setShowCod={setShowCod} id={id} />
                    </section>
                </div>
            </div>
            {/* Show Paypal Button */}
            { showPaypal && <Paypal paymentVal={paymentVal} setShowPaypal={setShowPaypal} products={products} id={id} /> }
            { showCod && <Cod setShowCod={setShowCod} products={products} /> }
        </div>
    </>
  )
}

export default Checkout