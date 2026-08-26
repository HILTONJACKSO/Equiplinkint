import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedStep } from "@/components/ui/animated-step";
import Link from "next/link";
import { 
  Search, 
  CalendarCheck, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  ClipboardList,
  Handshake,
  TrendingUp,
  HardHat,
  Tractor
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      
      {/* Dark Premium Hero Section */}
      <main className="flex-1">
        <div className="bg-[#132238] pt-20 pb-32 border-b border-[#0B1220] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/cat_336_excavator.png')] opacity-10 mix-blend-overlay bg-cover bg-center" />
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <AnimatedStep>
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-amber-500/20 text-amber-500 border border-amber-500/30">
                <CheckCircle2 className="w-4 h-4" />
                Simple & Transparent
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-heading text-white max-w-4xl mx-auto leading-tight">
                How <span className="text-amber-500">Equiplink</span> Works
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
                Whether you need heavy machinery for your next big project or want to monetize your idle fleet, our platform connects you seamlessly.
              </p>
            </AnimatedStep>
          </div>
        </div>

        {/* Section: For Contractors (Renters) */}
        <div className="max-w-7xl mx-auto px-4 py-24 -mt-16 relative z-20">
          <AnimatedStep>
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
              <div className="bg-slate-50 border-b border-slate-200 p-8 md:p-12 text-center">
                <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                  <HardHat className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#132238] font-heading mb-4">For Contractors & Project Managers</h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">Find and book verified heavy equipment in minutes, not days.</p>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-12 relative">
                  <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-slate-100 z-0" />
                  
                  {/* Step 1 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-lg flex items-center justify-center mb-6 text-amber-500 font-bold text-2xl">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#132238] mb-3">1. Search & Compare</h3>
                    <p className="text-slate-500 leading-relaxed">Browse our marketplace of verified equipment. Filter by type, location, and specs to find exactly what your project needs.</p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-lg flex items-center justify-center mb-6 text-amber-500 font-bold text-2xl">
                      <CalendarCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#132238] mb-3">2. Request Booking</h3>
                    <p className="text-slate-500 leading-relaxed">Select your rental dates, request an operator if needed, and submit your request. Suppliers respond within 2-4 hours.</p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-lg flex items-center justify-center mb-6 text-amber-500 font-bold text-2xl">
                      <Truck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#132238] mb-3">3. Delivery & Work</h3>
                    <p className="text-slate-500 leading-relaxed">The equipment is delivered to your site fully fueled and ready to work. Our support team is available 24/7 if you need help.</p>
                  </div>
                </div>

                <div className="mt-16 text-center">
                  <Button render={<Link href="/equipment" />} nativeButton={false} className="w-full md:w-auto bg-[#132238] hover:bg-[#132238]/90 text-white h-14 px-10 rounded-xl font-bold text-lg shadow-lg hover:-translate-y-1 transition-all">
                    Browse Equipment Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedStep>
        </div>

        {/* Section: For Equipment Owners (Suppliers) */}
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <AnimatedStep>
            <div className="bg-[#132238] rounded-[3rem] shadow-2xl overflow-hidden border border-[#1e3454] relative">
              <div className="absolute inset-0 bg-[url('/images/fleet_semi_truck.png')] opacity-5 mix-blend-overlay bg-cover bg-center" />
              
              <div className="relative z-10 border-b border-white/10 p-8 md:p-12 text-center">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <Tractor className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">For Equipment Owners</h2>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">Turn your idle machinery into a reliable revenue stream safely and securely.</p>
              </div>
              
              <div className="p-8 md:p-12 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 relative">
                  <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-white/10 z-0" />
                  
                  {/* Step 1 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-[#1e3454] border-4 border-[#2a456e] shadow-xl flex items-center justify-center mb-6 text-emerald-400 font-bold text-2xl">
                      <ClipboardList className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">1. List Your Fleet</h3>
                    <p className="text-slate-400 leading-relaxed">Create a supplier account and upload your equipment details, photos, and set your daily, weekly, or monthly rates.</p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-[#1e3454] border-4 border-[#2a456e] shadow-xl flex items-center justify-center mb-6 text-emerald-400 font-bold text-2xl">
                      <Handshake className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">2. Approve Requests</h3>
                    <p className="text-slate-400 leading-relaxed">Receive booking requests from verified contractors. Review their project details and approve the rentals that work for you.</p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-[#1e3454] border-4 border-[#2a456e] shadow-xl flex items-center justify-center mb-6 text-emerald-400 font-bold text-2xl">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">3. Earn Revenue</h3>
                    <p className="text-slate-400 leading-relaxed">We collect payments upfront and guarantee your payout. Your equipment stays fully insured throughout the entire rental period.</p>
                  </div>
                </div>

                <div className="mt-16 text-center">
                  <Button render={<Link href="/list-equipment" />} nativeButton={false} className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-[#132238] h-14 px-10 rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/20 hover:-translate-y-1 transition-all">
                    Become a Supplier <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedStep>
        </div>

      </main>

      <Footer />
    </div>
  );
}
