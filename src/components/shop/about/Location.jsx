
const Location = () => {
  return (
   <>
    <div className="content">
        <div className="max-content py-20">
            <h1 className="font-semibold text-4xl uppercase text-gray-800">Our Location</h1>
        </div>
    </div>
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.686503362786!2d120.85162561466198!3d14.387541389938464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33962c86ebd844c7%3A0x67cb4930ead5600b!2sTulin%20Bicycle%20and%20Repair%20Shop!5e0!3m2!1sen!2sph!4v1644061893201!5m2!1sen!2sph" 
        title="Tulin Bike Map" 
        className="w-full invert" 
        height="450" 
        style={{ border:"0" }} 
        allowFullScreen="" 
        loading="lazy">
    </iframe>
   </>
  );
};

export default Location;
