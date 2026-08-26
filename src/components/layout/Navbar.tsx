import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Search, Tractor, User, PhoneCall } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B1220]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#0B1220]/90 border-b border-[#1e3454]">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        
        <div className="flex items-center gap-6 xl:gap-12">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-amber-500/20">
              <Tractor className="w-6 h-6 text-[#0B1220]" />
            </div>
            <span className="font-heading font-black text-2xl tracking-tight text-white">
              Equip<span className="text-amber-500">link</span>
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/equipment" className="text-sm font-bold text-slate-300 hover:text-amber-400 transition-colors uppercase tracking-wider relative group">
              Find Equipment
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/transport" className="text-sm font-bold text-slate-300 hover:text-amber-400 transition-colors uppercase tracking-wider relative group">
              Transport
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/services" className="text-sm font-bold text-slate-300 hover:text-amber-400 transition-colors uppercase tracking-wider relative group">
              Services
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/list-equipment" className="text-sm font-bold text-slate-300 hover:text-amber-400 transition-colors uppercase tracking-wider relative group">
              List Equipment
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
        
        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2 mr-4 text-slate-400 border-r border-[#1e3454] pr-6">
            <PhoneCall className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold">+231 77 000 0000</span>
          </div>
          <Button nativeButton={false} render={<Link href="/login" />} variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 font-bold h-12 px-6 rounded-xl text-sm flex items-center gap-2">
            <User className="w-4 h-4" /> Sign In
          </Button>
          <Button render={<Link href="/request" />} nativeButton={false} className="bg-amber-500 hover:bg-amber-400 text-[#0B1220] font-bold px-8 h-12 rounded-xl text-sm shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 transition-all">
            Request Equipment
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-white/10">
            <Search className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-white/10" />}>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#0B1220] border-l border-[#1e3454] text-white p-6">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="flex flex-col gap-6 mt-12">
                <Link href="/equipment" className="text-lg font-bold text-white hover:text-amber-500">Find Equipment</Link>
                <Link href="/transport" className="text-lg font-bold text-white hover:text-amber-500">Transport</Link>
                <Link href="/services" className="text-lg font-bold text-white hover:text-amber-500">Services</Link>
                <Link href="/list-equipment" className="text-lg font-bold text-white hover:text-amber-500">List Equipment</Link>
                <Link href="/how-it-works" className="text-lg font-bold text-white hover:text-amber-500">How It Works</Link>
                <div className="h-px bg-[#1e3454] my-4" />
                <Link href="/login" className="text-lg font-bold text-slate-300 hover:text-white flex items-center gap-3">
                  <User className="w-5 h-5" /> Sign In
                </Link>
                <Button render={<Link href="/request" />} nativeButton={false} className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-[#0B1220] h-14 text-lg font-bold rounded-xl">
                  Request Equipment
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
