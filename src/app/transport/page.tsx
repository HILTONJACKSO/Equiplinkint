import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedStep } from "@/components/ui/animated-step";
import Image from "next/image";
import Link from "next/link";
import { Truck, MapPin, ShieldCheck, Clock, ArrowRight, CheckCircle2, ChevronRight, Package, Navigation, Zap } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Modern Split Hero Section */}
        <div className="bg-[#0f172a] relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Text Content */}
              <AnimatedStep>
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Navigation className="w-3.5 h-3.5" />
                    Nationwide Coverage
                  </div>
                  
                  <h1 
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 font-heading text-white leading-[1.1]" 
                    dangerouslySetInnerHTML={{ __html: heroData.title }} 
                  />
                  
                  <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
                    {heroData.subtitle}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button render={<Link href="/request" />} nativeButton={false} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#0f172a] h-14 px-8 rounded-xl font-bold text-lg transition-transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20">
                      Book Transport
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10 h-14 px-8 rounded-xl font-bold text-lg backdrop-blur-sm transition-all">
                      View Rates
                    </Button>
                  </div>
                  
                  <div className="mt-12 flex items-center gap-6 text-sm font-medium text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" /> Fully Insured
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" /> GPS Tracked
                    </div>
                  </div>
                </div>
              </AnimatedStep>

              {/* Right Column: Hero Image */}
              <AnimatedStep delay={0.2}>
                <div className="relative w-full aspect-[4/3] lg:aspect-square max-h-[600px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                  <Image 
                    src={heroData.image} 
                    alt="Heavy Transport Fleet" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Floating Metric Card */}
                  <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Truck className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">40+ Tons</div>
                        <div className="text-sm font-medium text-slate-300">Max Haul Capacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedStep>
            </div>
          </div>
        </div>

        {/* Features / Why Choose Us */}
        <div className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatedStep>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading mb-4">Logistics Built for Liberia</h2>
                <p className="text-slate-600 text-lg">We understand the local terrain and infrastructure challenges better than anyone else, ensuring your equipment arrives safely and on time.</p>
              </div>
            </AnimatedStep>

            <div className="grid md:grid-cols-3 gap-6">
              <AnimatedStep delay={0.1}>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
                    <MapPin className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Remote Site Access</h3>
                  <p className="text-slate-600 leading-relaxed flex-1">Our experienced drivers and specialized lowbeds can navigate challenging unpaved roads to reach deep mining and construction sites.</p>
                </div>
              </AnimatedStep>

              <AnimatedStep delay={0.2}>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Fully Insured Cargo</h3>
                  <p className="text-slate-600 leading-relaxed flex-1">Every piece of equipment we haul is fully covered by comprehensive transit insurance, giving you total peace of mind from pickup to dropoff.</p>
                </div>
              </AnimatedStep>

              <AnimatedStep delay={0.3}>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6">
                    <Clock className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">On-Time Delivery</h3>
                  <p className="text-slate-600 leading-relaxed flex-1">Downtime is expensive. We utilize GPS tracking and strict dispatch protocols to ensure your machinery arrives precisely when scheduled.</p>
                </div>
              </AnimatedStep>
            </div>
          </div>
        </div>

        {/* Transport Fleet */}
        <div className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatedStep>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 bg-amber-100 text-amber-700">
                    <Package className="w-3.5 h-3.5" />
                    Available Fleet
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading mb-4">Our Transport Fleet</h2>
                  <p className="text-slate-600 text-lg">Heavy-duty trucks and trailers maintained to rigorous standards, ready to handle any load capacity.</p>
                </div>
                <Button render={<Link href="/request" />} nativeButton={false} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 h-12 rounded-xl font-semibold px-6 shrink-0">
                  Request Custom Haulage <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </AnimatedStep>

            <div className="grid lg:grid-cols-3 gap-8">
              {TRANSPORT_SERVICES.map((service, i) => (
                <AnimatedStep key={service.id} delay={i * 0.1}>
                  <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                      <Image 
                        src={service.image} 
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 flex items-center gap-1.5 rounded-lg text-sm font-bold text-slate-900 shadow-sm">
                        <Truck className="h-4 w-4 text-blue-600" />
                        {service.capacity}
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                      <div className="font-semibold text-amber-600 text-lg mb-4">{service.price}</div>
                      <p className="text-slate-600 mb-8 flex-1 leading-relaxed">{service.description}</p>
                      
                      <Button render={<Link href="/request" />} nativeButton={false} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-semibold mt-auto">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </AnimatedStep>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500 to-transparent opacity-50"></div>
          
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <AnimatedStep>
              <h2 className="text-3xl md:text-5xl font-bold text-white font-heading mb-6">Need to move something massive?</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Contact our logistics experts today for a custom quote on oversized loads and complex remote deliveries.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button render={<Link href="/request" />} nativeButton={false} className="bg-white text-blue-600 hover:bg-slate-50 h-14 px-8 rounded-xl font-bold text-lg shadow-lg">
                  Get a Custom Quote
                </Button>
                <Button variant="outline" className="bg-transparent border-blue-400 text-white hover:bg-blue-700 h-14 px-8 rounded-xl font-bold text-lg">
                  Call +231 77 000 0000
                </Button>
              </div>
            </AnimatedStep>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
