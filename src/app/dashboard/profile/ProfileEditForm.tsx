'use client';

import { useState, FormEvent } from 'react';
import { CheckCircle } from 'lucide-react';

const SERVICE_OPTIONS = [
  { value: 'installation', label: 'Installation' },
  { value: 'repair', label: 'Repair' },
  { value: 'replacement', label: 'Replacement' },
  { value: 'staining', label: 'Staining' },
  { value: 'gates', label: 'Gates' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'residential', label: 'Residential' },
];

const MATERIAL_OPTIONS = [
  { value: 'wood', label: 'Wood' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'chain-link', label: 'Chain Link' },
  { value: 'aluminum', label: 'Aluminum' },
  { value: 'wrought-iron', label: 'Wrought Iron' },
  { value: 'composite', label: 'Composite' },
  { value: 'bamboo', label: 'Bamboo' },
  { value: 'steel', label: 'Steel' },
];

interface Props {
  contractor: {
    id: string;
    name: string;
    phone: string;
    email: string;
    website: string | null;
    description: string | null;
    services: string[];
    materials: string[];
    service_radius: number;
  };
}

export default function ProfileEditForm({ contractor }: Props) {
  const [formData, setFormData] = useState({
    name: contractor.name || '',
    phone: contractor.phone || '',
    email: contractor.email || '',
    website: contractor.website || '',
    description: contractor.description || '',
    services: contractor.services || [],
    materials: contractor.materials || [],
    service_radius: contractor.service_radius || 25,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const toggleArray = (arr: string[], value: string) => {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const res = await fetch('/api/dashboard/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save changes.');
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Unable to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
            placeholder="https://yourcompany.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none text-gray-900"
            placeholder="Tell homeowners about your business..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Radius (miles)</label>
          <input
            type="number"
            min="1"
            max="200"
            value={formData.service_radius}
            onChange={(e) => setFormData({ ...formData, service_radius: parseInt(e.target.value) || 25 })}
            className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
          />
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Services Offered</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SERVICE_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.services.includes(opt.value)}
                onChange={() => setFormData({ ...formData, services: toggleArray(formData.services, opt.value) })}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Materials</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {MATERIAL_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.materials.includes(opt.value)}
                onChange={() => setFormData({ ...formData, materials: toggleArray(formData.materials, opt.value) })}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" />
          Changes saved successfully
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
