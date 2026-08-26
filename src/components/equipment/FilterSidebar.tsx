'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface FilterState {
  search: string;
  category: string;
  location: string;
  pricingModels: string[];
  operatorIncluded: boolean;
  deliveryAvailable: boolean;
  verifiedOnly: boolean;
}

interface FilterSidebarProps {
  onApply: (filters: FilterState) => void;
}

export function FilterSidebar({ onApply }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "All Equipment",
    location: "Anywhere in Liberia",
    pricingModels: [],
    operatorIncluded: false,
    deliveryAvailable: false,
    verifiedOnly: false,
  });

  const togglePricingModel = (model: string) => {
    setFilters(prev => {
      if (prev.pricingModels.includes(model)) {
        return { ...prev, pricingModels: prev.pricingModels.filter(m => m !== model) };
      }
      return { ...prev, pricingModels: [...prev.pricingModels, model] };
    });
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8">
      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-[#132238]">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Keywords..." 
            className="pl-9 bg-white border-slate-200 focus:border-amber-500 rounded-xl"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-[#132238]">Categories</h3>
        <div className="space-y-3">
          {["All Equipment", "Excavator", "Dump Truck", "Bulldozer", "Transport", "Backhoe", "Crane"].map((cat) => (
            <label key={cat} className="flex items-center gap-3 text-sm cursor-pointer group">
              <input 
                type="radio" 
                name="category"
                checked={filters.category === cat}
                onChange={() => setFilters(prev => ({ ...prev, category: cat }))}
                className="rounded-full border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer" 
              />
              <span className="group-hover:text-amber-600 transition-colors font-medium text-slate-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-[#132238]">Location</h3>
        <select 
          className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
        >
          <option>Anywhere in Liberia</option>
          <option>Monrovia</option>
          <option>Buchanan</option>
          <option>Ganta</option>
          <option>Kakata</option>
        </select>
      </div>

      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-[#132238]">Pricing Model</h3>
        <div className="space-y-3">
          {["per_day", "per_hour", "fixed", "quote"].map((model) => (
            <label key={model} className="flex items-center gap-3 text-sm cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.pricingModels.includes(model)}
                onChange={() => togglePricingModel(model)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer" 
              />
              <span className="group-hover:text-amber-600 transition-colors font-medium text-slate-700">
                {model.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-[#132238]">Features</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm cursor-pointer group">
            <input 
              type="checkbox" 
              checked={filters.operatorIncluded}
              onChange={(e) => setFilters(prev => ({ ...prev, operatorIncluded: e.target.checked }))}
              className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer" 
            />
            <span className="group-hover:text-amber-600 transition-colors font-medium text-slate-700">Operator Included</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer group">
            <input 
              type="checkbox" 
              checked={filters.deliveryAvailable}
              onChange={(e) => setFilters(prev => ({ ...prev, deliveryAvailable: e.target.checked }))}
              className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer" 
            />
            <span className="group-hover:text-amber-600 transition-colors font-medium text-slate-700">Delivery Available</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer group">
            <input 
              type="checkbox" 
              checked={filters.verifiedOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
              className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer" 
            />
            <span className="group-hover:text-amber-600 transition-colors font-bold text-emerald-600">Verified Supplier Only</span>
          </label>
        </div>
      </div>

      <Button onClick={() => onApply(filters)} className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#132238] font-bold text-base shadow-lg shadow-amber-500/20 transition-transform hover:-translate-y-1">
        Apply Filters
      </Button>
    </aside>
  );
}
