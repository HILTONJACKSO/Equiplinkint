'use client';

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSidebar, FilterState } from "@/components/equipment/FilterSidebar";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { mockEquipment } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { AnimatedStep } from "@/components/ui/animated-step";
import Image from "next/image";

export default function EquipmentDiscoveryPage() {
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredEquipment = mockEquipment.filter(eq => {
    if (!activeFilters) return true;

    // Search
    if (activeFilters.search && !eq.name.toLowerCase().includes(activeFilters.search.toLowerCase())) return false;
    
    // Category
    if (activeFilters.category !== "All Equipment" && eq.category !== activeFilters.category) return false;
    
    // Location (simple check against the string)
    if (activeFilters.location !== "Anywhere in Liberia" && !eq.location.includes(activeFilters.location)) return false;
    
    // Pricing Models
    if (activeFilters.pricingModels.length > 0 && !activeFilters.pricingModels.includes(eq.pricingModel)) return false;
    
    // Features
    if (activeFilters.operatorIncluded && !eq.operatorAvailable) return false;
    if (activeFilters.deliveryAvailable && !eq.deliveryAvailable) return false;
    if (activeFilters.verifiedOnly && !eq.verified) return false;

    return true;
  });
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8FAFC]">
        <div className="relative bg-[#132238] border-b border-[#0B1220] py-16 md:py-24 overflow-hidden">
          <Image src="/images/cat_336_excavator.png" alt="Heavy Equipment" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#132238] to-transparent" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">Find <span className="text-amber-500">Equipment</span></h1>
            <p className="text-slate-300 text-lg max-w-2xl">Browse available heavy machinery and logistics services across Liberia. Top-tier brands maintained to the highest standards.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 items-start">
          {/* Mobile Filter Toggle */}
          <div className="w-full lg:hidden flex justify-between items-center bg-white p-4 rounded-xl border border-border shadow-sm">
            <span className="font-semibold text-primary">Showing {filteredEquipment.length} results</span>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" className="gap-2" />}>
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <SheetTitle className="mb-6 text-xl">Filters</SheetTitle>
                <FilterSidebar onApply={(f) => { setActiveFilters(f); setCurrentPage(1); }} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar onApply={(f) => { setActiveFilters(f); setCurrentPage(1); }} />
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <span className="font-semibold text-muted-foreground">Showing {filteredEquipment.length} results</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                <select className="h-10 px-3 rounded-md border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Recommended</option>
                  <option>Lowest Price</option>
                  <option>Highest Rated</option>
                  <option>Recently Added</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEquipment.length > 0 ? (
                filteredEquipment.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((equipment, i) => (
                  <AnimatedStep key={equipment.id} delay={i * 0.1}>
                    <EquipmentCard equipment={equipment} />
                  </AnimatedStep>
                ))
              ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <SlidersHorizontal className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-[#132238] mb-2">No equipment found</h3>
                  <p className="text-slate-500 max-w-sm">We couldn't find any equipment matching your exact filters. Try broadening your search.</p>
                  <Button onClick={() => setActiveFilters(null)} className="mt-6 bg-amber-500 hover:bg-amber-600 text-[#132238] font-bold">Clear Filters</Button>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {filteredEquipment.length > itemsPerPage && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded-xl border-slate-200"
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: Math.ceil(filteredEquipment.length / itemsPerPage) }).map((_, i) => (
                    <Button 
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`rounded-xl ${currentPage === i + 1 ? 'bg-[#132238] hover:bg-[#132238]/90 text-white' : 'border-slate-200 hover:bg-slate-100'}`}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredEquipment.length / itemsPerPage), p + 1))}
                    disabled={currentPage === Math.ceil(filteredEquipment.length / itemsPerPage)}
                    className="rounded-xl border-slate-200 hover:bg-slate-100"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
