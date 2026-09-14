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
  Globe,
  Home,
  UploadCloud,
  ImageIcon
} from 'lucide-react';
import { updateSiteContent } from '@/app/actions/cms';
import Image from 'next/image';

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
  
  const [activeTab, setActiveTab] = useState<'global' | 'home'>('home');
  const [formData, setFormData] = useState(initialData);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.url) {
        setFormData({
          ...formData,
          pages: {
            ...formData.pages,
            home: {
              ...formData.pages?.home,
              hero: {
                ...formData.pages?.home?.hero,
                image: result.url
              }
            }
          }
        });
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
    setUploadingImage(false);
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

        <div className="flex-1 px-4 md:px-8 py-8 max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-8">
          
          {/* Sub Navigation Tabs */}
          <aside className="w-full md:w-56 shrink-0 space-y-1">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Pages & Layout</h3>
            <button 
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <Home className="w-4 h-4" /> Home Page
            </button>
            <button 
              onClick={() => setActiveTab('global')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'global' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <Globe className="w-4 h-4" /> Global Layout
            </button>
          </aside>

          {/* Editor Forms */}
          <div className="flex-1 space-y-8 min-w-0">
            
            {activeTab === 'home' && (
              <>
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900 font-sans">Hero Section</h2>
                    <p className="text-sm text-slate-500">The main banner text and image on the homepage.</p>
                  </div>
                  <div className="p-6 grid gap-5 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-700">Background Image</label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-10 bg-slate-50 relative overflow-hidden group">
                        {formData.pages?.home?.hero?.image && (
                          <div className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity">
                            <Image src={formData.pages.home.hero.image} alt="Preview" fill className="object-cover" />
                          </div>
                        )}
                        <div className="text-center relative z-10">
                          <ImageIcon className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
                          <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>{uploadingImage ? 'Uploading...' : 'Upload a file'}</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" disabled={uploadingImage} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-slate-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Title Line 1</label>
                      <Input 
                        value={formData.pages?.home?.hero?.title1 || ''} 
                        onChange={(e) => setFormData({...formData, pages: {...formData.pages, home: {...formData.pages?.home, hero: {...formData.pages?.home?.hero, title1: e.target.value}}}})}
                        className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Title Line 2</label>
                      <Input 
                        value={formData.pages?.home?.hero?.title2 || ''} 
                        onChange={(e) => setFormData({...formData, pages: {...formData.pages, home: {...formData.pages?.home, hero: {...formData.pages?.home?.hero, title2: e.target.value}}}})} 
                        className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-700">Subtitle Text</label>
                      <Textarea 
                        value={formData.pages?.home?.hero?.subtitle || ''} 
                        onChange={(e) => setFormData({...formData, pages: {...formData.pages, home: {...formData.pages?.home, hero: {...formData.pages?.home?.hero, subtitle: e.target.value}}}})} 
                        rows={3}
                        className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 rounded-lg"
                      />
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'global' && (
              <>
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
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
