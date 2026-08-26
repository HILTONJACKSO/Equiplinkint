'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Truck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl text-[#0B1220] mb-2">
              Welcome back
            </h1>
            <p className="text-[#64748B] text-sm">
              Sign in to your Equiplink account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#0B1220]"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-10 rounded-xl border-[#E2E8F0] bg-white focus-visible:ring-amber-500/30 focus-visible:border-amber-500 text-[#0B1220] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#0B1220]"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-amber-500 hover:text-amber-600 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pl-10 rounded-xl border-[#E2E8F0] bg-white focus-visible:ring-amber-500/30 focus-visible:border-amber-500 text-[#0B1220] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0B1220] hover:bg-[#0B1220]/90 text-white h-12 rounded-xl text-sm font-semibold transition-all mt-2"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[#64748B]">
                or continue with
              </span>
            </div>
          </div>

          {/* Google button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-xl border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0B1220] font-medium text-sm gap-3 transition-all"
          >
            {/* Google SVG icon */}
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-[#64748B]">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-amber-500 hover:text-amber-600 font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
