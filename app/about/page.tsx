import React from 'react'
import Heading from '../components/Heading'
import HowItWorks from './components/HowItWorks'

const page = () => {
    return (
        <>
            <div className='w-full pt-[10vh] px-5'>
                <div className='w-full flex flex-col md:flex-row items-end justify-between gap-5 pt-5'>
                    <Heading title="About Us" />
                    <p className='md:w-1/3 w-full'>
                        We combine Pakistani manufacturing strength with global quality standards to deliver reliable apparel production for brands worldwide.
                    </p>
                </div>
                <img src="https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg" alt="" className='w-full h-[90vh] object-cover py-5' />
                <div className='py-15 grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-5'>
                    <img src="https://i.pinimg.com/originals/e9/a1/95/e9a195242f14c700aec400a3490b8d4b.jpg" alt="" className='object-cover rounded-[2vw]' />
                    <div className='flex flex-col gap-2'>
                        <Heading title='Manufacturing Excellence from Pakistan' className='!text-[25px] font-semibold' />
                        <p>
                            Pakistan is one of the world's largest textile producers, with decades of expertise in cotton cultivation, knitting, dyeing, and garment construction. Our facilities leverage this heritage with modern equipment and global quality standards.
                        </p>
                        <p>
                            We operate ISO-certified production lines with capacity for 50,000+ units per month. Every order goes through multi-point quality inspection, and we maintain direct relationships with fabric mills for consistent material quality.
                        </p>
                    </div>
                    <img src="https://i.pinimg.com/1200x/4f/ef/fc/4feffc865f39f7b3f6484265c81e1fa5.jpg" alt="" className='row-span-2 object-cover rounded-[2vw]' />
                    <div className='col-span-2 grid grid-cols-2 gap-5'>
                        {[
                            {
                                title: "Monthly Capacity",
                                value: "50,000+ units"
                            },
                            {
                                title: "Quality Standard",
                                value: "AQL 2.5"
                            },
                            {
                                title: "Team Size",
                                value: "100+ workers"
                            },
                            {
                                title: "Export Markets",
                                value: "USA, Europe, Australia"
                            },
                        ].map((item, index) => (
                            <ul className='ios-card flex flex-col gap-2'>
                                <p className='font-semibold'>{item.title}</p>
                                <p>{item.value}</p>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            <div className='p-5'>
                <Heading title="Why Brands Choose Us" className='pb-2' />
                <p className='md:w-1/2 w-full pb-5'>
                    We combine Pakistani manufacturing strength with global quality standards to deliver reliable apparel production for brands worldwide.
                </p>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-5 px-5'>
                    {[
                        {
                            title:"Low MOQ — 50pcs",
                            des:"No massive commitments. Start with 50 units per style and scale as you grow.",
                            img:'/images/box.png'
                        },
                        {
                            title:"14-Day Lead Times",
                            des:"Core styles manufactured and shipped within two weeks of order confirmation.",
                            img:'/images/schedule.png'
                        },
                        {
                            title:"Direct Pricing",
                            des:"Factory-direct pricing with no middlemen. Transparent cost breakdowns per unit.",
                            img:'/images/price-tag.png'
                        },
                        {
                            title:"Quality Assured",
                            des:"AQL 2.5 inspection standards. Every batch tested before it leaves the facility.",
                            img:'/images/guarantee.png'
                        },
                    ].map((item, index) => (
                            <ul className='ios-card flex flex-col items-center gap-5'>
                                <img src={item.img} alt="" className='w-10 h-10 object-cover mb-5' />
                                <p className='font-semibold'>{item.title}</p>
                                <p className='text-center'>{item.des}</p>
                            </ul>
                        ))}
                </div>
            </div>
            <HowItWorks />
        </>
    )
}

export default page