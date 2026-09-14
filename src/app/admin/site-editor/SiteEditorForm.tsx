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
  Menu,
  Edit3,
  Save,
  CheckCircle2,
  Globe,
  Home,
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
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string[]) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(path.join('.'));
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.url) {
        // Deep update helper
        setFormData((prev: any) => {
          const newData = JSON.parse(JSON.stringify(prev));
          let current = newData;
          for (let i = 0; i < path.length - 1; i++) {
            if (!current[path[i]]) current[path[i]] = {};
            current = current[path[i]];
          }
          current[path[path.length - 1]] = result.url;
          return newData;
        });
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
    setUploadingImage(null);
  };

  // Helper for text fields
  const updateField = (path: string[], value: string) => {
    setFormData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const SectionCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="p-6 space-y-6">
        {children}
      </div>
    </div>
  );

  const ImageUploader = ({ label, path, value }: { label: string, path: string[], value: string }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex gap-6 items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="relative h-24 w-40 rounded-md overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
          {value ? (
            <Image src={value} alt="Preview" fill className="object-cover" />
          ) : (
            <ImageIcon className="h-6 w-6 text-slate-400 absolute inset-0 m-auto" />
          )}
        </div>
        <div className="flex-1">
          <label className="relative cursor-pointer bg-white px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <span>{uploadingImage === path.join('.') ? 'Uploading...' : 'Change Image'}</span>
            <input type="file" className="sr-only" onChange={(e) => handleImageUpload(e, path)} disabled={!!uploadingImage} accept="image/*" />
          </label>
          <p className="mt-2 text-xs text-slate-500">JPG, PNG up to 5MB</p>
        </div>
      </div>
    </div>
  );

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
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0B1220] h-full border-r border-slate-800">
        <Sidebar />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0B1220] flex flex-col border-r border-slate-800 shadow-2xl">
            <Sidebar />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-600" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-sans font-bold text-xl text-slate-900">Site Editor</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Manage your website content directly</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {success && (
              <span className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="h-4 w-4" /> Saved
              </span>
            )}
            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold gap-2 rounded-lg"
            >
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : 'Publish Changes'}
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
          {/* Tabs */}
          <div className="flex space-x-1 p-1 bg-slate-200/50 rounded-xl mb-8 w-fit">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'home' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Home className="h-4 w-4" /> Home Page
            </button>
            <button
              onClick={() => setActiveTab('global')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'global' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Globe className="h-4 w-4" /> Global Layout
            </button>
          </div>

          <div className="pb-24">
            {activeTab === 'global' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionCard title="Header Configuration">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Support Phone Number</label>
                    <Input 
                      value={formData.header?.phone || ''} 
                      onChange={e => updateField(['header', 'phone'], e.target.value)}
                      placeholder="e.g. +231 77 000 0000"
                      className="bg-slate-50"
                    />
                  </div>
                </SectionCard>

                <SectionCard title="Footer Configuration">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">About Text</label>
                      <Textarea 
                        value={formData.footer?.aboutText || ''} 
                        onChange={e => updateField(['footer', 'aboutText'], e.target.value)}
                        rows={3}
                        className="bg-slate-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address</label>
                      <Input 
                        value={formData.footer?.email || ''} 
                        onChange={e => updateField(['footer', 'email'], e.target.value)}
                        className="bg-slate-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number</label>
                      <Input 
                        value={formData.footer?.phone || ''} 
                        onChange={e => updateField(['footer', 'phone'], e.target.value)}
                        className="bg-slate-50"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Physical Address</label>
                      <Input 
                        value={formData.footer?.address || ''} 
                        onChange={e => updateField(['footer', 'address'], e.target.value)}
                        className="bg-slate-50"
                      />
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'home' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                
                {/* HERO SECTION */}
                <SectionCard title="Hero Section">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4 md:col-span-1">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Headline Part 1</label>
                        <Input value={formData.pages?.home?.hero?.title1 || ''} onChange={e => updateField(['pages', 'home', 'hero', 'title1'], e.target.value)} className="bg-slate-50 font-semibold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Headline Part 2</label>
                        <Input value={formData.pages?.home?.hero?.title2 || ''} onChange={e => updateField(['pages', 'home', 'hero', 'title2'], e.target.value)} className="bg-slate-50 font-semibold text-amber-600" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Subtitle / Description</label>
                        <Textarea value={formData.pages?.home?.hero?.subtitle || ''} onChange={e => updateField(['pages', 'home', 'hero', 'subtitle'], e.target.value)} rows={3} className="bg-slate-50" />
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <ImageUploader label="Background / Hero Image" path={['pages', 'home', 'hero', 'image']} value={formData.pages?.home?.hero?.image} />
                    </div>
                  </div>
                </SectionCard>

                {/* BENTO RENTALS */}
                <SectionCard title="Machinery Categories (Bento Grid)">
                  <div className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Subtitle (e.g. Rent Our Fleet)</label>
                        <Input value={formData.pages?.home?.bentoRentals?.subtitle || ''} onChange={e => updateField(['pages', 'home', 'bentoRentals', 'subtitle'], e.target.value)} className="bg-slate-50 uppercase" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Title</label>
                        <Input value={formData.pages?.home?.bentoRentals?.title || ''} onChange={e => updateField(['pages', 'home', 'bentoRentals', 'title'], e.target.value)} className="bg-slate-50 font-semibold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Description</label>
                      <Textarea value={formData.pages?.home?.bentoRentals?.desc || ''} onChange={e => updateField(['pages', 'home', 'bentoRentals', 'desc'], e.target.value)} rows={2} className="bg-slate-50" />
                    </div>
                  </div>
                </SectionCard>

                {/* HOW IT WORKS */}
                <SectionCard title="How It Works Section">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Subtitle</label>
                        <Input value={formData.pages?.home?.howItWorks?.subtitle || ''} onChange={e => updateField(['pages', 'home', 'howItWorks', 'subtitle'], e.target.value)} className="bg-slate-50 uppercase" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Title</label>
                        <Input value={formData.pages?.home?.howItWorks?.title || ''} onChange={e => updateField(['pages', 'home', 'howItWorks', 'title'], e.target.value)} className="bg-slate-50" />
                        <p className="text-xs text-slate-500">Note: You can use HTML like &lt;br /&gt; or &lt;span&gt; here.</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <Textarea value={formData.pages?.home?.howItWorks?.desc || ''} onChange={e => updateField(['pages', 'home', 'howItWorks', 'desc'], e.target.value)} rows={3} className="bg-slate-50" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <ImageUploader label="Side Image" path={['pages', 'home', 'howItWorks', 'image']} value={formData.pages?.home?.howItWorks?.image} />
                    </div>
                  </div>
                </SectionCard>

                {/* GALLERY */}
                <SectionCard title="Equipment Gallery Section">
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Subtitle</label>
                        <Input value={formData.pages?.home?.gallery?.subtitle || ''} onChange={e => updateField(['pages', 'home', 'gallery', 'subtitle'], e.target.value)} className="bg-slate-50 uppercase" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Title</label>
                        <Input value={formData.pages?.home?.gallery?.title || ''} onChange={e => updateField(['pages', 'home', 'gallery', 'title'], e.target.value)} className="bg-slate-50 font-semibold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Description</label>
                      <Input value={formData.pages?.home?.gallery?.desc || ''} onChange={e => updateField(['pages', 'home', 'gallery', 'desc'], e.target.value)} className="bg-slate-50" />
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100">
                      <label className="text-sm font-medium text-slate-700 block mb-4">Gallery Images (5 required for layout)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[0, 1, 2, 3, 4].map(idx => (
                          <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <div className="relative h-20 w-full rounded mb-2 overflow-hidden bg-slate-200">
                              {formData.pages?.home?.gallery?.images?.[idx] ? (
                                <Image src={formData.pages?.home?.gallery?.images[idx]} alt="Gallery" fill className="object-cover" />
                              ) : (
                                <ImageIcon className="h-5 w-5 text-slate-400 absolute inset-0 m-auto" />
                              )}
                            </div>
                            <label className="block text-center cursor-pointer text-xs font-medium text-indigo-600 hover:text-indigo-800">
                              {uploadingImage === `pages.home.gallery.images.${idx}` ? 'Uploading...' : 'Upload'}
                              <input type="file" className="sr-only" onChange={(e) => handleImageUpload(e, ['pages', 'home', 'gallery', 'images', idx.toString()])} accept="image/*" />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionCard>

                {/* TESTIMONIALS */}
                <SectionCard title="Testimonials Section">
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Subtitle</label>
                        <Input value={formData.pages?.home?.testimonials?.subtitle || ''} onChange={e => updateField(['pages', 'home', 'testimonials', 'subtitle'], e.target.value)} className="bg-slate-50 uppercase" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Title</label>
                        <Input value={formData.pages?.home?.testimonials?.title || ''} onChange={e => updateField(['pages', 'home', 'testimonials', 'title'], e.target.value)} className="bg-slate-50 font-semibold" />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100">
                      <label className="text-sm font-medium text-slate-700 block mb-4">Reviews (3 required)</label>
                      <div className="grid gap-4 md:grid-cols-3">
                        {[0, 1, 2].map(idx => (
                          <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                            <Input placeholder="Client Name" value={formData.pages?.home?.testimonials?.items?.[idx]?.name || ''} onChange={e => updateField(['pages', 'home', 'testimonials', 'items', idx.toString(), 'name'], e.target.value)} className="h-8 text-sm" />
                            <Input placeholder="Role / Company" value={formData.pages?.home?.testimonials?.items?.[idx]?.role || ''} onChange={e => updateField(['pages', 'home', 'testimonials', 'items', idx.toString(), 'role'], e.target.value)} className="h-8 text-sm" />
                            <Textarea placeholder="Quote" rows={3} value={formData.pages?.home?.testimonials?.items?.[idx]?.quote || ''} onChange={e => updateField(['pages', 'home', 'testimonials', 'items', idx.toString(), 'quote'], e.target.value)} className="text-sm" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionCard>

                {/* SUPPLIER CTA */}
                <SectionCard title="Supplier Call-to-Action">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Subtitle</label>
                        <Input value={formData.pages?.home?.supplierCta?.subtitle || ''} onChange={e => updateField(['pages', 'home', 'supplierCta', 'subtitle'], e.target.value)} className="bg-slate-50 uppercase" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Title</label>
                        <Input value={formData.pages?.home?.supplierCta?.title || ''} onChange={e => updateField(['pages', 'home', 'supplierCta', 'title'], e.target.value)} className="bg-slate-50 font-semibold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <Textarea value={formData.pages?.home?.supplierCta?.desc || ''} onChange={e => updateField(['pages', 'home', 'supplierCta', 'desc'], e.target.value)} rows={3} className="bg-slate-50" />
                      </div>
                    </div>
                    <div>
                      <ImageUploader label="Background Image" path={['pages', 'home', 'supplierCta', 'image']} value={formData.pages?.home?.supplierCta?.image} />
                    </div>
                  </div>
                </SectionCard>

                {/* FINAL CTA */}
                <SectionCard title="Final Bottom CTA">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Title</label>
                        <Input value={formData.pages?.home?.finalCta?.title || ''} onChange={e => updateField(['pages', 'home', 'finalCta', 'title'], e.target.value)} className="bg-slate-50 font-semibold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <Textarea value={formData.pages?.home?.finalCta?.desc || ''} onChange={e => updateField(['pages', 'home', 'finalCta', 'desc'], e.target.value)} rows={3} className="bg-slate-50" />
                      </div>
                    </div>
                    <div>
                      <ImageUploader label="Background Image" path={['pages', 'home', 'finalCta', 'image']} value={formData.pages?.home?.finalCta?.image} />
                    </div>
                  </div>
                </SectionCard>

              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
