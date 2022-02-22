
const PaymentCard = () => {
  return (
    <div className="w-full">
        <div className="flex justify-between items-center mt-5">
            <span>Subtotal(3 item/s)</span>
            <span>₱5000</span>
        </div>
        <div className="flex justify-between items-center mt-5">
            <span className="font-semibold text-gray-800 text-xl">Total</span>
            <span className="text-orange-500 font-semibold text-lg">₱5000</span>
        </div>
        <div className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-800">Payment Method</h2>
            <section className="w-1/2 flex items-center justify-between p-2 rounded shadow-xl mt-5 border border-gray-300">
                <span>Paypal</span>
                <input name="payment" type="radio" value="paypal" />
            </section>
            <section className="w-1/2 flex items-center justify-between p-2 rounded shadow-xl mt-5 border border-gray-300">
                <span>Cash on Delivery</span>
                <input name="payment" type="radio" value="cod" />
            </section>
            <button className="w-full bg-gray-900 text-gray-100 font-semibold p-2 mt-5 rounded">Place Order</button>
        </div>
    </div>
  )
}

export default PaymentCard