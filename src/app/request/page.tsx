'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Package,
  MapPin,
  Calendar,
  Truck,
  MessageSquare,
  ChevronDown,
  Mail,
  User,
  Clock,
  Trash2,
  Plus
} from 'lucide-react';
import { mockEquipment } from '@/lib/data';
import { sendRequest } from '@/app/actions/sendRequest';

const STEPS = [
  { id: 1, label: 'Equipment', icon: Package },
  { id: 2, label: 'Location', icon: MapPin },
  { id: 3, label: 'Schedule', icon: Calendar },
  { id: 4, label: 'Details', icon: MessageSquare },
  { id: 5, label: 'Contact', icon: User },
  { id: 6, label: 'Review', icon: CheckCircle2 },
];

const SELECT_CLASS = 'w-full h-14 px-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-0 outline-none text-[#132238] font-bold transition-all appearance-none cursor-pointer';
const INPUT_CLASS = 'h-14 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-0 outline-none text-[#132238] font-bold transition-all w-full px-4';
const LABEL_CLASS = 'block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest';

function EquipmentDropdown({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedEquipment = mockEquipment.find(eq => eq.id === value);

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`${SELECT_CLASS} flex items-center justify-between !appearance-auto`}
      >
        {selectedEquipment ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
              <Image src={selectedEquipment.image} alt={selectedEquipment.name} fill className="object-cover" />
            </div>
            <span className="truncate">{selectedEquipment.name}</span>
          </div>
        ) : (
          <span className="text-slate-400 font-normal">Select equipment type...</span>
        )}
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 max-h-[300px] overflow-y-auto">
            {mockEquipment.map((eq) => (
              <div
                key={eq.id}
                onClick={() => {
                  onChange(eq.id);
                  setIsOpen(false);
                }}
                className="flex items-center gap-4 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 transition-colors"
              >
                <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <Image src={eq.image} alt={eq.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[#132238] truncate">{eq.name}</div>
                  <div className="text-xs font-semibold text-slate-500">{eq.category}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-amber-600">${eq.price}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">{eq.pricingModel.replace('_', ' ')}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export interface SelectedEquipment {
  id: string; // unique internal ID for the list
  equipmentId: string;
  equipmentName: string;
  quantity: string;
}

interface FormData {
  equipmentList: SelectedEquipment[];
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  duration: string;
  operatorRequired: boolean;
  deliveryRequired: boolean;
  projectDescription: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  submitted: boolean;
}

function RequestForm() {
  const searchParams = useSearchParams();
  const initialEquipmentId = searchParams.get('equipment');

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    equipmentList: [],
    pickupLocation: '',
    destination: '',
    date: '',
    time: '',
    duration: '',
    operatorRequired: false,
    deliveryRequired: false,
    projectDescription: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    submitted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle URL pre-fill
  useEffect(() => {
    if (initialEquipmentId && formData.equipmentList.length === 0) {
      const eq = mockEquipment.find(e => e.id === initialEquipmentId);
      if (eq) {
        setFormData(prev => ({
          ...prev,
          equipmentList: [{
            id: Date.now().toString(),
            equipmentId: eq.id,
            equipmentName: eq.name,
            quantity: '1 unit'
          }]
        }));
      }
    }
  }, [initialEquipmentId]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleWhatsAppSubmit = () => {
    const eqText = formData.equipmentList.map(eq => `- ${eq.equipmentName} (x${eq.quantity})`).join('\n');
    const text = `*New Equipment Request*\n\n*Equipment:*\n${eqText}\n\n*Destination:* ${formData.destination}\n*Date:* ${formData.date} at ${formData.time}\n*Duration:* ${formData.duration}\n*Delivery Required:* ${formData.deliveryRequired ? 'Yes' : 'No'}\n\n*Contact:* ${formData.contactName}\n*Phone:* ${formData.contactPhone}\n*Email:* ${formData.contactEmail}`;
    
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "231777165663";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setFormData(prev => ({ ...prev, submitted: true }));
  };

  const handleEmailSubmit = async () => {
    setIsSubmitting(true);
    // Since sendRequest might expect strings, we JSON.stringify the array if necessary.
    // We assume sendRequest action can handle any object for now.
    const result = await sendRequest(formData as any);
    setIsSubmitting(false);
    
    if (result.success) {
      setFormData(prev => ({ ...prev, submitted: true }));
    } else {
      alert("There was an error sending your request via Email. Please try WhatsApp.");
    }
  };

  if (formData.submitted) {
    return (
      <div className="bg-white rounded-[2rem] border border-slate-200 p-12 shadow-2xl max-w-lg w-full text-center relative z-10 mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 font-heading text-[#132238]">Request Submitted!</h2>
        <p className="text-slate-500 mb-8 text-lg leading-relaxed">
          Your request has been sent to verified suppliers. You'll hear back within <strong className="text-[#132238]">2-4 hours</strong>.
        </p>
        <Button render={<Link href="/equipment" />} nativeButton={false} className="w-full bg-[#132238] hover:bg-[#132238]/90 text-white h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          Browse More Equipment
        </Button>
      </div>
    );
  }

  const StepIndicator = () => (
    <div className="flex sm:justify-between items-center gap-4 sm:gap-0 mb-12 relative px-2 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 hide-scrollbar">
      <div className="absolute top-6 left-6 right-6 h-1.5 bg-slate-100 rounded-full -z-10 hidden sm:block" />
      <div className="absolute top-6 left-6 h-1.5 bg-amber-500 rounded-full -z-10 transition-all duration-500 hidden sm:block" style={{ width: `calc(${((currentStep - 1) / (STEPS.length - 1)) * 100}% - 3rem)` }} />
      
      {STEPS.map((step) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="flex flex-col items-center gap-3 bg-transparent shrink-0">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : isActive ? 'bg-amber-500 text-[#132238] scale-110 shadow-lg shadow-amber-500/30 ring-4 ring-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {isCompleted ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest hidden sm:block transition-colors ${
              isActive ? 'text-[#132238]' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.equipmentList.length > 0 && formData.equipmentList.every(eq => eq.equipmentId && eq.quantity);
      case 2:
        return !!formData.destination;
      case 3:
        return !!formData.date && !!formData.time && !!formData.duration;
      case 4:
        return true; // Project details optional
      case 5:
        return !!formData.contactName && !!formData.contactEmail && !!formData.contactPhone;
      default:
        return true;
    }
  };

  const NavButtons = ({ onNext, nextLabel = 'Continue' }: { onNext?: () => void; nextLabel?: string }) => {
    const valid = isStepValid();
    return (
      <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-100">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="h-14 px-6 rounded-xl font-bold text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-[#132238] transition-all"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </Button>
        <Button
          onClick={onNext ?? handleNext}
          disabled={!valid}
          className={`h-14 px-8 rounded-xl font-bold transition-all ${
            valid 
              ? 'text-[#132238] bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:-translate-y-1' 
              : 'text-slate-400 bg-slate-200 cursor-not-allowed'
          }`}
        >
          {nextLabel} <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    );
  };

  const StepHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) => (
    <div className="mb-10 text-center">
      <div className="inline-flex w-16 h-16 rounded-[1.5rem] bg-amber-500/10 items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-amber-500" />
      </div>
      <h2 className="text-3xl font-bold mb-3 font-heading text-[#132238]">{title}</h2>
      <p className="text-slate-500 text-lg">{subtitle}</p>
    </div>
  );

  const addEquipment = () => {
    setFormData(prev => ({
      ...prev,
      equipmentList: [...prev.equipmentList, { id: Date.now().toString(), equipmentId: '', equipmentName: '', quantity: '1 unit' }]
    }));
  };

  const removeEquipment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      equipmentList: prev.equipmentList.filter(eq => eq.id !== id)
    }));
  };

  const updateEquipmentItem = (id: string, field: keyof SelectedEquipment, value: string) => {
    setFormData(prev => ({
      ...prev,
      equipmentList: prev.equipmentList.map(eq => {
        if (eq.id === id) {
          const updatedEq = { ...eq, [field]: value };
          if (field === 'equipmentId') {
            const matched = mockEquipment.find(m => m.id === value);
            if (matched) updatedEq.equipmentName = matched.name;
          }
          return updatedEq;
        }
        return eq;
      })
    }));
  };

  const renderStep1 = () => (
    <div>
      <StepHeader title="Equipment Needed" subtitle="Select the type and quantity of equipment you require." icon={Package} />
      
      <div className="space-y-6">
        {formData.equipmentList.map((item, index) => (
          <div key={item.id} className="p-4 sm:p-6 rounded-2xl border-2 border-slate-100 bg-white relative group">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className={LABEL_CLASS}>Equipment Type</label>
                <EquipmentDropdown 
                  value={item.equipmentId} 
                  onChange={(val) => updateEquipmentItem(item.id, 'equipmentId', val)} 
                />
              </div>
              <div className="w-full sm:w-48">
                <label className={LABEL_CLASS}>Quantity</label>
                <div className="relative">
                  <select 
                    className={SELECT_CLASS} 
                    value={item.quantity} 
                    onChange={(e) => updateEquipmentItem(item.id, 'quantity', e.target.value)}
                  >
                    <option value="" disabled>Select quantity…</option>
                    <option value="1 unit">1 unit</option>
                    <option value="2 units">2 units</option>
                    <option value="3 units">3 units</option>
                    <option value="4 units">4 units</option>
                    <option value="5+ units">5+ units</option>
                  </select>
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => removeEquipment(item.id)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-red-100 hover:bg-red-100"
              title="Remove Equipment"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {formData.equipmentList.length === 0 && (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium mb-4">No equipment selected yet.</p>
          </div>
        )}

        <Button 
          variant="outline" 
          onClick={addEquipment}
          className="w-full h-14 border-2 border-dashed border-slate-200 text-slate-500 hover:text-[#132238] hover:border-amber-500 hover:bg-amber-50 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Equipment
        </Button>
      </div>

      <NavButtons />
    </div>
  );

  const renderStep2 = () => (
    <div>
      <StepHeader title="Location Details" subtitle="Where should the equipment be delivered?" icon={MapPin} />
      <div className="space-y-6">
        <div>
          <label className={LABEL_CLASS}>Destination / Job Site</label>
          <input className={INPUT_CLASS} placeholder="e.g. Paynesville, Sinkor, Buchanan" value={formData.destination} onChange={(e) => updateField('destination', e.target.value)} />
        </div>
      </div>
      <NavButtons />
    </div>
  );

  const renderStep3 = () => (
    <div>
      <StepHeader title="Scheduling" subtitle="When do you need the equipment and for how long?" icon={Calendar} />
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={LABEL_CLASS}>Start Date</label>
            <input 
              type="date" 
              className={INPUT_CLASS} 
              value={formData.date} 
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => updateField('date', e.target.value)} 
            />
          </div>
          <div>
            <label className={LABEL_CLASS}>Start Time</label>
            <input type="time" className={INPUT_CLASS} value={formData.time} onChange={(e) => updateField('time', e.target.value)} />
          </div>
        </div>
        <div>
          <label className={LABEL_CLASS}>Rental Duration</label>
          <div className="relative">
            <select className={SELECT_CLASS} value={formData.duration} onChange={(e) => updateField('duration', e.target.value)}>
              <option value="" disabled>Select duration…</option>
              <option value="1 Day">1 Day</option>
              <option value="2-3 Days">2–3 Days</option>
              <option value="1 Week">1 Week</option>
              <option value="2 Weeks">2 Weeks</option>
              <option value="1 Month">1 Month</option>
              <option value="Custom">Custom</option>
            </select>
            <ChevronDownIcon />
          </div>
        </div>
      </div>
      <NavButtons />
    </div>
  );

  const renderStep4 = () => (
    <div>
      <StepHeader title="Project Details" subtitle="Tell us more about your project and any special requirements." icon={MessageSquare} />
      <div className="space-y-6">
        <div>
          <label className={LABEL_CLASS}>Project Description</label>
          <textarea
            className="w-full min-h-[160px] p-5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-0 outline-none resize-none text-[#132238] font-medium transition-all"
            placeholder="Describe your project, scope of work, site conditions, or any special requirements…"
            value={formData.projectDescription}
            onChange={(e) => updateField('projectDescription', e.target.value)}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Additional Services</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              className="flex-1 flex items-center justify-between p-4 rounded-xl border-2 border-amber-500 bg-amber-50 text-[#132238] font-bold opacity-80"
            >
              <span className="flex items-center gap-3">
                <User className="w-5 h-5 text-amber-500" />
                Operator Included
              </span>
              <div className="w-6 h-6 rounded-full border-2 border-amber-500 bg-amber-500 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateField('deliveryRequired', !formData.deliveryRequired)}
              className={`flex-1 flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 font-bold ${
                formData.deliveryRequired ? 'border-amber-500 bg-amber-50 text-[#132238]' : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-amber-300 hover:bg-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Truck className={`w-5 h-5 ${formData.deliveryRequired ? 'text-amber-500' : 'text-slate-400'}`} />
                Delivery Required
              </span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.deliveryRequired ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}`}>
                {formData.deliveryRequired && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </button>
          </div>
        </div>
      </div>
      <NavButtons />
    </div>
  );

  const renderStep5 = () => (
    <div>
      <StepHeader title="Contact Information" subtitle="How should suppliers reach you about this request?" icon={User} />
      <div className="space-y-6">
        <div>
          <label className={LABEL_CLASS}>Full Name</label>
          <input className={INPUT_CLASS} placeholder="Your full name" value={formData.contactName} onChange={(e) => updateField('contactName', e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS}>Email Address</label>
          <input type="email" className={INPUT_CLASS} placeholder="you@example.com" value={formData.contactEmail} onChange={(e) => updateField('contactEmail', e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS}>Phone Number</label>
          <input type="tel" className={INPUT_CLASS} placeholder="+231 77 000 0000" value={formData.contactPhone} onChange={(e) => updateField('contactPhone', e.target.value)} />
        </div>
      </div>
      <NavButtons />
    </div>
  );

  const ReviewRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0">
      <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-base font-bold text-[#132238] text-right">
        {value || <span className="text-slate-300 italic font-medium">Not provided</span>}
      </span>
    </div>
  );

  const ReviewSection = ({ title, icon: Icon, children }: any) => (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-amber-500" />
        <h3 className="text-sm font-bold text-[#132238] uppercase tracking-widest">{title}</h3>
      </div>
      <div className="bg-slate-50 rounded-2xl px-6 border border-slate-100">
        {children}
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div>
      <StepHeader title="Review Your Request" subtitle="Please confirm your details before submitting." icon={CheckCircle2} />
      
      <div className="space-y-2">
        <ReviewSection title="Equipment" icon={Package}>
          <div className="py-4 border-b border-slate-100">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider block mb-2">Requested Items</span>
            {formData.equipmentList.map(eq => (
              <div key={eq.id} className="flex justify-between items-center py-1">
                <span className="font-bold text-[#132238]">{eq.equipmentName || 'Unknown'}</span>
                <span className="text-sm font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">x{eq.quantity}</span>
              </div>
            ))}
          </div>
        </ReviewSection>

        <ReviewSection title="Location" icon={MapPin}>
          <ReviewRow label="Destination" value={formData.destination} />
        </ReviewSection>

        <ReviewSection title="Schedule" icon={Calendar}>
          <ReviewRow label="Date" value={formData.date} />
          <ReviewRow label="Time" value={formData.time} />
          <ReviewRow label="Duration" value={formData.duration} />
        </ReviewSection>

        <ReviewSection title="Project Details" icon={MessageSquare}>
          <ReviewRow label="Description" value={formData.projectDescription} />
          <ReviewRow label="Operator" value="Included" />
          <ReviewRow label="Delivery" value={formData.deliveryRequired ? 'Yes – required' : 'No'} />
        </ReviewSection>

        <ReviewSection title="Contact" icon={User}>
          <ReviewRow label="Name" value={formData.contactName} />
          <ReviewRow label="Email" value={formData.contactEmail} />
          <ReviewRow label="Phone" value={formData.contactPhone} />
        </ReviewSection>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-10 pt-8 border-t border-slate-100 gap-4">
        <Button variant="outline" onClick={handlePrev} className="h-14 px-6 rounded-xl font-bold text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-[#132238] transition-all w-full sm:w-auto">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </Button>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button onClick={handleWhatsAppSubmit} className="h-14 px-8 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:-translate-y-1 transition-all text-lg flex items-center justify-center gap-2">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
            WhatsApp
          </Button>
          <Button onClick={handleEmailSubmit} disabled={isSubmitting} className="h-14 px-8 rounded-xl font-bold text-[#132238] bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:-translate-y-1 transition-all text-lg flex items-center justify-center gap-2">
            {isSubmitting ? 'Sending...' : <><Mail className="w-5 h-5" /> Email</>}
          </Button>
        </div>
      </div>
    </div>
  );

  const stepRenderers: Record<number, () => React.JSX.Element> = {
    1: renderStep1, 2: renderStep2, 3: renderStep3, 4: renderStep4, 5: renderStep5, 6: renderStep6,
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-12 border border-slate-100 relative z-10">
      <StepIndicator />
      <div className="mt-8">
        {stepRenderers[currentStep]?.()}
      </div>
    </div>
  );
}

export default function RequestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      
      {/* Dark Hero Background spanning behind the card */}
      <div className="bg-[#132238] pt-16 pb-64 border-b border-[#0B1220] relative">
        <div className="absolute inset-0 bg-[url('/images/cat_336_excavator.png')] opacity-5 mix-blend-overlay bg-cover bg-center" />
        <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-4 h-4" />
            Responses in 2–4 hours
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 font-heading text-white">
            Request <span className="text-amber-500">Equipment</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Fill out the form below and we'll connect you with verified heavy-duty suppliers in Liberia.
          </p>
        </div>
      </div>

      <main className="flex-1 px-4 -mt-48 relative z-20 pb-24">
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={<div className="h-[600px] bg-white rounded-[2rem] shadow-2xl animate-pulse" />}>
            <RequestForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const ChevronDownIcon = () => (
  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
  </div>
);
