'use client';

import { useState, useEffect } from 'react';
import { Mail, Users, History, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/utils';

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

interface EmailHistory {
  _id: string;
  subject: string;
  content: string;
  targetType: string;
  targetValue?: string;
  recipientCount: number;
  successCount: number;
  sentAt: string;
}

interface Member {
  _id: string;
  name: { en: string; hi: string };
  email: string;
  type: string;
  state?: string;
  district?: string;
}

export default function EmailingPage() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [targetType, setTargetType] = useState('NATIONAL');
  const [targetValue, setTargetValue] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [showMemberList, setShowMemberList] = useState(false);
  const [history, setHistory] = useState<EmailHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingMembers, setFetchingMembers] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (showMemberList) {
      fetchMembers();
    }
  }, [targetType, targetValue, showMemberList]);

  const fetchMembers = async () => {
    setFetchingMembers(true);
    try {
      const params = new URLSearchParams({ type: targetType });
      if (targetValue) {
        if (targetType === 'STATE') params.append('state', targetValue);
        if (targetType === 'DISTRICT') params.append('district', targetValue);
      }

      const res = await fetch(`/api/emails/members?${params}`);
      const data = await res.json();
      if (data.success) {
        setMembers(data.data);
        setSelectedMembers(new Set(data.data.map((m: Member) => m._id)));
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
      toast({
        title: 'Error',
        description: 'Failed to load members',
        variant: 'destructive',
      });
    } finally {
      setFetchingMembers(false);
    }
  };

  const fetchHistory = async () => {
    setFetchingHistory(true);
    try {
      const res = await fetch('/api/emails');
      const data = await res.json();
      if (data.success) {
        setHistory(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setFetchingHistory(false);
    }
  };

  const toggleMemberSelection = (memberId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      newSelected.add(memberId);
    }
    setSelectedMembers(newSelected);
  };

  const toggleAllMembers = () => {
    if (selectedMembers.size === members.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(members.map(m => m._id)));
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedMembers.size === 0) {
        throw new Error('Please select at least one member');
      }

      const customRecipients = members
        .filter(m => selectedMembers.has(m._id))
        .map(m => m.email)
        .filter(Boolean);

      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          content,
          targetType: 'CUSTOM_LIST',
          customRecipients,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Success!',
          description: `Email sent to ${data.recipientCount} members.`,
        });
        setSubject('');
        setContent('');
        setSelectedMembers(new Set());
        setShowMemberList(false);
        fetchHistory();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Mail className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Email Center</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Send Email Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              Send Email
            </h2>

            <form onSubmit={handleSend} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Category
                </label>
                <select
                  value={targetType}
                  onChange={(e) => {
                    setTargetType(e.target.value);
                    setTargetValue('');
                    setSelectedMembers(new Set());
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="NATIONAL">Top National Members</option>
                  <option value="RASHTRIYA_PARISHAD">National Council (राष्ट्रीय परिषद्)</option>
                  <option value="RASHTRIYA_KAARYASAMITI">National Executive Committee (राष्ट्रीय कार्यसमिति)</option>
                  <option value="STATE">State Committee</option>
                  <option value="DISTRICT">District Committee</option>
                </select>
              </div>

              {(targetType === 'STATE' || targetType === 'DISTRICT') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select {targetType === 'STATE' ? 'State' : 'District'}
                  </label>
                  <select
                    value={targetValue}
                    onChange={(e) => {
                      setTargetValue(e.target.value);
                      setSelectedMembers(new Set());
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select {targetType === 'STATE' ? 'State' : 'District'}</option>
                    {targetType === 'STATE' ? (
                      INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))
                    ) : (
                      <option value="">Enter district name in members list</option>
                    )}
                  </select>
                </div>
              )}

              {/* Member Selection */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowMemberList(!showMemberList)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-700">
                    Select Members ({selectedMembers.size} selected)
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      showMemberList ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showMemberList && (
                  <div className="mt-3 border border-gray-300 rounded-lg p-4 bg-gray-50">
                    {fetchingMembers ? (
                      <div className="flex justify-center py-6">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                      </div>
                    ) : members.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No members found with email addresses in this category.</p>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                          <input
                            type="checkbox"
                            id="select-all"
                            checked={selectedMembers.size === members.length && members.length > 0}
                            onChange={toggleAllMembers}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="select-all"
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            Select All ({members.length})
                          </label>
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {members.map((member) => (
                            <div key={member._id} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={member._id}
                                checked={selectedMembers.has(member._id)}
                                onChange={() => toggleMemberSelection(member._id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                              />
                              <label
                                htmlFor={member._id}
                                className="flex-1 cursor-pointer text-sm text-gray-700"
                              >
                                <div className="font-medium">{member.name.en}</div>
                                <div className="text-xs text-gray-500">{member.email}</div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="e.g., Important Announcement"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  placeholder="Type your email message here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || selectedMembers.size === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    Send Email
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Email History */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <History className="h-5 w-5 text-gray-500" />
              Recent History
            </h2>

            {fetchingHistory ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : history.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No emails sent yet.</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {history.map((email) => (
                  <div key={email._id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 truncate pr-2">{email.subject}</h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(email.sentAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{email.content}</p>
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        {email.successCount}/{email.recipientCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
