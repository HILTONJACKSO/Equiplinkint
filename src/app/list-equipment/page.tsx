import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedStep } from "@/components/ui/animated-step";
import Link from "next/link";
import { 
  Building2, 
  Banknote, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight,
  ClipboardList,
  Handshake,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { getSiteContent } from "@/app/actions/cms";

export default async function ListEquipmentPage() {
  const cms = await getSiteContent();
  const heroData = cms?.pages?.listEquipment?.hero || {
    title: "Turn Your Idle Equipment Into <span className=\"text-amber-500\">Revenue</span>",
    subtitle: "Join Liberia's premier heavy machinery network. List your excavators, bulldozers, and trucks to reach verified contractors and maximize your fleet's ROI.",
    image: "/images/cat_336_excavator.png"
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      
      {/* Dark Premium Hero Section */}
      <main className="flex-1">
        <div className="bg-[#132238] pt-20 pb-32 border-b border-[#0B1220] relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: `url('${heroData.image}')` }} />
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <AnimatedStep>
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Banknote className="w-4 h-4" />
                Zero Upfront Fees
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-heading text-white max-w-4xl mx-auto leading-tight" dangerouslySetInnerHTML={{ __html: heroData.title }} />
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
                {heroData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button render={<Link href="/register" />} nativeButton={false} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#132238] h-14 px-10 rounded-xl font-bold text-lg shadow-lg shadow-amber-500/20 hover:-translate-y-1 transition-all">
                  Register as a Supplier
                </Button>
                <Button render={<Link href="/how-it-works" />} nativeButton={false} variant="outline" className="w-full sm:w-auto bg-transparent border-slate-700 text-white hover:bg-white/5 h-14 px-8 rounded-xl font-bold text-lg">
                  Learn More
                </Button>
              </div>
            </AnimatedStep>
          </div>
        </div>

        {/* Why List With Us Section */}
        <div className="max-w-7xl mx-auto px-4 py-24 -mt-16 relative z-20">
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedStep delay={0.1}>
              <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-2xl hover:-translate-y-2 transition-transform h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center mb-6">
                  <Banknote className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#132238] mb-4 font-heading">Guaranteed Payments</h3>
                <p className="text-slate-500 leading-relaxed">
                  Never chase an invoice again. We handle all billing and secure upfront payments from contractors before your equipment ever leaves the yard.
                </p>
              </div>
            </AnimatedStep>

            <AnimatedStep delay={0.2}>
              <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-2xl hover:-translate-y-2 transition-transform h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#132238] mb-4 font-heading">Fully Insured Rentals</h3>
                <p className="text-slate-500 leading-relaxed">
                  Your heavy assets are protected. Every rental booked through our platform is backed by our comprehensive damage and liability insurance policy.
                </p>
              </div>
            </AnimatedStep>

            <AnimatedStep delay={0.3}>
              <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-2xl hover:-translate-y-2 transition-transform h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-[1.5rem] bg-amber-500/10 flex items-center justify-center mb-6">
                  <Building2 className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#132238] mb-4 font-heading">Verified Contractors</h3>
                <p className="text-slate-500 leading-relaxed">
                  We rigorously vet every renter on our platform. Your equipment is only rented to legitimate, registered businesses with proven track records.
                </p>
              </div>
            </AnimatedStep>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white py-24 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatedStep>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-[#132238] font-heading mb-4">How It Works</h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">Start monetizing your fleet in three simple steps.</p>
              </div>
            </AnimatedStep>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
              
              <AnimatedStep delay={0.1}>
                <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-lg flex items-center justify-center mb-6 group-hover:border-amber-500 transition-colors">
                    <ClipboardList className="w-10 h-10 text-[#132238]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#132238] mb-3">1. List Your Equipment</h3>
                  <p className="text-slate-500">Create your supplier profile and add your available machinery with photos, specs, and your custom pricing.</p>
                </div>
              </AnimatedStep>

              <AnimatedStep delay={0.2}>
                <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-lg flex items-center justify-center mb-6 group-hover:border-amber-500 transition-colors">
                    <Handshake className="w-10 h-10 text-[#132238]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#132238] mb-3">2. Receive Requests</h3>
                  <p className="text-slate-500">Get notified when contractors request your equipment. Review the project details and approve the booking.</p>
                </div>
              </AnimatedStep>

              <AnimatedStep delay={0.3}>
                <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-lg flex items-center justify-center mb-6 group-hover:border-amber-500 transition-colors">
                    <TrendingUp className="w-10 h-10 text-[#132238]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#132238] mb-3">3. Get Paid</h3>
                  <p className="text-slate-500">We secure the funds upfront. You deploy your equipment and receive guaranteed payouts directly to your account.</p>
                </div>
              </AnimatedStep>
            </div>
          </div>
        </div>

        {/* Supplier Dashboard Preview */}
        <div className="max-w-7xl mx-auto px-4 py-24">
          <AnimatedStep>
            <div className="bg-[#132238] rounded-[3rem] p-6 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/fleet_semi_truck.png')] opacity-10 mix-blend-overlay bg-cover bg-center" />
              
              <div className="flex-1 relative z-10 text-white">
                <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">Total Control at Your Fingertips</h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Our advanced Supplier Dashboard gives you real-time visibility into your fleet's utilization, upcoming bookings, and revenue metrics.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-lg font-medium"><CheckCircle2 className="w-6 h-6 text-emerald-400" /> Manage availability calendars</li>
                  <li className="flex items-center gap-3 text-lg font-medium"><CheckCircle2 className="w-6 h-6 text-emerald-400" /> Dynamic pricing controls</li>
                  <li className="flex items-center gap-3 text-lg font-medium"><CheckCircle2 className="w-6 h-6 text-emerald-400" /> Automated invoicing</li>
                </ul>
                <Button render={<Link href="/register" />} nativeButton={false} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#132238] h-14 px-8 rounded-xl font-bold text-lg">
                  Get Started Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="flex-1 w-full relative z-10">
                <div className="bg-white p-6 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h4 className="font-bold text-[#132238]">Monthly Revenue</h4>
                      <p className="text-sm text-slate-500">Aug 2026</p>
                    </div>
                    <div className="text-2xl font-bold text-emerald-500">$12,450</div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-amber-500" />
                        </div>
                        <span className="font-bold text-[#132238]">Fleet Utilization</span>
                      </div>
                      <span className="font-bold text-[#132238]">84%</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="font-bold text-[#132238]">Active Rentals</span>
                      </div>
                      <span className="font-bold text-[#132238]">6 Units</span>
                    </div>
                  </div>
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
