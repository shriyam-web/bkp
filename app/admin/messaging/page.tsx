'use client';

import { useState, useEffect } from 'react';
import { Send, Users, History, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/utils';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

interface MessageHistory {
  _id: string;
  subject: string;
  content: string;
  targetType: string;
  targetValue?: string;
  recipientCount: number;
  sentAt: string;
}

export default function MessagingPage() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [targetType, setTargetType] = useState('NATIONAL');
  const [targetValue, setTargetValue] = useState('');
  const [history, setHistory] = useState<MessageHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setFetchingHistory(true);
    try {
      const res = await fetch('/api/messages');
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content, targetType, targetValue }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Success!',
          description: `Message sent to ${data.recipientCount} members.`,
        });
        setSubject('');
        setContent('');
        fetchHistory();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Send className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Send Message Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              Send New Message
            </h2>

            <form onSubmit={handleSend} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={targetType}
                    onChange={(e) => {
                      setTargetType(e.target.value);
                      setTargetValue('');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="NATIONAL">National Level Members</option>
                    <option value="STATE">State Committee</option>
                    <option value="DISTRICT">District/City Members</option>
                    <option value="SPECIFIC_USER">Specific Member (by Mobile)</option>
                    <option value="ALL_MEMBERS">All Registered Members</option>
                  </select>
                </div>

                {(targetType === 'STATE' || targetType === 'DISTRICT') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select {targetType === 'STATE' ? 'State' : 'District'}
                    </label>
                    <select
                      value={targetValue}
                      onChange={(e) => setTargetValue(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select Location</option>
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

                {targetType === 'SPECIFIC_USER' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={targetValue}
                      onChange={(e) => setTargetValue(e.target.value)}
                      required
                      placeholder="e.g., +919876543210"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="e.g., Important Meeting Announcement"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Message History */}
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
              <p className="text-gray-500 text-center py-8">No messages sent yet.</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {history.map((msg) => (
                  <div key={msg._id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 truncate pr-2">{msg.subject}</h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(msg.sentAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{msg.content}</p>
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {msg.recipientCount} recipients
                      </span>
                      <span className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700">
                        {msg.targetType}
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
