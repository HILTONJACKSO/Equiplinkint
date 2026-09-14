import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedStep } from "@/components/ui/animated-step";
import Image from "next/image";
import Link from "next/link";
import { Truck, MapPin, ShieldCheck, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { getSiteContent } from "@/app/actions/cms";

const TRANSPORT_SERVICES = [
  {
    id: "lowbed-40t",
    name: "40-Ton Lowbed Trailer",
    capacity: "40 Tons",
    description: "Perfect for transporting excavators, bulldozers, and heavy mining equipment across all terrains in Liberia.",
    price: "From $800/trip",
    image: "/images/fleet_lowbed_trailer.png"
  },
  {
    id: "flatbed-30t",
    name: "30-Ton Flatbed Truck",
    capacity: "30 Tons",
    description: "Ideal for construction materials, container haulage, and general heavy cargo delivery.",
    price: "From $500/trip",
    image: "/images/fleet_semi_truck.png"
  },
  {
    id: "dump-truck-20t",
    name: "20-Ton Dump Truck",
    capacity: "20 Tons",
    description: "Heavy-duty tipper trucks for moving sand, crushed rocks, and clearing large volumes of earth.",
    price: "From $400/day",
    image: "/images/fleet_loader.png"
  }
];

export default async function TransportPage() {
  const cms = await getSiteContent();
  const heroData = cms?.pages?.transport?.hero || {
    title: "Heavy Transport & <span className=\"text-amber-500\">Logistics</span>",
    subtitle: "Move your heaviest equipment securely across Liberia. From the Freeport of Monrovia to the most remote mining sites in Nimba, our specialized transport fleet is ready to deploy.",
    image: "/images/fleet_lowbed_trailer.png"
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      
      {/* Dark Premium Hero Section */}
      <main className="flex-1">
        <div className="bg-[#132238] pt-20 pb-32 border-b border-[#0B1220] relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: `url('${heroData.image}')` }} />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <AnimatedStep>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
                Nationwide Coverage
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-heading text-white max-w-3xl leading-tight" dangerouslySetInnerHTML={{ __html: heroData.title }} />
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
                {heroData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button render={<Link href="/request" />} nativeButton={false} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#132238] h-14 px-8 rounded-xl font-bold text-lg shadow-lg shadow-amber-500/20 hover:-translate-y-1 transition-all">
                  Book Transport
                </Button>
                <Button variant="outline" className="w-full sm:w-auto bg-transparent border-slate-700 text-white hover:bg-white/5 h-14 px-8 rounded-xl font-bold text-lg">
                  View Rates
                </Button>
              </div>
            </AnimatedStep>
          </div>
        </div>

        {/* Why Choose Our Transport */}
        <div className="max-w-7xl mx-auto px-4 py-24">
          <AnimatedStep>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#132238] font-heading mb-4">Logistics Built for Liberia</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">We understand the local terrain and infrastructure challenges better than anyone else.</p>
            </div>
          </AnimatedStep>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedStep delay={0.1}>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl hover:-translate-y-1 transition-transform h-full">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-[#132238] mb-3">Remote Site Access</h3>
                <p className="text-slate-500 leading-relaxed">Our experienced drivers and specialized lowbeds can navigate challenging unpaved roads to reach deep mining and construction sites.</p>
              </div>
            </AnimatedStep>

            <AnimatedStep delay={0.2}>
              <div className="bg-[#132238] p-8 rounded-[2rem] shadow-xl hover:-translate-y-1 transition-transform h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldCheck className="w-32 h-32 text-white" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20">
                  <ShieldCheck className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">Fully Insured Cargo</h3>
                <p className="text-slate-400 leading-relaxed relative z-10">Every piece of equipment we haul is fully covered by comprehensive transit insurance, giving you total peace of mind.</p>
              </div>
            </AnimatedStep>

            <AnimatedStep delay={0.3}>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl hover:-translate-y-1 transition-transform h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-[#132238] mb-3">On-Time Delivery</h3>
                <p className="text-slate-500 leading-relaxed">Downtime is expensive. We utilize GPS tracking and strict dispatch protocols to ensure your machinery arrives precisely when scheduled.</p>
              </div>
            </AnimatedStep>
          </div>
        </div>

        {/* Transport Fleet */}
        <div className="bg-white py-24 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatedStep>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#132238] font-heading mb-4">Our Transport Fleet</h2>
                  <p className="text-slate-500 text-lg max-w-xl">Heavy-duty trucks and trailers maintained to rigorous standards.</p>
                </div>
                <Button render={<Link href="/request" />} nativeButton={false} variant="outline" className="border-slate-300 text-[#132238] hover:bg-slate-50 h-12 rounded-xl font-bold px-6">
                  Request Custom Haulage <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </AnimatedStep>

            <div className="grid lg:grid-cols-3 gap-8">
              {TRANSPORT_SERVICES.map((service, i) => (
                <AnimatedStep key={service.id} delay={i * 0.1}>
                  <div className="bg-[#F8FAFC] rounded-[2rem] overflow-hidden border border-slate-200 group hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-64 w-full bg-slate-200 overflow-hidden">
                      <Image 
                        src={service.image} 
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5 rounded-lg text-sm font-bold text-[#132238] shadow-sm">
                        <Truck className="h-4 w-4 text-amber-500" />
                        {service.capacity}
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-heading font-bold text-2xl text-[#132238] mb-2">{service.name}</h3>
                      <div className="font-bold text-amber-600 text-lg mb-4">{service.price}</div>
                      <p className="text-slate-500 mb-8 flex-1 leading-relaxed">{service.description}</p>
                      
                      <Button render={<Link href="/request" />} nativeButton={false} className="w-full bg-[#132238] hover:bg-[#132238]/90 text-white rounded-xl h-14 font-bold text-lg mt-auto">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </AnimatedStep>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
