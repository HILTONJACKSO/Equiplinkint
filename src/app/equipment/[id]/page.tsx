import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockEquipment } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShieldCheck, User, Truck, Info, Calendar, FileText, Share2, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function EquipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const equipment = mockEquipment.find(e => e.id === resolvedParams.id);
  
  if (!equipment) {
    notFound();
  }

  const getPricingText = () => {
    if (equipment.pricingModel === "quote") return "Request Quote";
    if (equipment.pricingModel === "fixed") return `$${equipment.price} Fixed`;
    return `$${equipment.price} / ${equipment.pricingModel === "per_day" ? "day" : "hr"}`;
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8FAFC] pb-24">
        
        {/* Dark Premium Hero Section */}
        <div className="bg-[#132238] pt-12 pb-16 border-b border-[#0B1220] relative">
          <div className="absolute inset-0 bg-[url('/images/cat_336_excavator.png')] opacity-5 mix-blend-overlay bg-cover bg-center" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <span className="mx-3">/</span>
              <Link href="/equipment" className="hover:text-amber-500 transition-colors">Equipment</Link>
              <span className="mx-3">/</span>
              <span className="text-white font-medium">{equipment.category}</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-4 leading-tight">{equipment.name}</h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-5 w-5 text-amber-500" /> 
                    <span className="text-lg">{equipment.location}</span>
                  </span>
                  <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" /> 
                    <span className="font-bold text-white text-lg">{equipment.rating.toFixed(1)}</span> 
                    <span className="text-lg">({equipment.reviewCount} reviews)</span>
                  </span>
                  {equipment.verified && (
                    <>
                      <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm py-1 px-3">
                        <ShieldCheck className="h-4 w-4 mr-1.5" /> Verified
                      </Badge>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl h-12 px-6">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-red-400 rounded-xl h-12 px-6">
                  <Heart className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-12 pb-8 relative z-20">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
            
            {/* Left Column: Images & Details */}
            <div className="flex-1 w-full space-y-10">
              
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden bg-slate-200 shadow-2xl ring-4 ring-white">
                  <Image 
                    src={equipment.image} 
                    alt={equipment.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${i === 1 ? 'ring-4 ring-amber-500 ring-offset-2' : 'opacity-60 hover:opacity-100 hover:shadow-lg'}`}>
                      <Image 
                        src={equipment.image} 
                        alt={`Thumbnail ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3 text-[#132238]">
                  <div className="p-2 bg-amber-500/10 rounded-xl">
                    <FileText className="h-6 w-6 text-amber-500" />
                  </div>
                  Equipment Description
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed">
                  <p>
                    This {equipment.name} is in <strong>{equipment.condition.toLowerCase()} condition</strong> and ready for immediate deployment. 
                    Perfect for heavy-duty earthmoving, construction site preparation, and large-scale mining operations. 
                    Maintained by certified technicians with full service records available upon request.
                  </p>
                  <p className="mt-6 font-bold text-[#132238] text-xl">Key Features:</p>
                  <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-amber-500">
                    <li>High fuel efficiency engine</li>
                    <li>Advanced hydraulic system</li>
                    <li>Climate-controlled cabin for operator comfort</li>
                    <li>GPS tracking and telematics enabled</li>
                  </ul>
                </div>
              </section>

              {/* Specifications */}
              <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3 text-[#132238]">
                  <div className="p-2 bg-blue-500/10 rounded-xl">
                    <Info className="h-6 w-6 text-blue-500" />
                  </div>
                  Technical Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="flex justify-between items-center py-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Brand</span>
                    <span className="font-bold text-[#132238] text-lg">Caterpillar</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Model Year</span>
                    <span className="font-bold text-[#132238] text-lg">2021</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Operating Weight</span>
                    <span className="font-bold text-[#132238] text-lg">22,500 kg</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Engine Power</span>
                    <span className="font-bold text-[#132238] text-lg">150 kW</span>
                  </div>
                </div>
              </section>

            </div>
            
            {/* Right Column: Booking & Supplier */}
            <div className="w-full lg:w-[420px] shrink-0 space-y-8 mt-8 lg:mt-0 lg:pt-16">
              
              {/* Booking Card */}
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-2xl lg:sticky lg:top-24">
                <div className="mb-8 pb-8 border-b border-slate-100">
                  <div className="text-sm text-amber-600 mb-2 uppercase font-bold tracking-widest">Starting Price</div>
                  <div className="text-4xl md:text-5xl font-bold text-[#132238] font-heading">{getPricingText()}</div>
                  <p className="text-sm text-slate-500 mt-4 leading-relaxed">Price may vary based on exact location and duration. Contact for an exact quote.</p>
                </div>

                <div className="space-y-6 mb-10">
                  <h3 className="font-bold text-[#132238] text-xl">Included Features</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <span className="flex items-center gap-3 text-slate-600 font-medium">
                        <User className="h-5 w-5 text-amber-500" /> Operator
                      </span>
                      <span className="font-bold text-[#132238]">{equipment.operatorAvailable ? "Included" : "Not Included"}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <span className="flex items-center gap-3 text-slate-600 font-medium">
                        <Truck className="h-5 w-5 text-amber-500" /> Delivery
                      </span>
                      <span className="font-bold text-[#132238]">{equipment.deliveryAvailable ? "Available" : "Pickup Only"}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <span className="flex items-center gap-3 text-slate-600 font-medium">
                        <Calendar className="h-5 w-5 text-amber-500" /> Min. Rental
                      </span>
                      <span className="font-bold text-[#132238]">1 Day</span>
                    </div>
                  </div>
                </div>

                <Button nativeButton={false} render={<Link href={`/request?id=${equipment.id}`} />} className="w-full bg-amber-500 hover:bg-amber-600 text-[#132238] h-16 text-xl font-bold rounded-2xl mb-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  Request Equipment
                </Button>
                <p className="text-sm text-center text-slate-500 font-medium">You won't be charged yet. The supplier will review your request.</p>
              </div>

              {/* Supplier Card */}
              <div className="bg-[#132238] p-8 rounded-[2rem] shadow-xl text-white">
                <h3 className="font-bold text-amber-500 mb-6 uppercase tracking-widest text-sm">Provided By</h3>
                <div className="flex items-center gap-5 mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-2xl text-white border border-white/20">
                    {equipment.supplierName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xl flex items-center gap-2 mb-1">
                      {equipment.supplierName}
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="text-slate-400 font-medium">Verified Business Partner</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
                    <div className="font-bold text-3xl text-white mb-1">14</div>
                    <div className="text-amber-500 text-sm font-semibold tracking-wide">ACTIVE LISTINGS</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
                    <div className="font-bold text-3xl text-white mb-1">100%</div>
                    <div className="text-emerald-400 text-sm font-semibold tracking-wide">RESPONSE RATE</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-white/20 hover:bg-white hover:text-[#132238] text-white h-14 rounded-xl font-bold text-lg transition-colors">
                  <MessageSquare className="h-5 w-5 mr-3" /> Contact Supplier
                </Button>
              </div>

            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
