'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from './Heading';
import ProductItem from './ProductItem';
import TransitionButton from './TransitionButton';

gsap.registerPlugin(ScrollTrigger);

interface NewArrivalProps {
    products: any[];
}

const NewArrival = ({ products }: NewArrivalProps) => {
    return (
        <div className="w-full min-h-1/2">
            {products && products.length > 0 && (
                <section className="w-full flex flex-col items-center gap-5">
                    <div className='flex flex-col md:flex-row justify-between md:items-start items-center gap-2 px-3 md:px-10 py-10'>
                        <Heading title='NEW ARRIVALS' className="w-full md:w-1/2" />
                        <p className='w-full md:w-1/3 md:text-left text-center'>Discover our latest collection of new arrivals, featuring the season's most sought-after styles and must-have pieces.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-6 md:gap-y-12 w-full px-3 md:px-10">
                        {products.map((product) => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </div>
                    <div className='w-1/2 flex flex-col gap-3 py-10 md:px-10'>
                        <p className='w-full md:w-[70%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet rerum cum aspernatur debitis ratione, error itaque laborum placeat illum ut quam, culpa quod eos exercitationem? Veniam accusamus error repudiandae. Ipsum?</p>
                        <TransitionButton text="View All Arrivals" url="/products" arrow={true} className="light-button" />
                    </div>
                </section>
            )}
        </div>
    );
};

export default NewArrival;