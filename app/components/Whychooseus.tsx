import React from 'react';
import Heading from './Heading';

const Whychooseus = () => {

    const services = [
        {
            num: "01",
            title: "WORLDWIDE B2B FULFILLMENT",
            desc: "Delivering your bulk golf apparel securely and on schedule. We provide hassle-free logistics and door-to-door shipping across North America, Europe, and Australia."
        },
        {
            num: "02",
            title: "PREMIUM GOLF CRAFTSMANSHIP",
            desc: "Utilizing advanced moisture-wicking fabrics and precision stitching to guarantee comfort, durability, and elite performance on the golf course."
        },
        {
            num: "03",
            title: "FULL OEM & ODM SOLUTIONS",
            desc: "Bring your unique designs to life. From initial tech packs and rapid sampling to scalable bulk production with flexible MOQs tailored for emerging and established brands."
        }
    ];

    return (
        < div className="w-full flex flex-col items-center w-full w-full mx-auto px-[2vw] py-20" >
            <h1 className='w-fit !text-[#EDEEE7] text-center' >WHY PARTNER WITH US</h1>
            <p className="mb-10 text-center max-w-2xl text-[#EDEEE7]/80">
                Empowering global golf brands with premium manufacturing, flexible production, and reliable export services.
            </p>

            <div className="flex flex-col w-full">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col md:flex-row items-start md:items-center py-10 px-4 md:px-5 border-b border-[#EDEEE7]/70 hover:border-transparent transition-all duration-700 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] z-10 hover:z-20"
                    >
                        {/* Sliding Background Container (isolated overflow-hidden for shadow support) */}
                        <div className="absolute inset-0 overflow-hidden z-0">
                            <div className="absolute inset-0 bg-[#EDEEE7] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
                        </div>

                        <span className="relative z-10 text-5xl md:text-6xl font-bold text-[#EDEEE7]/80 group-hover:text-black transition-all duration-500 w-24 md:w-32 transform group-hover:-translate-y-1">
                            {service.num}
                        </span>
                        <div className="relative z-10 flex-1 mt-4 md:mt-0 flex flex-col md:flex-row md:items-center justify-between w-full">
                            <h2 className="md:w-2/5 group-hover:translate-x-4 transition-all duration-500 text-[#EDEEE7] group-hover:text-black">
                                {service.title}
                            </h2>
                            <p className="md:w-[50%] mt-3 md:mt-0 text-[#EDEEE7] group-hover:text-black/80 transition-colors duration-500">
                                {service.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
export default Whychooseus;