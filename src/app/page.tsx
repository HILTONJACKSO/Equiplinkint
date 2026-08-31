import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { mockEquipment } from "@/lib/data";
import { AnimatedStep } from "@/components/ui/animated-step";
import { MachineShowcase } from "@/components/ui/machine-showcase";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Globe,
  TrendingUp,
  Award,
  ArrowRight,
  ShieldCheck,
  Star,
  Package,
  Wrench,
  Truck,
  Waves,
  MapPin,
  ArrowDown,
  Clock,
  Search,
  Calendar,
  Clock as ClockIcon,
  FileText,
  Shield,
  Map,
  CreditCard,
  CheckCircle2
} from "lucide-react";

export default function Home() {
  const featuredEquipment = mockEquipment.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[50vh] flex flex-col pt-16 pb-32 z-20 -mt-16">
          <div className="absolute inset-0 overflow-hidden bg-[#0B1220]">
            <Image 
              src="/images/hero_excavator_right.png"
              alt="Excavator Hero"
              fill
              className="object-cover object-right lg:object-[85%_center]"
              priority
            />
            {/* Deep dark gradient on the left side to make text pop, fading out to the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/80 to-transparent w-full md:w-3/4 lg:w-2/3" />
            {/* Bottom gradient to smoothly blend into the search bar */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-90" />
          </div>

          <div className="max-w-7xl mx-auto px-4 w-full relative z-10 flex-1 flex flex-col justify-center mt-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-sm font-bold text-amber-500 tracking-widest uppercase">
                  LIBERIA'S HEAVY EQUIPMENT MARKETPLACE
                </div>
                <div className="h-px w-16 bg-amber-500" />
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 leading-[1.1] tracking-tight">
                <span className="text-white block">Move Big.</span>
                <span className="text-amber-500 block">Build Bigger.</span>
              </h1>
              
              <p className="text-white/80 text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed max-w-xl">
                Find trusted heavy equipment, trucks, operators, and logistics services across Liberia — all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button nativeButton={false} render={<Link href="/equipment" />} className="bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl px-8 h-14 text-base flex items-center justify-center gap-2 w-full sm:w-auto">
                  <Search className="w-5 h-5" /> Find Equipment <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button nativeButton={false} render={<Link href="/request" />} variant="outline" className="rounded-xl h-14 px-8 border-white/30 text-white bg-transparent hover:bg-white/10 flex items-center justify-center gap-2 backdrop-blur-sm w-full sm:w-auto">
                  <FileText className="w-5 h-5" /> Request Equipment <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* FLOATING SEARCH BAR */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 px-4">
            <form action="/equipment" method="GET" className="max-w-6xl mx-auto bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200 text-black">
              
              <div className="flex-1 p-3 md:p-4 w-full flex items-center gap-3 md:gap-4 min-w-0 group hover:bg-gray-50 transition-colors rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-gray-900 mb-0.5 truncate">What do you need?</div>
                  <select name="category" className="w-full bg-transparent outline-none text-sm text-gray-500 font-medium cursor-pointer appearance-none truncate">
                    <option value="">Select equipment or service</option>
                    <option value="excavator">Excavators</option>
                    <option value="bulldozer">Bulldozers</option>
                    <option value="loader">Loaders</option>
                    <option value="crane">Cranes</option>
                    <option value="transport">Lowbed Transport</option>
                  </select>
                </div>
                <ArrowDown className="w-4 h-4 text-gray-400 shrink-0 ml-auto pointer-events-none" />
              </div>

              <div className="flex-1 p-3 md:p-4 w-full flex items-center gap-3 md:gap-4 min-w-0 group hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-gray-900 mb-0.5 truncate">Where?</div>
                  <select name="location" className="w-full bg-transparent outline-none text-sm text-gray-500 font-medium cursor-pointer appearance-none truncate">
                    <option value="monrovia">Monrovia, Liberia</option>
                    <option value="buchanan">Buchanan</option>
                    <option value="gbarnba">Gbarnga</option>
                    <option value="harbel">Harbel</option>
                    <option value="kakata">Kakata</option>
                  </select>
                </div>
                <ArrowDown className="w-4 h-4 text-gray-400 shrink-0 ml-auto pointer-events-none" />
              </div>

              <div className="flex-1 p-3 md:p-4 w-full flex items-center gap-3 md:gap-4 min-w-0 group hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-gray-500 shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-gray-900 mb-0.5 truncate">When?</div>
                  <input type="date" name="date" className="w-full bg-transparent outline-none text-sm text-gray-500 font-medium cursor-pointer appearance-none truncate uppercase" />
                </div>
              </div>

              <div className="flex-1 p-3 md:p-4 w-full flex items-center gap-3 md:gap-4 min-w-0 group hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <ClockIcon className="w-5 h-5 text-gray-500 shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-gray-900 mb-0.5 truncate">Duration</div>
                  <select name="duration" className="w-full bg-transparent outline-none text-sm text-gray-500 font-medium cursor-pointer appearance-none truncate">
                    <option value="1">1 Day</option>
                    <option value="3">3 Days</option>
                    <option value="7">1 Week</option>
                    <option value="30">1 Month</option>
                    <option value="custom">Custom Duration</option>
                  </select>
                </div>
                <ArrowDown className="w-4 h-4 text-gray-400 shrink-0 ml-auto pointer-events-none" />
              </div>

              <div className="p-2 w-full md:w-auto flex items-center justify-center shrink-0">
                <Button type="submit" className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-black font-bold h-14 px-6 md:px-8 rounded-xl flex items-center justify-center gap-2">
                  <Search className="w-5 h-5 shrink-0" /> <span className="truncate">Search</span>
                </Button>
              </div>

            </form>
          </div>
        </section>

        {/* INTERACTIVE MACHINE SHOWCASE SECTION */}
        <div className="pt-32 md:pt-24 border-b border-[#E2E8F0]">
          <MachineShowcase />
        </div>

        {/* TRUST BADGES SECTION */}
        <section className="pt-24 pb-16 bg-[#132238] border-b border-[#0B1220]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 sm:gap-y-8 gap-x-8 divide-y sm:divide-y-0 sm:divide-x divide-[#2A3441]">
              <div className="flex items-center gap-4 px-4 justify-start py-6 sm:py-0">
                <Shield className="w-8 h-8 text-amber-500 shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-bold text-sm text-white">Verified Suppliers</div>
                  <div className="text-xs text-slate-300 mt-0.5">Trusted & background checked</div>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 justify-start py-6 sm:py-0">
                <Truck className="w-8 h-8 text-amber-500 shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-bold text-sm text-white">Wide Selection</div>
                  <div className="text-xs text-slate-300 mt-0.5">Equipment, trucks, boats & more</div>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 justify-start py-6 sm:py-0">
                <Map className="w-8 h-8 text-amber-500 shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-bold text-sm text-white">Nationwide Coverage</div>
                  <div className="text-xs text-slate-300 mt-0.5">Across all counties in Liberia</div>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 justify-start py-6 sm:py-0">
                <CreditCard className="w-8 h-8 text-amber-500 shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-bold text-sm text-white">Secure Transactions</div>
                  <div className="text-xs text-slate-300 mt-0.5">Safe & reliable payments</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID RENTALS SECTION */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                <div className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-4">Rent Our Fleet</div>
                <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight text-[#132238]">
                  Machinery for Every Project
                </h2>
              </div>
              <div className="max-w-sm text-sm text-[#64748B] font-medium leading-relaxed">
                From earthmoving to heavy haulage, our extensive fleet is ready to deploy. Top-tier brands maintained to the highest standards.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
              {/* Item 1: Excavator (2x2) */}
              <AnimatedStep delay={0.1} className="md:col-span-2 md:row-span-2 group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:border-amber-500/50 transition-all duration-500">
                <Image src="/images/cat_336_excavator.png" alt="Excavator" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132238]/90 via-[#132238]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-white font-bold text-2xl md:text-3xl mb-1">Heavy Excavators</h3>
                    <p className="text-slate-300 text-sm">Digging, trenching & foundation work</p>
                  </div>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl h-10 px-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    Rent Now
                  </Button>
                </div>
              </AnimatedStep>

              {/* Item 2: Truck (2x1) */}
              <AnimatedStep delay={0.2} className="md:col-span-2 md:row-span-1 group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:border-amber-500/50 transition-all duration-500">
                <Image src="/images/fleet_semi_truck.png" alt="Semi Truck" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132238]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-bold text-xl mb-1">Semi Trucks</h3>
                  <p className="text-slate-300 text-xs">Long-haul payload transport</p>
                </div>
              </AnimatedStep>

              {/* Item 3: Loader (1x1) */}
              <AnimatedStep delay={0.3} className="md:col-span-1 md:row-span-1 group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:border-amber-500/50 transition-all duration-500">
                <Image src="/images/fleet_loader.png" alt="Wheel Loader" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132238]/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-white font-bold text-lg leading-tight">Wheel Loaders</h3>
                </div>
              </AnimatedStep>

              {/* Item 4: Crane (1x2) */}
              <AnimatedStep delay={0.4} className="md:col-span-1 md:row-span-2 group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:border-amber-500/50 transition-all duration-500">
                <Image src="/images/fleet_crane.png" alt="Mobile Crane" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132238]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-5">
                  <h3 className="text-white font-bold text-xl leading-tight mb-1">Mobile Cranes</h3>
                  <p className="text-slate-300 text-xs">Heavy lifting</p>
                </div>
              </AnimatedStep>

              {/* Item 5: Bulldozer (2x1) */}
              <AnimatedStep delay={0.5} className="md:col-span-2 md:row-span-1 group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:border-amber-500/50 transition-all duration-500">
                <Image src="/images/komatsu_d65_bulldozer.png" alt="Bulldozer" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132238]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-bold text-xl mb-1">Track Bulldozers</h3>
                  <p className="text-slate-300 text-xs">Earthmoving & grading</p>
                </div>
              </AnimatedStep>

              {/* Item 6: Forklift (1x1) */}
              <AnimatedStep delay={0.6} className="md:col-span-1 md:row-span-1 group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:border-amber-500/50 transition-all duration-500">
                <Image src="/images/fleet_forklift.png" alt="Forklift" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132238]/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-white font-bold text-lg leading-tight">Forklifts</h3>
                </div>
              </AnimatedStep>

              {/* Item 7: Lowbed (2x1) */}
              <AnimatedStep delay={0.7} className="md:col-span-2 md:row-span-1 group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:border-amber-500/50 transition-all duration-500">
                <Image src="/images/fleet_lowbed_trailer.png" alt="Lowbed Trailer" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132238]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-bold text-xl mb-1">Lowbed Trailers</h3>
                  <p className="text-slate-300 text-xs">Oversized equipment hauling</p>
                </div>
              </AnimatedStep>

              {/* Item 8: CTA (2x1) */}
              <AnimatedStep delay={0.8} className="md:col-span-2 md:row-span-1 bg-[#132238] rounded-3xl shadow-inner flex items-center justify-center p-8 group cursor-pointer hover:bg-amber-500 transition-colors duration-500">
                <div className="text-center">
                  <div className="h-14 w-14 rounded-full bg-amber-500 text-[#132238] flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-md">
                    <ArrowRight strokeWidth={2.5} className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-2xl text-white mb-2">Ready to Rent?</h3>
                  <p className="text-slate-300 group-hover:text-black/70 text-sm">Submit your request today</p>
                </div>
              </AnimatedStep>

            </div>
          </div>
        </section>

        {/* FIND EQUIPMENT SECTION */}
        <section className="py-24 bg-[#132238] border-y border-[#0B1220]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-md">
                <h2 className="text-3xl md:text-4xl font-bold font-heading leading-tight text-white">Find Available Machinery</h2>
                <p className="text-slate-300 mt-4 leading-relaxed">
                  Explore our live inventory of top-tier equipment available for immediate rental or purchase across Liberia.
                </p>
              </div>
              <Button nativeButton={false} render={<Link href="/equipment" />} className="bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl px-8 h-12 w-full md:w-auto">
                View All Inventory
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: "eq-1",
                  title: "Caterpillar 336 Excavator",
                  category: "Excavators",
                  specs: ["36,000 kg", "311 hp"],
                  rate: "$450",
                  image: "/images/cat_336_excavator.png"
                },
                {
                  id: "eq-2",
                  title: "Volvo A40G Hauler",
                  category: "Articulated Dump Trucks",
                  specs: ["39,000 kg Payload", "469 hp"],
                  rate: "$650",
                  image: "/images/volvo_a40g_hauler.png"
                },
                {
                  id: "eq-3",
                  title: "Komatsu D65 Bulldozer",
                  category: "Track Bulldozers",
                  specs: ["22,000 kg", "217 hp"],
                  rate: "$550",
                  image: "/images/komatsu_d65_bulldozer.png"
                },
                {
                  id: "eq-4",
                  title: "JCB 3CX Backhoe",
                  category: "Backhoe Loaders",
                  specs: ["8,000 kg", "92 hp"],
                  rate: "$300",
                  image: "/images/jcb_3cx_backhoe.png"
                }
              ].map((machine, idx) => (
                <AnimatedStep key={idx} delay={idx * 0.1}>
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-transparent hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <Image src={machine.image} alt={machine.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      <div className="absolute top-3 left-3 bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                        Available Now
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">{machine.category}</div>
                      <h3 className="font-bold text-lg text-[#132238] leading-tight mb-4">{machine.title}</h3>
                      
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {machine.specs.map((spec, i) => (
                          <span key={i} className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-xs px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Daily Rate</div>
                          <div className="text-amber-500 font-bold text-lg">{machine.rate}</div>
                        </div>
                        <Button render={<Link href={`/request?id=${machine.id}`} />} nativeButton={false} variant="outline" className="border-[#E2E8F0] text-[#132238] hover:bg-amber-500 hover:text-white hover:border-amber-500 text-xs h-8 px-4 rounded-md">
                          Rent
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedStep>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Left Side */}
              <div className="lg:w-1/3">
                <div className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-4">
                  HOW IT WORKS
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 leading-tight text-foreground">
                  Rent Heavy Machinery in <br /><span className="text-amber-500">4 Simple Steps</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  A streamlined, transparent process to get the heavy equipment you need, exactly when you need it. We handle the logistics so you can focus on building.
                </p>
                <div className="mt-12 relative h-64 w-full rounded-2xl overflow-hidden border border-border hidden lg:block">
                  <Image src="/images/equipment_excavator.png" alt="How it works" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D11] to-transparent opacity-50" />
                </div>
              </div>

              {/* Right Side - Steps */}
              <div className="lg:w-2/3 flex flex-col gap-6">
                {[
                  { icon: Search, title: "Find Your Equipment", desc: "Search our marketplace for the exact machinery you need based on category, location, and availability." },
                  { icon: FileText, title: "Request a Quote", desc: "Submit your rental request and receive competitive quotes from verified local suppliers." },
                  { icon: Shield, title: "Secure Booking", desc: "Review the terms, confirm your dates, and safely process your payment through our secure platform." },
                  { icon: Truck, title: "Delivery & Execution", desc: "Your equipment is delivered directly to your site, ready to get the job done efficiently." },
                ].map(({ icon: Icon, title, desc }, idx) => (
                  <AnimatedStep key={idx} delay={idx * 0.15}>
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 group flex gap-6 items-start">
                      <div className="h-16 w-16 shrink-0 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-amber-50 transition-colors relative overflow-hidden">
                        <div className="absolute top-0 right-0 text-5xl font-black text-foreground/5 -translate-y-1/4 translate-x-1/4 select-none">
                          0{idx + 1}
                        </div>
                        <Icon className="h-7 w-7 text-amber-500 relative z-10" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-amber-500 transition-colors">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </AnimatedStep>
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* EQUIPMENT GALLERY SECTION */}
        <section className="py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-4">Our Fleet</div>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#132238] mb-6">Equipment Gallery</h2>
              <p className="text-[#64748B] text-lg">Take a look at some of the heavy-duty machinery ready for your next big project.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
              <div className="relative group rounded-2xl overflow-hidden md:col-span-2 md:row-span-2">
                <Image src="/images/media__1788003157001.jpg" alt="Heavy Equipment" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="relative group rounded-2xl overflow-hidden">
                <Image src="/images/media__1788003157015.jpg" alt="Heavy Equipment" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="relative group rounded-2xl overflow-hidden">
                <Image src="/images/media__1788003157033.jpg" alt="Heavy Equipment" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="relative group rounded-2xl overflow-hidden">
                <Image src="/images/media__1788003157055.jpg" alt="Heavy Equipment" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="relative group rounded-2xl overflow-hidden md:col-span-2">
                <Image src="/images/media__1788003157072.jpg" alt="Heavy Equipment" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        {/* TESTIMONIALS SECTION */}
        <section className="py-24 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-4">Client Success Stories</div>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#132238] mb-6">Trusted by Industry Leaders</h2>
              <p className="text-[#64748B] text-lg">Don't just take our word for it. Hear from the contractors and managers who rely on Equiplink every day.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Samuel Johnson", role: "Site Manager, West Africa Construction", quote: "The equipment was flawless and the operator was incredibly professional. Kept our highway project ahead of schedule by a full week." },
                { name: "David Mensah", role: "Procurement Director, Golden Mining Corp", quote: "Finding specialized heavy lifters in Liberia used to be a nightmare until we partnered with Equiplink. Delivered next day, perfectly serviced." },
                { name: "Michael Roberts", role: "Independent Contractor", quote: "Their on-site maintenance team is absolutely unmatched. When our rented wheel loader had a hydraulic issue, they fixed it within 2 hours." }
              ].map((testimonial, i) => (
                <AnimatedStep key={i} delay={i * 0.2} className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group border border-slate-100 flex flex-col h-full">
                  {/* Large decorative quote mark */}
                  <div className="absolute top-8 right-8 text-slate-100 group-hover:text-amber-500/10 transition-colors duration-300">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  
                  <div className="flex gap-1 mb-8 relative z-10">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-amber-500 text-amber-500" />)}
                  </div>
                  <p className="text-[#132238] text-lg leading-relaxed mb-10 relative z-10 font-medium flex-1">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center gap-4 mt-auto relative z-10 border-t border-slate-100 pt-6">
                    <div className="w-14 h-14 rounded-full bg-[#132238] flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#132238] text-lg">{testimonial.name}</div>
                      <div className="text-sm text-amber-600 font-semibold">{testimonial.role}</div>
                    </div>
                  </div>
                </AnimatedStep>
              ))}
            </div>
          </div>
        </section>

        {/* SUPPLIER CTA SECTION */}
        <section className="bg-[#132238] border-t border-[#0B1220]">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[400px] md:min-h-[600px] w-full">
              <Image src="/images/equipment_excavator.png" alt="Equipment Yard" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#132238] hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#132238] md:hidden" />
            </div>
            <div className="flex items-center justify-center p-12 lg:p-24 relative">
              <div className="max-w-xl">
                <div className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-4">Partner With Us</div>
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6 leading-tight">Turn Your Idle Assets Into Revenue</h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Join our supplier network and let your heavy machinery work for you. We handle the vetting, the logistics, and guarantee your payments.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Guaranteed, on-time payments', 'Fully verified & insured renters', 'Complete control over your rates & schedule'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button nativeButton={false} render={<Link href="/register" />} className="bg-amber-500 hover:bg-amber-600 text-black font-bold h-14 px-10 rounded-xl text-lg w-full sm:w-auto transition-all hover:scale-105">
                  Become a Supplier
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNER LOGOS SECTION */}
        <section className="py-12 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-8">Trusted by Top Equipment Manufacturers & Partners</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="font-heading font-black text-2xl tracking-tighter text-[#132238]">VOLVO</div>
              <div className="font-sans font-bold text-2xl italic tracking-wide text-[#132238]">KOMATSU</div>
              <div className="font-serif font-bold text-2xl tracking-widest text-[#132238]">CATERPILLAR</div>
              <div className="font-heading font-extrabold text-2xl text-[#132238]">JCB</div>
              <div className="font-sans font-black text-2xl tracking-tight text-[#132238]">BOBCAT</div>
              <div className="font-serif font-bold text-2xl italic text-[#132238]">John Deere</div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative py-32 border-t border-[#0B1220] overflow-hidden">
          <Image src="/images/hero_excavator_sunset.png" alt="Equiplink Fleet" fill className="object-cover absolute inset-0 z-0" />
          <div className="absolute inset-0 bg-[#0B1220]/85 z-10" />
          
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
              Ready to Upgrade Your Next Project?
            </h2>
            <p className="text-slate-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of contractors and project managers who trust Equiplink for top-tier heavy machinery, reliable transport, and unmatched service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button nativeButton={false} render={<Link href="/request" />} className="bg-amber-500 hover:bg-amber-600 text-black font-bold h-14 px-10 rounded-xl text-lg shadow-xl shadow-amber-500/20 transition-all hover:scale-105">
                Request a Quote
              </Button>
              <Button nativeButton={false} render={<Link href="/register" />} variant="outline" className="bg-transparent h-14 px-10 rounded-xl text-lg border-white/40 text-white hover:bg-white/20 backdrop-blur-sm shadow-xl transition-all hover:scale-105">
                Create an Account
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
