'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const machines = [
  {
    id: 'excavator',
    name: 'Excavator',
    tagline: 'Heavy Digging & Trenching',
    description: 'Tackle the toughest terrain with our fleet of high-performance excavators. Perfect for deep trenching, foundation digging, and large-scale earthmoving operations.',
    image: '/images/cat_336_excavator.png',
    features: ['High breakout force', 'Precision controls', 'Fuel efficient']
  },
  {
    id: 'truck',
    name: 'Truck',
    tagline: 'Long-Haul Payload Transport',
    description: 'Move massive volumes of material quickly and efficiently. Our rugged dump trucks and semi-trucks are built for relentless continuous hauling over long distances.',
    image: '/images/fleet_semi_truck.png',
    features: ['High payload capacity', 'Off-road capable', 'Durable build']
  },
  {
    id: 'lowbed',
    name: 'Lowbed Trailer',
    tagline: 'Oversized Equipment Hauling',
    description: 'Safely transport your oversized and overweight machinery across the country. Our heavy-duty lowbed trailers ensure stable and secure hauling for any behemoth.',
    image: '/images/fleet_lowbed_trailer.png',
    features: ['Low clearance', 'High weight rating', 'Secure tie-downs']
  },
  {
    id: 'crane',
    name: 'Crane',
    tagline: 'Heavy Lifting & Positioning',
    description: 'Reach new heights with our mobile and crawler cranes. Designed for maximum stability and precision lifting in complex construction and industrial environments.',
    image: '/images/fleet_crane.png',
    features: ['Long reach boom', 'High lift capacity', 'Advanced load monitoring']
  },
  {
    id: 'bulldozer',
    name: 'Bulldozer',
    tagline: 'Earthmoving & Grading',
    description: 'Push, level, and clear with unstoppable force. Our track dozers deliver unmatched traction and blade capacity for serious site preparation and grading.',
    image: '/images/komatsu_d65_bulldozer.png',
    features: ['Tracked stability', 'Heavy-duty blade', 'Ripper attachments']
  },
  {
    id: 'loader',
    name: 'Wheel Loader',
    tagline: 'Material Handling & Loading',
    description: 'Accelerate your material handling. With large bucket capacities and fast cycle times, our wheel loaders make quick work of stockpiling and truck loading.',
    image: '/images/fleet_loader.png',
    features: ['Fast cycle times', 'Large bucket volume', 'Articulated steering']
  },
  {
    id: 'forklift',
    name: 'Forklift',
    tagline: 'Warehouse & Site Logistics',
    description: 'Keep your logistics flowing smoothly. From smooth warehouse floors to rugged outdoor yards, our forklifts provide reliable pallet and material lifting.',
    image: '/images/fleet_forklift.png',
    features: ['High maneuverability', 'Versatile lifting', 'Compact design']
  }
];

export function MachineShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold text-amber-600 bg-amber-50 tracking-widest uppercase mb-4 border border-amber-100">
            Our Complete Fleet
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-[#132238] mb-4">
            Machinery for Every Mission
          </h2>
          <p className="text-slate-500 text-lg">
            Explore our extensive lineup of heavy-duty equipment ready to be dispatched to your site.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Left Side: Tabs */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar snap-x">
            {machines.map((machine, index) => (
              <button
                key={machine.id}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 snap-start text-left px-6 py-4 rounded-2xl transition-all duration-300 relative group ${
                  activeIndex === index 
                    ? 'bg-[#132238] text-white shadow-xl scale-[1.02]' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-lg md:text-xl relative z-10">{machine.name}</div>
                <div className={`text-sm mt-1 relative z-10 ${activeIndex === index ? 'text-amber-400' : 'text-slate-400'}`}>
                  {machine.tagline}
                </div>
                
                {/* Active Indicator Arrow (Desktop only) */}
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#132238] rotate-45 hidden lg:block rounded-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Side: Image and Details Showcase */}
          <div className="w-full lg:w-2/3 relative min-h-[500px] lg:min-h-[600px] bg-slate-50 rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-inner overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col h-full relative z-10"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl md:text-4xl font-extrabold font-heading text-[#132238] mb-2"
                    >
                      {machines[activeIndex].name}
                    </motion.h3>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block px-3 py-1 bg-amber-500/10 text-amber-600 font-bold rounded-lg text-sm"
                    >
                      {machines[activeIndex].tagline}
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link 
                      href={`/request?equipment=${machines[activeIndex].id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#132238] hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Request Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>

                <div className="flex-1 relative w-full min-h-[250px] md:min-h-[350px] mb-8 group">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image 
                      src={machines[activeIndex].image} 
                      alt={machines[activeIndex].name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#132238]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {machines[activeIndex].description}
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col justify-center space-y-3"
                  >
                    {machines[activeIndex].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="font-semibold text-[#132238]">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

              </motion.div>
            </AnimatePresence>
            
            {/* Background Decorative element */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
