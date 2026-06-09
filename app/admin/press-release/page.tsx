'use client';

import { useState, useEffect } from 'react';
import { FileText, Trash2, Loader2, Plus, Pencil, X, Paperclip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/utils';
import MediaUploadWidget from '@/components/MediaUploadWidget';
import MediaDisplay from '@/components/MediaDisplay';
import { MEDIA_TYPES, MediaType, MediaAttachment } from '@/lib/media';
import dynamic from 'next/dynamic';

const CldUploadWidget = dynamic(
  () => import('next-cloudinary').then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

interface PressRelease {
  _id: string;
  title: string;
  excerpt: string;
  content?: string;
  image_url: string;
  media_type?: MediaType;
  attachments?: MediaAttachment[];
  published_at: string;
}

export default function PressReleasePage() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [attachments, setAttachments] = useState<MediaAttachment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPressReleases();
  }, []);

  const fetchPressReleases = async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data.success) {
        setPressReleases(data.data || []);
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to load press releases',
        variant: 'destructive',
      });
    } finally {
      setFetching(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setImageUrl('');
    setMediaType('image');
    setAttachments([]);
    setEditingId(null);
  };

  const handleEdit = (release: PressRelease) => {
    setEditingId(release._id);
    setTitle(release.title);
    setExcerpt(release.excerpt);
    setContent(release.content || '');
    setImageUrl(release.image_url);
    setMediaType(release.media_type || 'image');
    setAttachments(release.attachments || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!imageUrl) {
      toast({
        title: 'Error',
        description: 'Please upload featured media first',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const payload = {
      title,
      excerpt,
      content,
      image_url: imageUrl,
      media_type: mediaType,
      attachments,
    };

    try {
      const res = await fetch(
        editingId ? `/api/news?id=${editingId}` : '/api/news',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Success!',
          description: editingId
            ? 'Press release updated successfully.'
            : 'Press release created successfully.',
        });
        resetForm();
        fetchPressReleases();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save press release',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this press release?')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        toast({ title: 'Success!', description: 'Press release deleted.' });
        if (editingId === id) resetForm();
        fetchPressReleases();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete press release',
        variant: 'destructive',
      });
    } finally {
      setDeleting(null);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Press Releases</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {editingId ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {editingId ? 'Edit Press Release' : 'New Press Release'}
              </h2>
              {editingId && (
                <button onClick={resetForm} className="text-gray-500 hover:text-gray-700 p-1">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g., Important Announcement"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Media Type</label>
                <select
                  value={mediaType}
                  onChange={(e) => {
                    setMediaType(e.target.value as MediaType);
                    setImageUrl('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {MEDIA_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Media</label>
                <MediaUploadWidget
                  mediaUrl={imageUrl}
                  mediaType={mediaType}
                  onMediaChange={(url, type) => {
                    setImageUrl(url);
                    setMediaType(type);
                  }}
                  onClear={() => setImageUrl('')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary / Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                  rows={3}
                  placeholder="Short summary for cards and previews..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  placeholder="Full press release text (optional)..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  Additional Media ({attachments.length})
                </label>
                {attachments.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {attachments.map((att, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden border">
                        <MediaDisplay
                          url={att.url}
                          type={att.type}
                          alt={att.title || ''}
                          className="h-20 w-full object-cover"
                          controls={false}
                          showPlayIcon={att.type === 'video'}
                        />
                        <button
                          type="button"
                          onClick={() => removeAttachment(i)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  options={{ resourceType: 'auto', sources: ['local', 'url'], multiple: false }}
                  onSuccess={(result) => {
                    if (result.event === 'success') {
                      const type: MediaType =
                        result.info.resource_type === 'video' ? 'video' : 'image';
                      setAttachments((prev) => [
                        ...prev,
                        { type, url: result.info.secure_url, title: '' },
                      ]);
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      + Add photo or video
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {editingId ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    {editingId ? 'Update Press Release' : 'Create Press Release'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">All Press Releases</h2>

            {fetching ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : pressReleases.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No press releases yet.</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {pressReleases.map((release) => (
                  <div
                    key={release._id}
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                      editingId === release._id ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex gap-4">
                      {release.image_url && (
                        <div className="h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <MediaDisplay
                            url={release.image_url}
                            type={release.media_type || 'image'}
                            alt={release.title}
                            className="h-24 w-24 object-cover"
                            controls={false}
                            showPlayIcon={release.media_type === 'video'}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{release.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{release.excerpt}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">
                            {release.media_type || 'image'}
                          </span>
                          {(release.attachments?.length ?? 0) > 0 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              +{release.attachments!.length} media
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatDate(release.published_at, true)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(release)}
                          className="text-gray-600 hover:text-blue-600 p-1"
                          title="Edit"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(release._id)}
                          disabled={deleting === release._id}
                          className="text-red-600 hover:text-red-700 disabled:opacity-50 p-1"
                        >
                          {deleting === release._id ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
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
