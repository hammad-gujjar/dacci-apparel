'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from './Heading';
import ProductItem from './ProductItem';

gsap.registerPlugin(ScrollTrigger);

interface NewArrivalProps {
    products: any[];
}

const NewArrival = ({ products }: NewArrivalProps) => {
    return (
        <div className="w-full min-h-1/2 py-20">
            {products && products.length > 0 && (
                <section className="w-full flex flex-col items-center gap-5">
                    <div className='flex flex-col md:flex-row justify-between md:items-start items-center gap-2 px-5 pb-5'>
                        <Heading title='NEW ARRIVALS' className="w-full md:w-1/2" />
                        <p className='w-full md:w-1/3 md:text-left text-center'>Discover our latest collection of new arrivals, featuring the season's most sought-after styles and must-have pieces.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-6 md:gap-y-10 w-full px-3 md:px-5">
                        {products.map((product) => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default NewArrival;