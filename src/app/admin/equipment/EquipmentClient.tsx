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
  X,
  FileText,
  LogOut
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

  // Form State matching the new comprehensive schema
  const [formData, setFormData] = useState<Partial<Equipment>>({
    title: '',
    category: '',
    specs: [],
    rate: '',
    image: '',
    ownerName: '',
    contactPerson: '',
    phone: '',
    email: '',
    equipmentType: '',
    make: '',
    model: '',
    year: '',
    color: '',
    vin: '',
    location: '',
    condition: 'Good',
    operational: true,
    availability: 'For rent',
    operatorIncluded: false,
    availableFrom: '',
    hasFrontPhoto: false,
    hasRearPhoto: false,
    hasLeftSidePhoto: false,
    hasRightSidePhoto: false,
    hasIdPlatePhoto: false,
    hasDamagePhoto: false,
    hasProofOfOwnership: false,
    hasRegistration: false,
    hasInsurance: false,
    hasOtherDocs: false,
    confirmedName: '',
    confirmedDate: ''
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '', category: '', specs: [], rate: '', image: '',
      ownerName: '', contactPerson: '', phone: '', email: '',
      equipmentType: '', make: '', model: '', year: '', color: '', vin: '', location: '',
      condition: 'Good', operational: true, availability: 'For rent', operatorIncluded: false, availableFrom: '',
      hasFrontPhoto: false, hasRearPhoto: false, hasLeftSidePhoto: false, hasRightSidePhoto: false, hasIdPlatePhoto: false, hasDamagePhoto: false,
      hasProofOfOwnership: false, hasRegistration: false, hasInsurance: false, hasOtherDocs: false,
      confirmedName: '', confirmedDate: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Equipment) => {
    setEditingId(item.id);
    setFormData({
      ...item,
      condition: item.condition || 'Good',
      operational: item.operational !== undefined ? item.operational : true,
      availability: item.availability || 'For rent',
      operatorIncluded: item.operatorIncluded || false,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 6) {
      alert("You can only upload up to 6 images at once.");
      return;
    }

    setUploadingImage(true);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.urls && result.urls.length > 0) {
        setFormData({ 
          ...formData, 
          image: result.urls[0], 
          images: result.urls 
        });
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed. Images might be too large.');
    }
    setUploadingImage(false);
  };

  const handleSave = async () => {
    // Auto-generate title from Make and Model if empty
    const generatedTitle = formData.title || `${formData.make || ''} ${formData.model || ''}`.trim() || 'Unnamed Equipment';
    
    const payload = {
      ...formData,
      title: generatedTitle,
      // Ensure specs is an array (we are handling it as a string internally in the UI temporarily for ease, wait no, let's keep it simple)
      specs: Array.isArray(formData.specs) ? formData.specs : (formData.specs as any)?.split(',').map((s: string) => s.trim()).filter(Boolean) || [],
    } as Equipment;

    if (editingId) {
      const res = await updateEquipment(editingId, payload);
      if (res.success) {
        setInventory(inventory.map(item => item.id === editingId ? { ...payload, id: editingId } : item));
        setIsModalOpen(false);
      }
    } else {
      const res = await addEquipment(payload);
      if (res.success && res.data) {
        setInventory([...inventory, res.data as Equipment]);
        setIsModalOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      const res = await deleteEquipment(id);
      if (res.success) {
        setInventory(inventory.filter(item => item.id !== id));
      }
    }
  };

  const handleLogout = () => {
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/login';
  };

  // Helper for text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#03071e] text-slate-300 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex lg:flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="h-16 flex items-center px-6 font-bold text-white text-xl tracking-tight border-b border-white/10 shrink-0">
          EQUIPLINK
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${item.active ? 'bg-[#ffb703] text-[#03071e]' : 'hover:bg-white/10 hover:text-white'}`}>
              <item.icon className={`h-5 w-5 ${item.active ? 'text-white' : 'text-slate-400'}`} />
              {item.label}
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
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-600" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-sans font-bold text-xl text-slate-900">Equipment Inventory</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Manage owner submissions and listings</p>
            </div>
          </div>
          <Button onClick={openAddModal} className="bg-[#ffb703] hover:bg-[#ffb703]/80 text-[#03071e] font-semibold gap-2 rounded-lg">
            <Plus className="h-4 w-4" /> Add Equipment
          </Button>
        </header>

        <main className="flex-1 px-4 md:px-8 py-8 w-full mx-auto max-w-[1400px]">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-6 py-4">Equipment</th>
                    <th className="px-6 py-4">Owner / Company</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Condition</th>
                    <th className="px-6 py-4">Rate / Price</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-16 relative bg-slate-100 rounded overflow-hidden shrink-0">
                            {item.image ? (
                              <Image src={item.image} alt={item.title} fill className="object-cover" />
                            ) : (
                              <ImageIcon className="h-5 w-5 m-auto mt-2.5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{item.title || `${item.make} ${item.model}`}</div>
                            <div className="text-xs text-slate-500">{item.category} • {item.year}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{item.ownerName || 'Unknown Owner'}</div>
                        <div className="text-xs text-slate-500">{item.phone || '-'}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.location || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.condition === 'Excellent' ? 'bg-blue-100 text-blue-700' :
                          item.condition === 'Good' ? 'bg-green-100 text-green-700' :
                          item.condition === 'Needs repair' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {item.condition || 'Unknown'}
                        </span>
                        {!item.operational && <span className="ml-2 text-xs text-red-500 font-bold">DOWN</span>}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">{item.rate || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditModal(item)} className="text-slate-400 hover:text-[#ffb703]">
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
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        No equipment found. Click "Add Equipment" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Massive Form Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-full max-h-[95vh] overflow-hidden flex flex-col">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#ffb703]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Equipment Owner Information Form</h2>
                    <p className="text-xs text-slate-500">Complete one form for each equipment unit.</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Modal Body - Scrollable */}
              <div className="overflow-y-auto flex-1 p-6 sm:p-8 bg-slate-50">
                <div className="max-w-4xl mx-auto space-y-12">
                  
                  {/* SECTION 1: OWNER INFO */}
                  <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <span className="bg-[#ffb703] text-[#03071e] w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                      OWNER INFORMATION
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Owner / Company Name</label>
                        <Input name="ownerName" value={formData.ownerName || ''} onChange={handleChange} placeholder="e.g. Nimba Transport Co." className="bg-slate-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Contact Person</label>
                        <Input name="contactPerson" value={formData.contactPerson || ''} onChange={handleChange} placeholder="Full Name" className="bg-slate-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Telephone / WhatsApp</label>
                        <Input name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="+231 ..." className="bg-slate-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email / Address</label>
                        <Input name="email" value={formData.email || ''} onChange={handleChange} placeholder="contact@example.com" className="bg-slate-50" />
                      </div>
                    </div>
                  </section>

                  {/* SECTION 2: EQUIPMENT INFO */}
                  <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <span className="bg-[#ffb703] text-[#03071e] w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                      EQUIPMENT INFORMATION
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Equipment Type</label>
                        <Input name="equipmentType" value={formData.equipmentType || ''} onChange={handleChange} placeholder="e.g. Excavator, Wheel Loader" className="bg-slate-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Category</label>
                        <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-input bg-slate-50 text-sm focus:ring-2 focus:ring-[#ffb703] focus:outline-none">
                          <option value="">Select Category...</option>
                          <option value="Truck">Truck</option>
                          <option value="Heavy machine">Heavy machine</option>
                          <option value="Vehicle">Vehicle</option>
                          <option value="Generator">Generator</option>
                          <option value="Agricultural">Agricultural</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Make</label>
                        <Input name="make" value={formData.make || ''} onChange={handleChange} placeholder="e.g. Caterpillar" className="bg-slate-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Model</label>
                        <Input name="model" value={formData.model || ''} onChange={handleChange} placeholder="e.g. 320D" className="bg-slate-50" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Year</label>
                        <Input name="year" value={formData.year || ''} onChange={handleChange} placeholder="YYYY" className="bg-slate-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Color</label>
                        <Input name="color" value={formData.color || ''} onChange={handleChange} placeholder="e.g. Yellow" className="bg-slate-50" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Identification Number (Serial, chassis, VIN, plate)</label>
                        <Input name="vin" value={formData.vin || ''} onChange={handleChange} placeholder="Enter ID number" className="bg-slate-50" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Current Location</label>
                        <Input name="location" value={formData.location || ''} onChange={handleChange} placeholder="City, County, or exact address" className="bg-slate-50" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Condition</label>
                        <select name="condition" value={formData.condition || ''} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-input bg-slate-50 text-sm focus:ring-2 focus:ring-[#ffb703] focus:outline-none">
                          <option value="Excellent">Excellent</option>
                          <option value="Good">Good</option>
                          <option value="Fair">Fair</option>
                          <option value="Needs repair">Needs repair</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Operational?</label>
                        <div className="flex items-center gap-6 h-10">
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="radio" name="operational" checked={formData.operational === true} onChange={() => setFormData({...formData, operational: true})} className="w-4 h-4 text-[#ffb703] focus:ring-[#ffb703]" /> Yes
                          </label>
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="radio" name="operational" checked={formData.operational === false} onChange={() => setFormData({...formData, operational: false})} className="w-4 h-4 text-[#ffb703] focus:ring-[#ffb703]" /> No
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Availability</label>
                        <select name="availability" value={formData.availability || ''} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-input bg-slate-50 text-sm focus:ring-2 focus:ring-[#ffb703] focus:outline-none">
                          <option value="For rent">For rent</option>
                          <option value="For sale">For sale</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Rate / Selling Price</label>
                        <Input name="rate" value={formData.rate || ''} onChange={handleChange} placeholder="e.g. $500/day or $85,000" className="bg-slate-50" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Operator Included?</label>
                        <div className="flex items-center gap-6 h-10">
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="radio" name="operatorIncluded" checked={formData.operatorIncluded === true} onChange={() => setFormData({...formData, operatorIncluded: true})} className="w-4 h-4 text-[#ffb703] focus:ring-[#ffb703]" /> Yes
                          </label>
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="radio" name="operatorIncluded" checked={formData.operatorIncluded === false} onChange={() => setFormData({...formData, operatorIncluded: false})} className="w-4 h-4 text-[#ffb703] focus:ring-[#ffb703]" /> No
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Available From</label>
                        <Input type="date" name="availableFrom" value={formData.availableFrom || ''} onChange={handleChange} className="bg-slate-50" />
                      </div>
                    </div>
                  </section>

                  {/* SECTION 3: PHOTOS & DOCS */}
                  <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <span className="bg-[#ffb703] text-[#03071e] w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                      PHOTOS AND DOCUMENTS
                    </h3>
                    
                    <div className="space-y-2 mb-6">
                      <label className="text-sm font-semibold text-slate-700">Equipment Images (Upload up to 6)</label>
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 px-6 py-8 bg-slate-50 relative overflow-hidden group">
                        
                        {/* Display uploaded images */}
                        {formData.images && formData.images.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mb-6">
                            {formData.images.map((imgUrl: string, idx: number) => (
                              <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200">
                                <img src={imgUrl} alt={`Preview ${idx + 1}`} className="object-cover w-full h-full" />
                              </div>
                            ))}
                          </div>
                        ) : formData.image ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mb-6">
                            <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200">
                              <img src={formData.image} alt="Preview" className="object-cover w-full h-full" />
                            </div>
                          </div>
                        ) : null}

                        <div className="text-center relative z-10 bg-white/80 p-4 rounded-xl backdrop-blur-sm shadow-sm border border-slate-100">
                          <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                          <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                            <label className="relative cursor-pointer rounded-md bg-[#ffb703] font-semibold text-[#03071e] px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#ffb703] hover:bg-[#ffb703]/90 transition-colors">
                              <span>{uploadingImage ? 'Uploading...' : 'Upload Images'}</span>
                              <input type="file" multiple className="sr-only" onChange={handleImageUpload} accept="image/*" disabled={uploadingImage} />
                            </label>
                          </div>
                          <p className="text-xs text-slate-500 mt-2">PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-3 block">Photos Provided (Check all that apply)</label>
                        <div className="space-y-3">
                          {['Front', 'Rear', 'Left side', 'Right side', 'ID plate', 'Damage'].map((item) => {
                            const name = `has${item.replace(' ', '')}Photo`;
                            return (
                              <label key={item} className="flex items-center gap-3 text-sm cursor-pointer group">
                                <input type="checkbox" name={name} checked={(formData as any)[name] || false} onChange={handleChange} className="w-4 h-4 rounded border-slate-300 text-[#ffb703] focus:ring-[#ffb703]" />
                                <span className="text-slate-700 group-hover:text-slate-900">{item}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-3 block">Documents Provided (Check all that apply)</label>
                        <div className="space-y-3">
                          {[
                            { label: 'Proof of ownership', name: 'hasProofOfOwnership' },
                            { label: 'Registration', name: 'hasRegistration' },
                            { label: 'Insurance', name: 'hasInsurance' },
                            { label: 'Other', name: 'hasOtherDocs' }
                          ].map((item) => (
                            <label key={item.name} className="flex items-center gap-3 text-sm cursor-pointer group">
                              <input type="checkbox" name={item.name} checked={(formData as any)[item.name] || false} onChange={handleChange} className="w-4 h-4 rounded border-slate-300 text-[#ffb703] focus:ring-[#ffb703]" />
                              <span className="text-slate-700 group-hover:text-slate-900">{item.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 4: OWNER CONFIRMATION */}
                  <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <span className="bg-[#ffb703] text-[#03071e] w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                      OWNER CONFIRMATION
                    </h3>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                      <p className="text-sm text-blue-800 leading-relaxed">
                        I confirm that I own or have legal authority over the equipment and that the information provided is correct. I authorize EquipLink to verify the equipment and submitted documents.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Owner's Full Name (Digital Signature)</label>
                        <Input name="confirmedName" value={formData.confirmedName || ''} onChange={handleChange} placeholder="Type full name to sign" className="bg-slate-50 font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Date</label>
                        <Input type="date" name="confirmedDate" value={formData.confirmedDate || ''} onChange={handleChange} className="bg-slate-50" />
                      </div>
                    </div>
                  </section>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-200 bg-white flex justify-end gap-3 shrink-0">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-700 bg-white hover:bg-slate-50">Cancel</Button>
                <Button onClick={handleSave} className="bg-[#ffb703] hover:bg-[#ffb703]/80 text-[#03071e] font-bold px-8">
                  {editingId ? 'Save Changes' : 'Submit Equipment Registration'}
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
