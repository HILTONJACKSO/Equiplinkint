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

const KPI_STATS = [
  { label: 'Total GMV', value: '$124,500', change: '+18%', positive: true, icon: DollarSign },
  { label: 'Active Bookings', value: '47', change: '+12%', positive: true, icon: BookOpen },
  { label: 'Open Requests', value: '93', change: '+8%', positive: true, icon: Activity },
  { label: 'Active Suppliers', value: '38', change: '+3', positive: true, icon: UserCheck },
  { label: 'Listed Equipment', value: '142', change: '+7', positive: true, icon: Package },
  { label: 'Conversion Rate', value: '34%', change: '-2%', positive: false, icon: TrendingUp },
];

const PENDING_VERIFICATIONS = [
  { id: 'V-021', name: 'Nimba Transport Co.', type: 'Business Verified', submitted: 'Aug 19, 2026', docs: 3 },
  { id: 'V-022', name: 'John T. Kollie', type: 'Operator Verified', submitted: 'Aug 19, 2026', docs: 2 },
  { id: 'V-023', name: 'Greater Liberia Logistics', type: 'Supplier Verified', submitted: 'Aug 18, 2026', docs: 4 },
  { id: 'V-024', name: 'CAT D8 Bulldozer (2019)', type: 'Equipment Verified', submitted: 'Aug 18, 2026', docs: 2 },
];

const RECENT_BOOKINGS = [
  { id: 'BK-089', equipment: 'CAT 320 Excavator', customer: 'BuildRight Ltd.', supplier: 'Liberia Heavy Machinery', amount: '$2,250', status: 'active' },
  { id: 'BK-090', equipment: '40-Ton Lowbed', customer: 'LRC Gov. Agency', supplier: 'West Africa Freight', amount: '$1,600', status: 'active' },
  { id: 'BK-091', equipment: 'Volvo Dump Truck', customer: 'Green Valley NGO', supplier: 'Bassa Logistics', amount: '$3,000', status: 'completed' },
  { id: 'BK-092', equipment: 'Crane Services', customer: 'Port Authority', supplier: 'Monrovia Crane Co.', amount: '$5,500', status: 'active' },
];

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${map[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar - dark navy */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0B1220] h-full">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0B1220] flex flex-col">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-border px-4 md:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-heading font-bold text-xl text-primary">Platform Overview</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Thursday, August 20, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search anything..." className="pl-9 w-64 h-9 bg-muted border-0" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 px-4 md:px-8 py-6 space-y-8">

          {/* KPI Grid */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {KPI_STATS.map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-2xl border border-border p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{kpi.label}</span>
                    <kpi.icon className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                  <div className="text-2xl font-bold font-heading text-primary">{kpi.value}</div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${kpi.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {kpi.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {kpi.change} this month
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
            <section className="bg-white rounded-2xl border border-border">
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                <h2 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-amber-500" /> Pending Verifications
                </h2>
                <Link href="/admin/verification" className="text-sm text-amber-600 hover:text-amber-700 font-medium">View All</Link>
              </div>
              <div className="divide-y divide-border/50">
                {PENDING_VERIFICATIONS.map((v) => (
                  <div key={v.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-primary font-bold shrink-0">
                      {v.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-primary text-sm truncate">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.type} · {v.docs} docs · {v.submitted}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-50">
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:bg-muted">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Top Categories / Locations */}
            <section className="bg-white rounded-2xl border border-border">
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                <h2 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                  <Globe className="h-5 w-5 text-amber-500" /> Top Categories & Locations
                </h2>
              </div>
              <div className="px-6 py-5 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">By Equipment Category</h3>
                  <div className="space-y-3">
                    {[['Excavators', 42], ['Heavy Transport / Lowbeds', 31], ['Dump Trucks', 28], ['Bulldozers', 19], ['Backhoes', 14]].map(([cat, count]) => (
                      <div key={String(cat)} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-primary w-40 truncate">{cat}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-2 bg-amber-400 rounded-full" style={{ width: `${(Number(count) / 42) * 100}%` }} />
                        </div>
                        <span className="text-sm font-bold text-primary w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">By Location</h3>
                  <div className="space-y-3">
                    {[['Monrovia', 78], ['Buchanan', 22], ['Ganta', 18], ['Kakata', 11]].map(([loc, count]) => (
                      <div key={String(loc)} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-primary w-40">{loc}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-2 bg-primary rounded-full" style={{ width: `${(Number(count) / 78) * 100}%` }} />
                        </div>
                        <span className="text-sm font-bold text-primary w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Recent Bookings Table */}
          <section className="bg-white rounded-2xl border border-border">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
              <h2 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-500" /> Recent Bookings
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground border-border h-8">
                  <Filter className="h-3.5 w-3.5" /> Filter
                </Button>
                <Link href="/admin/bookings" className="text-sm text-amber-600 hover:text-amber-700 font-medium">View All</Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/20">
                    <th className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left px-6 py-3">Booking ID</th>
                    <th className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left px-6 py-3">Equipment</th>
                    <th className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left px-6 py-3 hidden md:table-cell">Customer</th>
                    <th className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left px-6 py-3 hidden lg:table-cell">Supplier</th>
                    <th className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left px-6 py-3">Amount</th>
                    <th className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left px-6 py-3">Status</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {RECENT_BOOKINGS.map((bk) => (
                    <tr key={bk.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{bk.id}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">{bk.equipment}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">{bk.customer}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden lg:table-cell">{bk.supplier}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary">{bk.amount}</td>
                      <td className="px-6 py-4"><StatusPill status={bk.status} /></td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
