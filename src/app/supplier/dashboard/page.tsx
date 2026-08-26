'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Package,
  InboxIcon,
  BookOpen,
  MessageSquare,
  CalendarDays,
  DollarSign,
  Star,
  UserCircle,
  Settings,
  Bell,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/supplier/dashboard', active: true },
  { label: 'My Equipment', icon: Package, href: '/supplier/equipment' },
  { label: 'Requests', icon: InboxIcon, href: '/supplier/requests', badge: 3 },
  { label: 'Bookings', icon: BookOpen, href: '/supplier/bookings' },
  { label: 'Messages', icon: MessageSquare, href: '/supplier/messages', badge: 2 },
  { label: 'Calendar', icon: CalendarDays, href: '/supplier/calendar' },
  { label: 'Earnings', icon: DollarSign, href: '/supplier/earnings' },
  { label: 'Reviews', icon: Star, href: '/supplier/reviews' },
  { label: 'Profile', icon: UserCircle, href: '/supplier/profile' },
  { label: 'Settings', icon: Settings, href: '/supplier/settings' },
];

const STATS = [
  { label: 'Active Equipment', value: '6', icon: Package, trend: '+1 this month', positive: true },
  { label: 'Pending Requests', value: '3', icon: InboxIcon, trend: 'Needs response', positive: false },
  { label: 'Confirmed Jobs', value: '12', icon: CheckCircle2, trend: '+4 this month', positive: true },
  { label: 'Monthly Revenue', value: '$8,400', icon: DollarSign, trend: '+22% vs last month', positive: true },
];

const RECENT_REQUESTS = [
  { id: 'REQ-001', equipment: 'CAT 320 Excavator', customer: 'BuildRight Liberia Ltd.', location: 'Paynesville', date: 'Aug 25, 2026', duration: '5 days', status: 'pending' },
  { id: 'REQ-002', equipment: '40-Ton Lowbed', customer: 'West African Mining Co.', location: 'Ganta, Nimba', date: 'Aug 28, 2026', duration: '2 days', status: 'pending' },
  { id: 'REQ-003', equipment: 'Volvo Dump Truck', customer: 'LRC Government Project', location: 'Buchanan', date: 'Sep 1, 2026', duration: '1 month', status: 'pending' },
];

const UPCOMING_JOBS = [
  { id: 'JOB-009', equipment: 'JCB Backhoe', customer: 'Green Valley NGO', location: 'Kakata', date: 'Aug 22, 2026', status: 'confirmed' },
  { id: 'JOB-010', equipment: 'CAT 320 Excavator', customer: 'Monrovia Port Authority', location: 'Freeport', date: 'Aug 24, 2026', status: 'confirmed' },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 border border-amber-200',
    confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    cancelled: 'bg-red-100 text-red-700 border border-red-200',
    completed: 'bg-blue-100 text-blue-700 border border-blue-200',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles[status] || ''}`}>
      {status}
    </span>
  );
}

export default function SupplierDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-border/50">
        <Link href="/" className="font-heading font-bold text-xl text-primary">Equiplink</Link>
        <div className="text-xs text-muted-foreground mt-0.5">Supplier Portal</div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              item.active
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-primary'
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${item.active ? 'bg-white/20' : 'bg-amber-500 text-white'}`}>
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">W</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-primary truncate">West Africa Freight</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" /> Verified</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-border h-full">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-border flex flex-col">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-border px-4 md:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-heading font-bold text-xl text-primary">Dashboard</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Thursday, August 20, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500" />
            </Button>
            <Button className="hidden sm:flex bg-amber-500 hover:bg-amber-600 text-white rounded-full px-4">
              + Add Equipment
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 px-4 md:px-8 py-6 space-y-8">

          {/* Alert: Pending Requests */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-center gap-4">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-amber-800">You have 3 pending requests</p>
              <p className="text-sm text-amber-700">Suppliers who respond within 2 hours get a higher response rate badge.</p>
            </div>
            <Button className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white rounded-full px-4 hidden sm:flex">
              View Requests <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Stats Grid */}
          <section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl border border-border p-5 md:p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                    <div className="h-9 w-9 rounded-xl bg-primary/5 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold font-heading text-primary">{stat.value}</div>
                    <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
                      <TrendingUp className="h-3 w-3" />
                      {stat.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Two columns: Requests + Upcoming Jobs */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Pending Requests */}
            <section className="bg-white rounded-2xl border border-border">
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                <h2 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                  <InboxIcon className="h-5 w-5 text-amber-500" /> Pending Requests
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{RECENT_REQUESTS.length}</span>
                </h2>
                <Link href="/supplier/requests" className="text-sm text-amber-600 hover:text-amber-700 font-medium">View All</Link>
              </div>
              <div className="divide-y divide-border/50">
                {RECENT_REQUESTS.map((req) => (
                  <div key={req.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-semibold text-primary text-sm">{req.equipment}</p>
                        <p className="text-xs text-muted-foreground">{req.customer}</p>
                      </div>
                      <StatusBadge status={req.status} />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {req.date}</span>
                      <span>{req.duration}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full h-7 px-3 text-xs">Accept</Button>
                      <Button size="sm" variant="outline" className="rounded-full h-7 px-3 text-xs border-border text-muted-foreground hover:text-red-600 hover:border-red-200">Decline</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Jobs */}
            <section className="bg-white rounded-2xl border border-border">
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                <h2 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Upcoming Jobs
                </h2>
                <Link href="/supplier/bookings" className="text-sm text-amber-600 hover:text-amber-700 font-medium">View All</Link>
              </div>
              <div className="divide-y divide-border/50">
                {UPCOMING_JOBS.map((job) => (
                  <div key={job.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-semibold text-primary text-sm">{job.equipment}</p>
                        <p className="text-xs text-muted-foreground">{job.customer}</p>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.date}</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                ))}
                {UPCOMING_JOBS.length === 0 && (
                  <div className="px-6 py-12 text-center text-muted-foreground">
                    <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p>No upcoming jobs yet.</p>
                  </div>
                )}
              </div>

              {/* Utilization & Rating mini widgets */}
              <div className="px-6 py-5 border-t border-border/50 grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold font-heading text-primary">78%</div>
                  <div className="text-xs text-muted-foreground mt-1">Utilization Rate</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold font-heading text-amber-500 flex items-center justify-center gap-1">4.9 <Star className="h-5 w-5 fill-amber-500" /></div>
                  <div className="text-xs text-muted-foreground mt-1">Avg. Rating</div>
                </div>
              </div>
            </section>

          </div>

        </main>
      </div>
    </div>
  );
}
