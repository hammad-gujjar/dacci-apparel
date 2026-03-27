'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { cn } from '@/lib/utils';
import Heading from './Heading';

gsap.registerPlugin(ScrollTrigger);

interface StatData {
    totalCustomers: number;
    totalProducts: number;
    totalOrders: number;
    averageRating: number;
}

const CompanyStats = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [stats, setStats] = useState<StatData | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('/api/public/stats');
                if (data.success) {
                    setStats(data.data);
                }
            } catch (err) {
                console.error('Error fetching company stats:', err);
            }
        };
        fetchStats();
    }, []);

    useGSAP(() => {
        if (!stats) return;

        const section = containerRef.current;
        if (!section) return;

        const statItems = section.querySelectorAll('.stat-item');

        gsap.fromTo(statItems,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    once: true,
                }
            }
        );
    }, { dependencies: [stats], scope: containerRef });

    if (!stats) return null;

    const statItems = [
        { label: 'Total Customers', value: stats.totalCustomers, suffix: '+' },
        { label: 'Avg. Rating', value: stats.averageRating, isFloat: true, suffix: '+' },
        { label: 'Total Orders', value: stats.totalOrders, suffix: '+' },
        { label: 'Products', value: stats.totalProducts, suffix: '+' },
    ];

    return (
        <section ref={containerRef} className="py-15 px-5">
            <div className="max-w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                    <div className='flex flex-col gap-3'>
                        <Heading title='We have reach there' />
                        <p className='md:w-[80%]'>This is the allover details about our company and we are progressing now and (INSHA'ALLAH) you will see our real promotion.</p>
                    </div>
                    <div className='grid grid-cols-2 justify-between gap-x-10 gap-y-5'>
                        {statItems.map((item, index) => (
                            <div key={index} className="stat-item flex flex-col items-center justify-center text-center space-y-2">
                                <div className="relative flex items-center">
                                    <h2 className="stat-value font-bold">
                                        {item.isFloat
                                            ? item.value.toFixed(1)
                                            : item.value.toLocaleString()}
                                    </h2>
                                    <h3 className="">
                                        {item.suffix}
                                    </h3>
                                </div>
                                <div className="w-12 h-[1px] bg-black/10 rounded-full" />
                                <p className="uppercase">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyStats;
