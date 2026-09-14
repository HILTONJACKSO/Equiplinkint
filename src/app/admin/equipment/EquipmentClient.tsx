'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard,
  Users,
  Package,
  BookOpen,
  DollarSign,
  Settings,
  Menu,
  Edit3,
  Plus,
  Trash2,
  ImageIcon,
  X
} from 'lucide-react';
import { addEquipment, updateEquipment, deleteEquipment, Equipment } from '@/app/actions/inventory';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Site Editor', icon: Edit3, href: '/admin/site-editor' },
  { label: 'Users', icon: Users, href: '/admin/users' },
  { label: 'Equipment', icon: Package, href: '/admin/equipment', active: true },
  { label: 'Bookings', icon: BookOpen, href: '/admin/bookings' },
  { label: 'Payments', icon: DollarSign, href: '/admin/payments' },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function EquipmentClient({ initialData }: { initialData: Equipment[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inventory, setInventory] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    specs: '',
    rate: '',
    image: ''
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: '', category: '', specs: '', rate: '', image: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Equipment) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      specs: item.specs.join(', '), // Join array to string for input
      rate: item.rate,
      image: item.image
    });
    setIsModalOpen(true);
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
        setFormData({ ...formData, image: result.url });
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
    setUploadingImage(false);
  };

  const handleSave = async () => {
    const payload = {
      title: formData.title,
      category: formData.category,
      specs: formData.specs.split(',').map(s => s.trim()).filter(Boolean),
      rate: formData.rate,
      image: formData.image
    };

    if (editingId) {
      const res = await updateEquipment(editingId, payload);
      if (res.success) {
        setInventory(inventory.map(item => item.id === editingId ? { ...item, ...payload } : item));
      }
    } else {
      const res = await addEquipment(payload);
      if (res.success && res.data) {
        setInventory([...inventory, res.data]);
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      const res = await deleteEquipment(id);
      if (res.success) {
        setInventory(inventory.filter(item => item.id !== id));
      }
    }
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
              <h1 className="font-sans font-bold text-xl text-slate-900">Equipment Inventory</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Manage your machinery listings</p>
            </div>
          </div>
          <Button onClick={openAddModal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold gap-2 rounded-lg">
            <Plus className="h-4 w-4" /> Add Equipment
          </Button>
        </header>

        <main className="flex-1 px-4 md:px-8 py-8 w-full max-w-6xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-6 py-4">Equipment</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Rate</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-16 relative bg-slate-100 rounded overflow-hidden">
                            {item.image ? (
                              <Image src={item.image} alt={item.title} fill className="object-cover" />
                            ) : (
                              <ImageIcon className="h-5 w-5 m-auto mt-2.5 text-slate-400" />
                            )}
                          </div>
                          <span className="font-semibold text-slate-900">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.category}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{item.rate}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditModal(item)} className="text-slate-400 hover:text-indigo-600">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {inventory.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                        No equipment found. Click "Add Equipment" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Equipment' : 'Add New Equipment'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Equipment Image</label>
                  <div className="flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-8 bg-slate-50 relative overflow-hidden group">
                    {formData.image && (
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity">
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                      </div>
                    )}
                    <div className="text-center relative z-10">
                      <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                      <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 hover:text-indigo-500">
                          <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                          <input type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" disabled={uploadingImage} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Title</label>
                    <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Caterpillar 336 Excavator" className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Category</label>
                    <Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Excavators" className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Specs (comma separated)</label>
                    <Input value={formData.specs} onChange={e => setFormData({...formData, specs: e.target.value})} placeholder="e.g. 36,000 kg, 311 hp" className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Rate</label>
                    <Input value={formData.rate} onChange={e => setFormData({...formData, rate: e.target.value})} placeholder="e.g. $450/day" className="bg-slate-50" />
                  </div>
                </div>

              </div>

              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-600 bg-white">Cancel</Button>
                <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                  {editingId ? 'Save Changes' : 'Add Equipment'}
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
