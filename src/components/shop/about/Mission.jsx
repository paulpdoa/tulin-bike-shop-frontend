
const Mission = () => {
  return (
    <div className="content">
        <div className="max-content py-20">
            <h1 className="font-semibold text-4xl uppercase text-gray-800">Our mission</h1>
            <div className="flex items-center justify-center gap-10 mt-5">
                <p className="text-justify w-1/2 font-semibold text-lg text-gray-800">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto exercitationem quis, minima porro veritatis repellat dolorum blanditiis cupiditate repellendus temporibus beatae autem fuga totam labore, sequi sint! Quam molestias dicta mollitia consequuntur nobis quae enim error pariatur, temporibus perspiciatis ipsa?</p>
                <div className="overflow-hidden w-1/3">
                  <img className="row-span-1 col-span-2 object-cover w-full h-24 rounded-lg" src="/image/tulinfront.jpg" alt="Tulin Front" />
                  <div className="flex gap-2 mt-5">
                    <img className="row-span-1 col-span-1 object-cover w-1/2 h-24 rounded-lg" src="/image/tulinfronttop.jpg" alt="Tulin Front" />
                    <img className="row-span-1 col-span-1 object-cover w-1/2 h-24 rounded-lg" src="/image/bikefront.jpg" alt="Tulin Front" />
                  </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Mission;
