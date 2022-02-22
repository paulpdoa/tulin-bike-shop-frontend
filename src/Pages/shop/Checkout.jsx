import { Helmet } from 'react-helmet';
import OrderedItem from '../../components/shop/checkout/OrderedItem';
import PaymentCard from '../../components/shop/checkout/PaymentCard';

const Checkout = () => {

  return (
    <>
        <Helmet><title>Tulin Bicycle Shop | Checkout</title></Helmet>
        <div className="content h-screen">
            <div className="max-content flex flex-col justify-center w-full">
                <section className="flex items-center gap-5">
                  <img className="w-32 h-32 object-cover" src="/image/tulin.png" alt="Tulin Logo" />
                  <h1 className="text-4xl font-semibold uppercase text-gray-800">Checkout</h1>
                </section>
                <div className="flex gap-20">
                    <section className="shadow-2xl bg-white p-5 w-1/2 h-96 rounded overflow-y-scroll">
                      <h2 className="text-3xl font-semibold text-gray-800">Ordered Items</h2>
                      <OrderedItem />   
                    </section>
                    <section className="shadow-2xl bg-white p-5 w-1/2 h-auto rounded">
                      <h2 className="text-3xl font-semibold text-gray-800">Order Summary</h2>
                      <PaymentCard />
                    </section>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout