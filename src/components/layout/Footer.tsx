import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tractor, Mail, MapPin, PhoneCall } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#05080f] border-t border-[#132238] text-white pt-12 md:pt-20 pb-8 md:pb-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Section - Newsletter & Branding */}
        <div className="flex flex-col xl:flex-row items-start justify-between gap-12 pb-12 md:pb-16 border-b border-[#132238]">
          <div className="max-w-md">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                <Tractor className="w-6 h-6 text-[#0B1220]" />
              </div>
              <span className="font-heading font-black text-3xl tracking-tight text-white">
                Equip<span className="text-amber-500">link</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-lg mb-8">
              Liberia's premier network for heavy machinery rental, specialized transport, and comprehensive maintenance support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#132238] flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-[#0B1220] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#132238] flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-[#0B1220] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#132238] flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-[#0B1220] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.555.556.899 1.11 1.152 1.772.249.638.416 1.363.466 2.427.049 1.066.059 1.405.059 4.123 0 2.717-.01 3.056-.06 4.122-.05 1.065-.217 1.79-.466 2.428-.253.66-.597 1.216-1.152 1.772-.556.555-1.11.899-1.772 1.152-.638.249-1.363.416-2.427.466-1.066.049-1.405.059-4.123.059-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.217-2.428-.466-.66-.253-1.216-.597-1.772-1.152-.555-.556-.899-1.11-1.153-1.772-.248-.638-.416-1.363-.465-2.428-.049-1.066-.059-1.405-.059-4.122 0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428.254-.66.598-1.216 1.153-1.772.556-.555 1.11-.899 1.772-1.153.638-.248 1.363-.416 2.428-.465 1.066-.049 1.405-.059 4.122-.059zm0 1.815c-2.67 0-3.003.01-4.062.058-.975.045-1.505.207-1.858.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.059-.058 1.392-.058 4.062 0 2.67.01 3.003.058 4.062.045.975.207 1.505.344 1.858.182.467.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.059.048 1.392.058 4.062.058 2.67 0 3.003-.01 4.062-.058.975-.045 1.505-.207 1.858-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.858.048-1.059.058-1.392.058-4.062 0-2.67-.01-3.003-.058-4.062-.045-.975-.207-1.505-.344-1.858-.182-.467-.398-.8-.748-1.15-.35-.35-.566-.683-.748-1.15-.137-.353-.3-.882-.344-1.857-.048-1.059-.058-1.392-.058-4.062zm0 3.045c-2.839 0-5.14 2.301-5.14 5.14 0 2.839 2.301 5.14 5.14 5.14 2.839 0 5.14-2.301 5.14-5.14 0-2.839-2.301-5.14-5.14-5.14zm0 8.465c-1.836 0-3.325-1.489-3.325-3.325 0-1.836 1.489-3.325 3.325-3.325 1.836 0 3.325 1.489 3.325 3.325 0 1.836-1.489 3.325-3.325 3.325zm3.914-8.874c-.663 0-1.2.537-1.2 1.2 0 .663.537 1.2 1.2 1.2.663 0 1.2-.537 1.2-1.2 0-.663-.537-1.2-1.2-1.2z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#132238] flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-[#0B1220] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          <div className="bg-[#0B1220] p-8 rounded-3xl border border-[#132238] w-full lg:w-auto max-w-lg">
            <h3 className="font-heading font-bold text-xl mb-2 text-white">Join our Newsletter</h3>
            <p className="text-slate-400 mb-6 text-sm">Get the latest equipment availability and industry news delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full h-12 bg-[#132238] border border-[#1e3454] rounded-xl pl-12 pr-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-500"
                />
              </div>
              <Button className="bg-amber-500 hover:bg-amber-400 text-[#0B1220] font-bold h-12 px-6 rounded-xl whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-12 md:py-16 border-b border-[#132238]">
          <div>
            <h3 className="font-bold mb-6 text-lg text-white uppercase tracking-wider text-sm">Platform</h3>
            <ul className="space-y-4">
              <li><Link href="/equipment" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Find Equipment</Link></li>
              <li><Link href="/transport" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Heavy Transport</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Support Services</Link></li>
              <li><Link href="/list-equipment" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">List Your Fleet</Link></li>
              <li><Link href="/how-it-works" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg text-white uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/help" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Help Center</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Contact Us</Link></li>
              <li><Link href="/safety" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Safety Center</Link></li>
              <li><Link href="/faq" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg text-white uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/terms" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="/supplier-terms" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Supplier Terms</Link></li>
              <li><Link href="/insurance" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">Insurance Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg text-white uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 font-medium leading-relaxed">Freeport of Monrovia<br/>Monrovia, Liberia</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-slate-400 font-medium">+231 77 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-slate-400 font-medium">hello@equiplink.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Equiplink. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="text-slate-500 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
