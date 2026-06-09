'use client';

import { useState, useEffect } from 'react';
import { Image as ImageIcon, Trash2, Loader2, Plus, ArrowUp, ArrowDown, Pencil, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MediaUploadWidget from '@/components/MediaUploadWidget';
import MediaDisplay from '@/components/MediaDisplay';
import { MEDIA_TYPES, MediaType } from '@/lib/media';

interface GalleryItem {
  _id: string;
  title: string;
  image_url: string;
  media_type: MediaType;
  category: string;
  order: number;
}

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'events', label: 'Events' },
  { value: 'rallies', label: 'Rallies' },
  { value: 'banners', label: 'Banners' },
  { value: 'campaigns', label: 'Campaigns' },
];

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [category, setCategory] = useState('general');
  const [order, setOrder] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) {
        setGallery(data.data || []);
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to load gallery',
        variant: 'destructive',
      });
    } finally {
      setFetching(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setImageUrl('');
    setMediaType('image');
    setCategory('general');
    setOrder(0);
    setEditingId(null);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item._id);
    setTitle(item.title);
    setImageUrl(item.image_url);
    setMediaType(item.media_type || 'image');
    setCategory(item.category || 'general');
    setOrder(item.order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!imageUrl) {
      toast({
        title: 'Error',
        description: 'Please upload media first',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const payload = {
      title,
      image_url: imageUrl,
      media_type: mediaType,
      category,
      order: parseInt(order.toString()),
    };

    try {
      const res = await fetch(
        editingId ? `/api/gallery?id=${editingId}` : '/api/gallery',
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
          description: editingId ? 'Media updated successfully.' : 'Media added to gallery.',
        });
        resetForm();
        fetchGallery();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save media',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        toast({ title: 'Success!', description: 'Item deleted.' });
        if (editingId === id) resetForm();
        fetchGallery();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete item',
        variant: 'destructive',
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleReorder = async (item: GalleryItem, direction: 'up' | 'down') => {
    const newOrder = direction === 'up' ? item.order - 1 : item.order + 1;
    setUpdatingOrder(item._id);

    try {
      const res = await fetch(`/api/gallery?id=${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          image_url: item.image_url,
          media_type: item.media_type || 'image',
          category: item.category || 'general',
          order: newOrder,
        }),
      });

      const data = await res.json();
      if (data.success) fetchGallery();
      else throw new Error(data.error);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to reorder',
        variant: 'destructive',
      });
    } finally {
      setUpdatingOrder(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <ImageIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {editingId ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {editingId ? 'Edit Media' : 'Add Media'}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  title="Cancel edit"
                >
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
                  placeholder="e.g., Rally at Delhi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {mediaType === 'video' ? 'Video' : mediaType === 'banner' ? 'Banner' : 'Photo'}
                </label>
                <MediaUploadWidget
                  mediaUrl={imageUrl}
                  mediaType={mediaType}
                  onMediaChange={(url, type) => {
                    setImageUrl(url);
                    setMediaType(type);
                  }}
                  onClear={() => setImageUrl('')}
                  label={`Upload ${mediaType}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value))}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
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
                    {editingId ? 'Update Media' : 'Add to Gallery'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">All Media</h2>

            {fetching ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : gallery.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No media in gallery yet.</p>
            ) : (
              <div className="space-y-3 max-h-[700px] overflow-y-auto">
                {gallery.map((item) => (
                  <div
                    key={item._id}
                    className={`border rounded-lg p-4 flex gap-4 items-center hover:shadow-md transition-shadow ${
                      editingId === item._id ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <span className="bg-gray-200 text-gray-700 font-semibold px-3 py-1 rounded-full text-sm flex-shrink-0">
                      #{item.order}
                    </span>

                    <div className="h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <MediaDisplay
                        url={item.image_url}
                        type={item.media_type || 'image'}
                        alt={item.title}
                        className="h-20 w-20 object-cover"
                        showPlayIcon={item.media_type === 'video'}
                        controls={false}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">
                          {item.media_type || 'image'}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                          {item.category || 'general'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-gray-600 hover:text-blue-600 p-1"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleReorder(item, 'up')}
                        disabled={updatingOrder === item._id}
                        className="text-blue-600 hover:text-blue-700 disabled:opacity-50 p-1"
                        title="Move up"
                      >
                        {updatingOrder === item._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowUp className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleReorder(item, 'down')}
                        disabled={updatingOrder === item._id}
                        className="text-blue-600 hover:text-blue-700 disabled:opacity-50 p-1"
                        title="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deleting === item._id}
                        className="text-red-600 hover:text-red-700 disabled:opacity-50 p-1"
                        title="Delete"
                      >
                        {deleting === item._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
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
