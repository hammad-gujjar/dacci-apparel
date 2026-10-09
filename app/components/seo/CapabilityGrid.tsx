import React from 'react';
import { SolutionCapability, SolutionFabric, SolutionCustomization } from '@/lib/seo/solutionsData';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

interface CapabilityGridProps {
    capabilities: SolutionCapability[];
    fabrics: SolutionFabric[];
    customization: SolutionCustomization[];
}

export default function CapabilityGrid({
    capabilities,
    fabrics,
    customization,
}: CapabilityGridProps) {
    return (
        <section id="capabilities" className="w-full py-16 sm:py-24 px-5 md:px-10 max-w-7xl mx-auto space-y-20">
            {/* 1. Core Manufacturing Capabilities */}
            <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 font-[middle]">
                        Factory Floor Technology
                    </span>
                    <h2 className="font-[main] text-xl sm:text-3xl uppercase tracking-tight text-[#111111]">
                        Specialized Production Capabilities
                    </h2>
                    <p className="font-[middle] text-xs sm:text-sm text-neutral-600">
                        High-precision machinery, automated fabric spreading, vision laser cutting, and Japanese wide-format sublimation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {capabilities.map((cap, idx) => (
                        <div
                            key={idx}
                            className="bg-white/60 border border-black/10 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-black/25 transition-all shadow-xs"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-[middle]">
                                Department 0{idx + 1}
                            </span>
                            <h3 className="font-[main] text-base sm:text-lg font-bold uppercase tracking-tight text-[#111111]">
                                {cap.title}
                            </h3>
                            <p className="font-[middle] text-xs sm:text-sm text-neutral-600 leading-relaxed">
                                {cap.description}
                            </p>
                            <div className="pt-3 border-t border-black/5 space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-[middle] block">
                                    Technical Deliverables:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {cap.specs.map((spec, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="px-2.5 py-1 rounded-full bg-black/5 text-neutral-800 text-[10px] font-[middle] font-semibold flex items-center gap-1"
                                        >
                                            <IoCheckmarkCircleOutline className="text-xs text-neutral-700" />
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Technical Materials & Fabrics Matrix */}
            <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 font-[middle]">
                        Textile Sourcing
                    </span>
                    <h2 className="font-[main] text-xl sm:text-3xl uppercase tracking-tight text-[#111111]">
                        High-Performance Athletic Fabrics
                    </h2>
                    <p className="font-[middle] text-xs sm:text-sm text-neutral-600">
                        Mill-direct yarn sourcing with custom dyeing, antibacterial treatments, and moisture-wicking finishes.
                    </p>
                </div>

                <div className="overflow-x-auto bg-white/70 border border-black/10 rounded-3xl shadow-xs">
                    <table className="w-full text-left border-collapse text-xs font-[middle]">
                        <thead>
                            <tr className="border-b border-black/10 bg-black/5 text-[10px] uppercase tracking-wider font-bold text-neutral-700">
                                <th className="p-4 sm:p-5">Fabric Name</th>
                                <th className="p-4 sm:p-5">Fabric Weight</th>
                                <th className="p-4 sm:p-5">Composition</th>
                                <th className="p-4 sm:p-5">Optimal Applications</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {fabrics.map((fabric, idx) => (
                                <tr key={idx} className="hover:bg-black/[0.02] transition-colors">
                                    <td className="p-4 sm:p-5 font-bold text-[#111111]">{fabric.name}</td>
                                    <td className="p-4 sm:p-5 text-neutral-600 tabular-nums">{fabric.weight}</td>
                                    <td className="p-4 sm:p-5 text-neutral-600">{fabric.composition}</td>
                                    <td className="p-4 sm:p-5 font-medium text-neutral-800">{fabric.bestFor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 3. Customization & Branding Options */}
            <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 font-[middle]">
                        Embellishment & Trims
                    </span>
                    <h2 className="font-[main] text-xl sm:text-3xl uppercase tracking-tight text-[#111111]">
                        Bespoke Customization Techniques
                    </h2>
                    <p className="font-[middle] text-xs sm:text-sm text-neutral-600">
                        Multi-method decoration capabilities supporting luxury athleisure, professional teamwear, and private label apparel.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {customization.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white/60 border border-black/10 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-black/25 transition-all shadow-xs"
                        >
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 font-[middle]">
                                        Option 0{idx + 1}
                                    </span>
                                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-900 text-white font-[middle]">
                                        MOQ {item.moq}
                                    </span>
                                </div>
                                <h3 className="font-[main] text-sm font-bold uppercase tracking-tight text-[#111111]">
                                    {item.name}
                                </h3>
                                <p className="font-[middle] text-xs text-neutral-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
