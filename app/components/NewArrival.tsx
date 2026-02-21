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
                <section className="w-full py-5 md:py-15 flex flex-col items-center gap-10">
                    <Heading title="NEW ARRIVALS" className="py-2 md:py-5" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-6 md:gap-y-12 w-full px-3 md:px-10">
                        {products.map((product) => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </div>
                    <div className='w-1/2 flex flex-col gap-3 p-3 md:px-10'>
                        <p className='w-full md:w-[70%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet rerum cum aspernatur debitis ratione, error itaque laborum placeat illum ut quam, culpa quod eos exercitationem? Veniam accusamus error repudiandae. Ipsum?</p>
                        <TransitionButton text="View All Arrivals" url="/products" arrow={true} className="light-button" />
                    </div>
                </section>
            )}
        </div>
    );
};

export default NewArrival;