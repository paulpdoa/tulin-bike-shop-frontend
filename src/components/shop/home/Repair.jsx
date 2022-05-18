import { Link } from 'react-router-dom';

const Repair = () => {
  return (
    <section className="content md:h-screen py-20">
        <div className="max-content flex flex-col justify-center">
            <div className="flex justify-center">
              <h1 className="md:text-5xl text-4xl border-b-8 border-gray-300">Need <span className="font-bold">Repairs</span>?</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-3 md:py-10 py-20">
              <div className="relative flex items-center justify-center">
                <img className="absolute md:w-9/12 w-1/3 z-20 md:-top-24 md:-left-14 left-28 -top-5" src="/image/repair/frame.png" alt="frame" />
                <img className="md:w-9/12 w-1/3 z-10" src="/image/repair/Rectangle.png" alt="rectangle" />
                <img className="absolute md:w-9/12 w-1/3 z-30 md:-bottom-24 md:-right-14 right-28 -bottom-14" src="/image/repair/repairman.png" alt="repair man" />
              </div>
              <article className="text-gray-800 px-20 md:w-1/2 w-full py-20 md:py-0">
                <p>We make sure that your bicycle will be repaired and your safety is our priority. Having a schedule in our store is better than walking in for bicycle repairs</p>
                <div className="mt-5">
                  <Link to='/reservation' className="bg-gray-800 text-gray-200 p-2 w-36 hover:bg-transparent hover:border-2 hover:border-gray-800 hover:text-gray-800 transition duration-300 cursor-pointer">Schedule now</Link>
                </div>
              </article>
            </div>
        </div>
    </section>
  )
}

export default Repair