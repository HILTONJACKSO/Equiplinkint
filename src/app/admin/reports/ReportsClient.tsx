'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Package,
  BookOpen,
  DollarSign,
  Star,
  ShieldCheck,
  Settings,
  Menu,
  Activity,
  Edit3,
  LogOut,
  UserPlus,
  Search,
  Filter,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Site Editor', icon: Edit3, href: '/admin/site-editor' },
  { label: 'Users', icon: Users, href: '/admin/users' },
  { label: 'Equipment', icon: Package, href: '/admin/equipment' },
  { label: 'Bookings', icon: BookOpen, href: '/admin/bookings' },
  { label: 'Payments', icon: DollarSign, href: '/admin/payments' },
  { label: 'Reviews', icon: Star, href: '/admin/reviews' },
  { label: 'Verification', icon: ShieldCheck, href: '/admin/verification' },
  { label: 'Reports', icon: Activity, href: '/admin/reports', active: true },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export function ReportsClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // We are removing hardcoded data as requested.
  // Until the user authentication API and database are built, we show empty state.
  const users: any[] = []; 

  const handleLogout = () => {
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/login';
  };

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
                ? 'bg-[#6a040f] text-[#ffb703]'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-[#ffb703] flex items-center justify-center text-[#03071e] font-bold text-sm">A</div>
          <div>
            <div className="text-sm font-semibold text-white">Super Admin</div>
            <div className="text-xs text-white/50">admin@equiplink.com</div>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Log out">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Desktop Sidebar - dark navy */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#03071e] h-full border-r border-[#6a040f]/20">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#03071e] flex flex-col border-r border-[#6a040f]/20 shadow-2xl">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-slate-900 tracking-tight">Platform Reports</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 bg-[#ffb703] text-[#03071e] px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[#ffb703]/90 transition-all">
              <UserPlus className="h-4 w-4" />
              Add User
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or role..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-[#ffb703] focus:outline-none transition-all text-slate-900"
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-700">User</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Role</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Joined</th>
                      <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                          <div className="flex flex-col items-center justify-center">
                            <Users className="h-10 w-10 text-slate-300 mb-3" />
                            <p className="text-base font-medium text-slate-900">No reports found</p>
                            <p className="text-sm text-slate-500 mt-1">There are no reports in the database yet.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4 text-slate-900 font-medium">{user.name}</td>
                          <td className="px-6 py-4 text-slate-600">{user.role}</td>
                          <td className="px-6 py-4">{user.status}</td>
                          <td className="px-6 py-4 text-slate-600">{user.joined}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-[#ffb703] font-semibold hover:underline">Edit</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-600">
                <div>Showing <span className="font-semibold text-slate-900">{users.length}</span> results</div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
