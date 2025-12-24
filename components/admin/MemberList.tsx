'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import MemberForm from './MemberForm';

interface MemberListProps {
  type: 'NATIONAL' | 'STATE';
  title: string;
}

export default function MemberList({ type, title }: MemberListProps) {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/committee-members?type=${type}`);
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error('Failed to fetch members', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [type]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return;

    try {
      const res = await fetch(`/api/committee-members/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchMembers();
      }
    } catch (error) {
      console.error('Failed to delete member', error);
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.en.toLowerCase().includes(search.toLowerCase()) ||
    member.name.hi.includes(search) ||
    member.position.en.toLowerCase().includes(search.toLowerCase()) ||
    (member.state && member.state.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <button
          onClick={() => {
            setEditingMember(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Position</th>
                {type === 'STATE' && <th className="px-6 py-4">State</th>}
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={type === 'STATE' ? 5 : 4} className="px-6 py-8 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={type === 'STATE' ? 5 : 4} className="px-6 py-8 text-center">
                    No members found.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{member.name.en}</div>
                      <div className="text-xs text-gray-500">{member.name.hi}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{member.position.en}</div>
                      <div className="text-xs text-gray-500">{member.position.hi}</div>
                    </td>
                    {type === 'STATE' && (
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {member.state}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4">{member.order}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingMember(member);
                            setIsFormOpen(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <MemberForm
          type={type}
          initialData={editingMember}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            fetchMembers();
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
