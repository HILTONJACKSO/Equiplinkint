'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, Lock, Building2, Truck } from 'lucide-react';

type TabType = 'customer' | 'supplier';

export default function RegisterPage() {
  const [tab, setTab] = useState<TabType>('customer');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessType: '',
    agreed: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Auth logic goes here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top nav bar */}
      <header className="px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-bold text-[#0B1220] text-xl hover:opacity-80 transition-opacity"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500 text-white">
            <Truck size={18} />
          </span>
          <span className="font-heading">Equiplink</span>
        </Link>
      </header>

      {/* Card section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-lg p-8 md:p-10 max-w-md w-full mx-auto">

          {/* Tab switcher */}
          <div className="flex gap-1 bg-[#F8FAFC] rounded-xl p-1 mb-8 border border-[#E2E8F0]">
            {(['customer', 'supplier'] as TabType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`
                  flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold capitalize transition-all
                  ${tab === t
                    ? 'bg-white text-[#0B1220] shadow-sm border border-[#E2E8F0]'
                    : 'text-[#64748B] hover:text-[#0B1220]'
                  }
                `}
              >
                {t === 'customer' ? '🏗️ Customer' : '🚛 Supplier'}
                {tab === t && (
                  <span className="block h-0.5 w-6 bg-amber-500 rounded-full mx-auto mt-1" />
                )}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="font-heading font-bold text-3xl text-[#0B1220] mb-2">
              Create your account
            </h1>
            <p className="text-[#64748B] text-sm">
              {tab === 'customer'
                ? 'Find and book heavy equipment across Liberia'
                : 'List your equipment and grow your business'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#0B1220]">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10 rounded-xl border-[#E2E8F0] bg-white focus-visible:ring-amber-500/30 focus-visible:border-amber-500 text-[#0B1220] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-[#0B1220]">
                Email address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10 rounded-xl border-[#E2E8F0] bg-white focus-visible:ring-amber-500/30 focus-visible:border-amber-500 text-[#0B1220] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-sm font-medium text-[#0B1220]">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+231 770 000 000"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10 rounded-xl border-[#E2E8F0] bg-white focus-visible:ring-amber-500/30 focus-visible:border-amber-500 text-[#0B1220] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Supplier-only fields */}
            {tab === 'supplier' && (
              <>
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label htmlFor="companyName" className="block text-sm font-medium text-[#0B1220]">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Acme Equipment Ltd."
                      value={form.companyName}
                      onChange={handleChange}
                      required
                      className="h-12 pl-10 rounded-xl border-[#E2E8F0] bg-white focus-visible:ring-amber-500/30 focus-visible:border-amber-500 text-[#0B1220] placeholder:text-[#94A3B8]"
                    />
                  </div>
                </div>

                {/* Business Type */}
                <div className="space-y-1.5">
                  <label htmlFor="businessType" className="block text-sm font-medium text-[#0B1220]">
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={form.businessType}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm text-[#0B1220] appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select your business type…</option>
                    <option value="individual">Individual Supplier</option>
                    <option value="small">Small Business</option>
                    <option value="fleet">Large Fleet Company</option>
                    <option value="mining">Mining Company</option>
                  </select>
                </div>
              </>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-[#0B1220]">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10 rounded-xl border-[#E2E8F0] bg-white focus-visible:ring-amber-500/30 focus-visible:border-amber-500 text-[#0B1220] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0B1220]">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10 rounded-xl border-[#E2E8F0] bg-white focus-visible:ring-amber-500/30 focus-visible:border-amber-500 text-[#0B1220] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="agreed"
                name="agreed"
                type="checkbox"
                checked={form.agreed}
                onChange={handleChange}
                required
                className="mt-0.5 h-4 w-4 rounded border-[#E2E8F0] accent-amber-500 cursor-pointer shrink-0"
              />
              <label htmlFor="agreed" className="text-xs text-[#64748B] leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link href="/terms" className="text-amber-500 hover:text-amber-600 font-medium underline underline-offset-2">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-amber-500 hover:text-amber-600 font-medium underline underline-offset-2">
                  Privacy Policy
                </Link>
                . Equiplink may contact me with updates and promotions.
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white h-12 rounded-xl text-sm font-semibold transition-all mt-2"
            >
              {loading
                ? 'Creating account…'
                : tab === 'customer'
                ? 'Create Customer Account'
                : 'Create Supplier Account'}
            </Button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-[#64748B]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-amber-500 hover:text-amber-600 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
