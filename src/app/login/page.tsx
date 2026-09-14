'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Truck, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (password === 'LibE@2026') {
        // Set cookie manually in JS
        document.cookie = "admin_auth=authenticated; path=/; max-age=86400";
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Column - Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0f172a] overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <span className="font-heading font-bold text-2xl text-white tracking-tight">Equiplink</span>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white font-heading leading-[1.15] mb-6">
            The backbone of <br/><span className="text-amber-500">Liberia's infrastructure</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-md leading-relaxed">
            Manage heavy equipment rentals, transport logistics, and supplier networks all from a single powerful dashboard.
          </p>
        </div>

        {/* Floating cards decoration */}
        <div className="absolute bottom-12 right-12 opacity-80 mix-blend-luminosity">
           <div className="relative w-72 h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/10 rotate-[-5deg]">
             <Image src="/images/cat_336_excavator.png" alt="Equipment" fill className="object-cover" />
           </div>
           <div className="absolute -top-12 -right-8 w-48 h-32 rounded-xl overflow-hidden shadow-xl border border-white/10 rotate-[10deg]">
             <Image src="/images/fleet_semi_truck.png" alt="Transport" fill className="object-cover" />
           </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-2xl text-slate-900 tracking-tight">Equiplink</span>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900 font-heading mb-2">Welcome back</h2>
              <p className="text-slate-500">Sign in to your admin control panel</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white"
                    placeholder="admin@equiplink.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <Link href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl mt-6 group"
                disabled={loading}
              >
                {loading ? 'Signing in...' : (
                  <span className="flex items-center gap-2">
                    Sign In to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Having trouble accessing your account? <br className="sm:hidden" />
            <a href="#" className="font-semibold text-slate-700 hover:text-indigo-600">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
