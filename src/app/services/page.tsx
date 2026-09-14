import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedStep } from "@/components/ui/animated-step";
import Link from "next/link";
import { Wrench, ShieldCheck, Users, Activity, Settings, ArrowRight, Zap, GraduationCap, MapPin } from "lucide-react";
import { getSiteContent } from "@/app/actions/cms";

export default async function ServicesPage() {
  const cms = await getSiteContent();
  const heroData = cms?.pages?.services?.hero || {
    title: "Specialized Support & <span className=\"text-amber-500\">Maintenance</span>",
    subtitle: "Keep your projects running smoothly. Beyond just equipment rental, we provide industry-leading maintenance, operator training, and fleet management services across Liberia.",
    image: "/images/cat_336_excavator.png"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Settings className="w-4 h-4" />
                Comprehensive Support
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-heading text-white max-w-3xl leading-tight" dangerouslySetInnerHTML={{ __html: heroData.title }} />
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
                {heroData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button render={<Link href="/request" />} nativeButton={false} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#132238] h-14 px-8 rounded-xl font-bold text-lg shadow-lg shadow-amber-500/20 hover:-translate-y-1 transition-all">
                  Request Service
                </Button>
                <Button variant="outline" className="w-full sm:w-auto bg-transparent border-slate-700 text-white hover:bg-white/5 h-14 px-8 rounded-xl font-bold text-lg">
                  Speak to an Expert
                </Button>
              </div>
            </AnimatedStep>
          </div>
        </div>

        {/* Our Core Services */}
        <div className="max-w-7xl mx-auto px-4 py-24 -mt-16 relative z-20">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Service 1 */}
            <AnimatedStep delay={0.1}>
              <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-2xl hover:shadow-xl transition-all h-full flex flex-col group">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8 group-hover:bg-amber-500 transition-colors">
                  <Wrench className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-[#132238] mb-4 font-heading">24/7 Mobile Maintenance</h3>
                <p className="text-slate-500 leading-relaxed mb-8 flex-1">
                  Our rapid-response mobile mechanic units are equipped with advanced diagnostics and critical spare parts. If your equipment goes down on-site, our certified technicians are dispatched immediately to ensure your downtime is kept to an absolute minimum.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-slate-600 font-medium">
                    <span className="w-5 h-5 flex items-center justify-center bg-blue-100 rounded-full text-blue-600"><Zap className="w-3 h-3" /></span> Rapid diagnostics & repair
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium">
                    <span className="w-5 h-5 flex items-center justify-center bg-blue-100 rounded-full text-blue-600"><Zap className="w-3 h-3" /></span> Genuine OEM replacement parts
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium">
                    <span className="w-5 h-5 flex items-center justify-center bg-blue-100 rounded-full text-blue-600"><Zap className="w-3 h-3" /></span> Preventative servicing schedules
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-slate-200 text-[#132238] hover:bg-slate-50 h-14 rounded-xl font-bold text-lg mt-auto">
                  Learn More
                </Button>
              </div>
            </AnimatedStep>

            {/* Service 2 */}
            <AnimatedStep delay={0.2}>
              <div className="bg-[#132238] p-6 md:p-10 rounded-[2rem] shadow-2xl hover:shadow-xl transition-all h-full flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <GraduationCap className="w-48 h-48 text-white" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/20 group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors relative z-10">
                  <GraduationCap className="w-8 h-8 text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-heading relative z-10">Certified Operator Training</h3>
                <p className="text-slate-300 leading-relaxed mb-8 flex-1 relative z-10">
                  We provide rigorous, hands-on training programs for heavy machinery operators. Ensure your crew is operating efficiently, safely, and maximizing the lifespan of your heavy equipment investments.
                </p>
                <ul className="space-y-3 mb-8 relative z-10">
                  <li className="flex items-center gap-3 text-slate-300 font-medium">
                    <span className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full text-amber-500 border border-white/20"><ShieldCheck className="w-3 h-3" /></span> Safety protocol certification
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 font-medium">
                    <span className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full text-amber-500 border border-white/20"><ShieldCheck className="w-3 h-3" /></span> Advanced operational efficiency
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 font-medium">
                    <span className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full text-amber-500 border border-white/20"><ShieldCheck className="w-3 h-3" /></span> Daily inspection routines
                  </li>
                </ul>
                <Button className="w-full bg-white hover:bg-slate-100 text-[#132238] h-14 rounded-xl font-bold text-lg mt-auto relative z-10">
                  Request Training <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </AnimatedStep>

            {/* Service 3 */}
            <AnimatedStep delay={0.3}>
              <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-2xl hover:shadow-xl transition-all h-full flex flex-col group lg:col-span-2">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:bg-blue-500 transition-colors">
                      <Activity className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#132238] mb-4 font-heading">Smart Fleet Management</h3>
                    <p className="text-slate-500 leading-relaxed mb-6">
                      For large-scale contractors and mining operations, managing multiple assets can be chaotic. We offer end-to-end fleet management utilizing advanced GPS telematics to track location, fuel consumption, operator behavior, and upcoming maintenance schedules.
                    </p>
                    <Button render={<Link href="/request" />} nativeButton={false} className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-xl font-bold text-lg">
                      Discover Fleet Management
                    </Button>
                  </div>
                  
                  <div className="flex-1 w-full bg-slate-50 rounded-[2rem] p-5 md:p-8 border border-slate-100">
                    <h4 className="font-bold text-[#132238] mb-6 uppercase tracking-widest text-sm">Dashboard Metrics</h4>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                        <span className="text-slate-600 font-medium flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500"/> Real-time Location Tracking</span>
                        <span className="font-bold text-blue-500">Active</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                        <span className="text-slate-600 font-medium flex items-center gap-2"><Activity className="w-4 h-4 text-amber-500"/> Fuel Consumption</span>
                        <span className="font-bold text-[#132238]">42.5 L/hr</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                        <span className="text-slate-600 font-medium flex items-center gap-2"><Wrench className="w-4 h-4 text-amber-500"/> Next Service</span>
                        <span className="font-bold text-[#132238]">In 45 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedStep>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
