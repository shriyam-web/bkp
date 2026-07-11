'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Upload, Trash2, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { normalizeBoothLabel } from '@/lib/normalize-booth';

const CldUploadWidget = dynamic(() => import('next-cloudinary').then(mod => mod.CldUploadWidget), { ssr: false });

interface MemberFormProps {
  initialData?: any;
  type: 'NATIONAL' | 'STATE' | 'RASHTRIYA_PARISHAD' | 'RASHTRIYA_KAARYASAMITI' | 'DISTRICT' | 'BOOTH';
  onClose: () => void;
  onSuccess: () => void;
  embedded?: boolean;
}

interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const emptyFormData = (memberType: MemberFormProps['type']) => ({
  name: { en: '', hi: '' },
  position: { en: '', hi: '' },
  bio: { en: '', hi: '' },
  image: '',
  state: '',
  district: '',
  constituency: '',
  booth: '',
  isBoothIncharge: false,
  type: memberType,
  order: 0,
  mobileNumber: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  },
});

export default function MemberForm({
  initialData,
  type,
  onClose,
  onSuccess,
  embedded = false,
}: MemberFormProps) {
  const [formData, setFormData] = useState(emptyFormData(type));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [assemblies, setAssemblies] = useState<
    { _id: string; name: { en: string; hi?: string }; constituencyNumber?: number }[]
  >([]);
  const [assembliesLoading, setAssembliesLoading] = useState(false);
  const [assemblySearch, setAssemblySearch] = useState('');
  const [assemblyListOpen, setAssemblyListOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const filteredAssemblies = useMemo(() => {
    const q = assemblySearch.trim().toLowerCase();
    if (!q) return assemblies;
    return assemblies.filter((a) => {
      const num = a.constituencyNumber != null ? String(a.constituencyNumber) : '';
      return (
        a.name.en.toLowerCase().includes(q) ||
        (a.name.hi && a.name.hi.includes(q)) ||
        num.includes(q.replace(/\D/g, '')) ||
        (q.replace(/\D/g, '') && num.startsWith(q.replace(/\D/g, '')))
      );
    });
  }, [assemblies, assemblySearch]);

  const selectedAssembly = assemblies.find((a) => a.name.en === formData.constituency);

  const resetForm = () => {
    setFormData(emptyFormData(type));
    setAssemblySearch('');
    setAssemblyListOpen(false);
    setError('');
    setSaveSuccess(false);
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        state: initialData.state || '',
        district: initialData.district || '',
        constituency: initialData.constituency || '',
        booth: initialData.booth || '',
        isBoothIncharge: initialData.isBoothIncharge || false,
        mobileNumber: initialData.mobileNumber || '',
        email: initialData.email || '',
        address: initialData.address || {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'India',
        },
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (type !== 'BOOTH' || !formData.state) {
      setAssemblies([]);
      return;
    }
    const fetchAssemblies = async () => {
      setAssembliesLoading(true);
      try {
        const res = await fetch(
          `/api/legislative-assemblies?state=${encodeURIComponent(formData.state)}`
        );
        const data = await res.json();
        setAssemblies(data.success ? data.data : []);
      } catch {
        setAssemblies([]);
      } finally {
        setAssembliesLoading(false);
      }
    };
    fetchAssemblies();
  }, [type, formData.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = initialData 
        ? `/api/committee-members/${initialData._id}`
        : '/api/committee-members';
      
      const method = initialData ? 'PUT' : 'POST';

      console.log('Submitting form data:', formData);

      const payload = {
        ...formData,
        booth:
          type === 'BOOTH' && typeof formData.booth === 'string'
            ? normalizeBoothLabel(formData.booth)
            : formData.booth,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();
      console.log('Response:', responseData);

      if (!res.ok) throw new Error('Failed to save member');

      onSuccess();
      if (embedded && !initialData) {
        resetForm();
        setSaveSuccess(true);
      } else {
        onClose();
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('An error occurred while saving');
    } finally {
      setLoading(false);
    }
  };

  const formTitle = embedded
    ? 'Register New Booth Member'
    : initialData
      ? 'Edit Member'
      : 'Add New Member';

  const shell = (
    <div
      className={
        embedded
          ? 'bg-white rounded-xl shadow-sm border border-gray-200 w-full overflow-hidden'
          : 'bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'
      }
    >
      <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-gray-900">{formTitle}</h2>
        {!embedded && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {saveSuccess && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm border border-green-200">
            Member registered successfully. You can register another member below.
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
              <input
                type="text"
                value={formData.name.en}
                onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Hindi Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name (Hindi)</label>
              <input
                type="text"
                value={formData.name.hi}
                onChange={(e) => setFormData({ ...formData, name: { ...formData.name, hi: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* English Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position (English)</label>
              <input
                type="text"
                value={formData.position.en}
                onChange={(e) => setFormData({ ...formData, position: { ...formData.position, en: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Hindi Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position (Hindi)</label>
              <input
                type="text"
                value={formData.position.hi}
                onChange={(e) => setFormData({ ...formData, position: { ...formData.position, hi: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {(type === 'STATE' || type === 'DISTRICT' || type === 'BOOTH') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select
                  value={formData.state}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      state: e.target.value,
                      constituency: type === 'BOOTH' ? '' : formData.constituency,
                    });
                    if (type === 'BOOTH') {
                      setAssemblySearch('');
                      setAssemblyListOpen(false);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {type === 'DISTRICT' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter District Name"
                    required
                  />
                </div>
              )}

              {type === 'BOOTH' && (
                <>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Legislative Assembly
                    </label>
                    {selectedAssembly && (
                      <div className="mb-2 flex items-center justify-between gap-2 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-900">
                        <span>
                          {selectedAssembly.constituencyNumber != null &&
                            `#${selectedAssembly.constituencyNumber} · `}
                          {selectedAssembly.name.en}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, constituency: '' });
                            setAssemblySearch('');
                            setAssemblyListOpen(true);
                          }}
                          className="text-orange-700 hover:text-orange-900 text-xs font-medium"
                        >
                          Change
                        </button>
                      </div>
                    )}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        value={assemblySearch}
                        onChange={(e) => {
                          setAssemblySearch(e.target.value);
                          setAssemblyListOpen(true);
                        }}
                        onFocus={() => setAssemblyListOpen(true)}
                        placeholder={
                          assembliesLoading
                            ? 'Loading assemblies...'
                            : 'Search by assembly number or name...'
                        }
                        disabled={!formData.state || assembliesLoading}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50"
                      />
                      {assemblyListOpen && formData.state && !assembliesLoading && (
                        <ul className="absolute z-20 mt-1 w-full max-h-52 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                          {filteredAssemblies.length > 0 ? (
                            filteredAssemblies.map((a) => (
                              <li key={a._id}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, constituency: a.name.en });
                                    setAssemblySearch('');
                                    setAssemblyListOpen(false);
                                  }}
                                  className="w-full px-3 py-2.5 text-left text-sm hover:bg-blue-50 transition-colors"
                                >
                                  {a.constituencyNumber != null && (
                                    <span className="text-gray-500 tabular-nums mr-2">
                                      #{a.constituencyNumber}
                                    </span>
                                  )}
                                  <span className="text-gray-900">{a.name.en}</span>
                                  {a.name.hi && (
                                    <span className="block text-xs text-gray-500 mt-0.5">
                                      {a.name.hi}
                                    </span>
                                  )}
                                </button>
                              </li>
                            ))
                          ) : (
                            <li className="px-3 py-3 text-sm text-gray-500">
                              No assemblies match your search
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                    {!formData.constituency && (
                      <p className="mt-1 text-xs text-gray-500">
                        Type an assembly number or name, then pick from the list
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Booth</label>
                    <input
                      type="text"
                      value={formData.booth}
                      onChange={(e) => setFormData({ ...formData, booth: e.target.value })}
                      onBlur={() =>
                        setFormData((prev) => ({
                          ...prev,
                          booth: normalizeBoothLabel(prev.booth),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. 310 Milkya Pappri"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Use booth number + name exactly (e.g. 87 Bilsari). Extra spaces are cleaned automatically.
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isBoothIncharge}
                        onChange={(e) =>
                          setFormData({ ...formData, isBoothIncharge: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Booth Incharge (प्रभारी) — one lead contact per booth
                      </span>
                    </label>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Member Photo</label>
              {formData.image ? (
                <div className="relative w-32 h-32 group">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  onSuccess={(result: any) => {
                    if (result.event === 'success') {
                      setFormData({ ...formData, image: result.info.secure_url });
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-500 hover:text-blue-600"
                    >
                      <Upload className="h-8 w-8" />
                      <span>Upload from device</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="member@example.com"
              />
              <p className="mt-1 text-xs text-gray-500">
                This email will be needed for sending email to that member.
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="House number, street name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="City name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select
                  value={formData.address.state}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  value={formData.address.postalCode}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, postalCode: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="PIN code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={formData.address.country}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Country name"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio (English)</label>
              <textarea
                value={formData.bio.en}
                onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, en: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
              />
            </div>

            {/* Hindi Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio (Hindi)</label>
              <textarea
                value={formData.bio.hi}
                onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, hi: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order (Priority)</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={embedded ? resetForm : onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              {embedded ? 'Clear Form' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={loading || (type === 'BOOTH' && !formData.constituency)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : embedded ? 'Register Member' : 'Save Member'}
            </button>
          </div>
        </form>
    </div>
  );

  if (embedded) return shell;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {shell}
    </div>
  );
}
