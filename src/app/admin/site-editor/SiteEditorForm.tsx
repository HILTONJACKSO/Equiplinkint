'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  LayoutDashboard,
  Users,
  Package,
  BookOpen,
  DollarSign,
  Settings,
  Bell,
  Menu,
  Edit3,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { updateSiteContent } from '@/app/actions/cms';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Site Editor', icon: Edit3, href: '/admin/site-editor', active: true },
  { label: 'Users', icon: Users, href: '/admin/users' },
  { label: 'Equipment', icon: Package, href: '/admin/equipment' },
  { label: 'Bookings', icon: BookOpen, href: '/admin/bookings' },
  { label: 'Payments', icon: DollarSign, href: '/admin/payments' },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function SiteEditorForm({ initialData }: { initialData: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState(initialData);

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    const result = await updateSiteContent(formData);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setLoading(false);
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
                ? 'bg-white/15 text-white'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
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
      {/* Desktop Sidebar */}
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
              <h1 className="font-sans font-bold text-xl text-slate-900">Site Editor</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Manage your website's content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold gap-2 rounded-lg"
            >
              {success ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {loading ? 'Saving...' : success ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </header>

        {/* Editor Forms */}
        <main className="flex-1 px-4 md:px-8 py-8 max-w-4xl space-y-8">
          
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-sans">Hero Section</h2>
              <p className="text-sm text-slate-500">The main banner text on the homepage.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Title Line 1</label>
                <Input 
                  value={formData.hero?.title1 || ''} 
                  onChange={(e) => setFormData({...formData, hero: {...formData.hero, title1: e.target.value}})}
                  className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Title Line 2</label>
                <Input 
                  value={formData.hero?.title2 || ''} 
                  onChange={(e) => setFormData({...formData, hero: {...formData.hero, title2: e.target.value}})} 
                  className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Subtitle Text</label>
                <Textarea 
                  value={formData.hero?.subtitle || ''} 
                  onChange={(e) => setFormData({...formData, hero: {...formData.hero, subtitle: e.target.value}})} 
                  rows={3}
                  className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-sans">Header Configuration</h2>
              <p className="text-sm text-slate-500">Contact details displayed in the top navbar.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Support Phone Number</label>
              <Input 
                value={formData.header?.phone || ''} 
                onChange={(e) => setFormData({...formData, header: {...formData.header, phone: e.target.value}})} 
                className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg max-w-md"
              />
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-sans">Footer Configuration</h2>
              <p className="text-sm text-slate-500">Bottom of the page information.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">About Text</label>
                <Textarea 
                  value={formData.footer?.aboutText || ''} 
                  onChange={(e) => setFormData({...formData, footer: {...formData.footer, aboutText: e.target.value}})} 
                  rows={2}
                  className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Contact Email</label>
                <Input 
                  value={formData.footer?.email || ''} 
                  onChange={(e) => setFormData({...formData, footer: {...formData.footer, email: e.target.value}})} 
                  className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Contact Phone</label>
                <Input 
                  value={formData.footer?.phone || ''} 
                  onChange={(e) => setFormData({...formData, footer: {...formData.footer, phone: e.target.value}})} 
                  className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Office Address</label>
                <Input 
                  value={formData.footer?.address || ''} 
                  onChange={(e) => setFormData({...formData, footer: {...formData.footer, address: e.target.value}})} 
                  className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                />
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
