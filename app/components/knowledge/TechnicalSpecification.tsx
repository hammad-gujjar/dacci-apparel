import React from 'react';
import { KnowledgeTechnicalSpecs } from '@/lib/seo/knowledgeData';
import { IoSpeedometerOutline } from 'react-icons/io5';

interface TechnicalSpecificationProps {
    specs: KnowledgeTechnicalSpecs;
}

export default function TechnicalSpecification({ specs }: TechnicalSpecificationProps) {
    if (!specs || !specs.headers || !specs.rows || specs.rows.length === 0) {
        return null;
    }

    return (
        <section className="w-full max-w-5xl mx-auto px-5 md:px-10 py-10 space-y-6">
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 font-[middle]">
                    <IoSpeedometerOutline className="text-sm text-neutral-700" />
                    <span>Technical Reference Matrix</span>
                </div>
                <h2 className="font-[main] text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#111111]">
                    {specs.title}
                </h2>
                <p className="font-[middle] text-xs sm:text-sm text-neutral-600 max-w-2xl">
                    {specs.subtitle}
                </p>
            </div>

            {/* Responsive Table Container */}
            <div className="w-full bg-white/80 border border-black/15 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[640px]">
                        <thead>
                            <tr className="bg-[#111111] text-[#EDEEE7]">
                                {specs.headers.map((header, hIdx) => (
                                    <th
                                        key={hIdx}
                                        className="py-4 px-5 text-[11px] font-bold uppercase tracking-wider font-[main] border-b border-neutral-800"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/10 font-[middle] text-xs sm:text-sm text-neutral-800">
                            {specs.rows.map((row, rIdx) => (
                                <tr
                                    key={rIdx}
                                    className={`transition-colors hover:bg-black/5 ${
                                        rIdx % 2 === 1 ? 'bg-black/[0.02]' : 'bg-transparent'
                                    }`}
                                >
                                    {row.map((cell, cIdx) => (
                                        <td
                                            key={cIdx}
                                            className={`py-4 px-5 leading-relaxed ${
                                                cIdx === 0
                                                    ? 'font-bold text-[#111111] font-[main] text-xs'
                                                    : 'text-neutral-700'
                                            }`}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer Note */}
                <div className="p-4 bg-black/5 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-[11px] text-neutral-500 font-[middle]">
                    <span>* Engineering values measured under standard ASTM / ISO testing laboratory atmospheric controls.</span>
                    <span className="font-bold text-neutral-700 uppercase tracking-wider">Slots Sportswear OEM QA Standard</span>
                </div>
            </div>
        </section>
    );
}
