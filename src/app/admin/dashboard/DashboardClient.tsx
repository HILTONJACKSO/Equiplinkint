'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard,
  Users,
  Package,
  BookOpen,
  DollarSign,
  Star,
  ShieldCheck,
  Settings,
  Bell,
  Menu,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  Activity,
  Globe,
  UserCheck,
  Edit3,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard', active: true },
  { label: 'Site Editor', icon: Edit3, href: '/admin/site-editor' },
  { label: 'Users', icon: Users, href: '/admin/users' },
  { label: 'Equipment', icon: Package, href: '/admin/equipment' },
  { label: 'Bookings', icon: BookOpen, href: '/admin/bookings' },
  { label: 'Payments', icon: DollarSign, href: '/admin/payments' },
  { label: 'Reviews', icon: Star, href: '/admin/reviews' },
  { label: 'Verification', icon: ShieldCheck, href: '/admin/verification', badge: 7 },
  { label: 'Reports', icon: Activity, href: '/admin/reports' },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export function DashboardClient({ equipment = [] }: { equipment: any[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Compute stats from real data
  const totalEquipment = equipment.length;
  
  // Group by category
  const categoriesCount = equipment.reduce((acc, eq) => {
    acc[eq.category] = (acc[eq.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategories = Object.entries(categoriesCount)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 4);

  function StatusPill({ status }: { status: string }) {
    const map: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      completed: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${map[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
  }

  const KPI_STATS = [
    { label: 'Total GMV', value: '$0', change: '0%', positive: true, icon: DollarSign },
    { label: 'Active Bookings', value: '0', change: '0%', positive: true, icon: BookOpen },
    { label: 'Open Requests', value: '0', change: '0%', positive: true, icon: Activity },
    { label: 'Active Suppliers', value: '0', change: '0', positive: true, icon: UserCheck },
    { label: 'Listed Equipment', value: totalEquipment.toString(), change: '+1', positive: true, icon: Package },
    { label: 'Conversion Rate', value: '0%', change: '0%', positive: true, icon: TrendingUp },
  ];

  const PENDING_VERIFICATIONS: any[] = [];
  const RECENT_BOOKINGS: any[] = [];

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="font-heading font-bold text-xl text-white">Equiplink</Link>
        <div className="text-xs text-white/50 mt-0.5">Admin Control Panel</div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              item.active
                ? 'bg-white/15 text-white'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-white">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">A</div>
          <div>
            <div className="text-sm font-semibold text-white">Super Admin</div>
            <div className="text-xs text-white/50">admin@equiplink.com</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Desktop Sidebar - dark navy */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0B1220] h-full border-r border-slate-800">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0B1220] flex flex-col border-r border-slate-800 shadow-2xl">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-600" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-sans font-bold text-xl text-slate-900">Platform Overview</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Thursday, August 20, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search anything..." className="pl-9 w-64 h-9 bg-slate-100 border-transparent focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all rounded-lg" />
            </div>
            <Button variant="ghost" size="icon" className="relative text-slate-600 hover:bg-slate-100 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 px-4 md:px-8 py-8 space-y-8 max-w-7xl mx-auto w-full">

          {/* KPI Grid */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {KPI_STATS.map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <kpi.icon className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-sans text-slate-900">{kpi.value}</div>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${kpi.positive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'} w-fit px-2 py-0.5 rounded-full`}>
                    {kpi.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {kpi.change}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pending Verification Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-center gap-4">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-amber-800">7 pending verifications require your review</p>
              <p className="text-sm text-amber-700">Documents uploaded by suppliers and operators are awaiting admin approval.</p>
            </div>
            <Button className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white rounded-full px-4 hidden sm:flex">
              Review Now
            </Button>
          </div>

          {/* Two-column: Verifications + Top Categories */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Pending Verifications */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <div>
                  <h2 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-amber-500" /> {PENDING_VERIFICATIONS.length} pending verifications require your review
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Documents uploaded by suppliers and operators are awaiting admin approval.</p>
                </div>
                <Link href="/admin/verification" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View All</Link>
              </div>
              <div className="divide-y divide-slate-100 flex-1">
                {PENDING_VERIFICATIONS.length > 0 ? (
                  PENDING_VERIFICATIONS.map((v) => (
                    <div key={v.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                        {v.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm truncate">{v.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{v.type} · {v.docs} docs · {v.submitted}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 rounded-full">
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-50 rounded-full">
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:bg-slate-100 rounded-full hidden sm:flex">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-sm text-slate-500">
                    No pending verifications.
                  </div>
                )}
              </div>
            </section>

            {/* Top Categories */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-indigo-500" /> Top Categories
                </h2>
              </div>
              <div className="px-6 py-6 space-y-8">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">By Equipment Category</h3>
                  <div className="space-y-4">
                    {topCategories.length > 0 ? topCategories.map(([cat, count]: any) => (
                      <div key={String(cat)} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-700 w-32 truncate">{cat}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(Number(count) / totalEquipment) * 100}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-slate-900 w-8 text-right">{count}</span>
                      </div>
                    )) : (
                      <div className="text-sm text-slate-500">No equipment found in inventory.</div>
                    )}
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Recent Bookings Table */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-indigo-500" /> Recent Bookings
              </h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2 text-slate-600 border-slate-200 h-8 rounded-lg">
                  <Filter className="h-3.5 w-3.5" /> Filter
                </Button>
                <Link href="/admin/bookings" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View All</Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-left px-6 py-4">Booking ID</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-left px-6 py-4">Equipment</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-left px-6 py-4 hidden md:table-cell">Customer</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-left px-6 py-4 hidden lg:table-cell">Supplier</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-left px-6 py-4">Amount</th>
                    <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-left px-6 py-4">Status</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_BOOKINGS.length > 0 ? (
                    RECENT_BOOKINGS.map((bk) => (
                      <tr key={bk.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">{bk.id}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{bk.equipment}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 hidden md:table-cell">{bk.customer}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 hidden lg:table-cell">{bk.supplier}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{bk.amount}</td>
                        <td className="px-6 py-4"><StatusPill status={bk.status} /></td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-500">
                        No bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
