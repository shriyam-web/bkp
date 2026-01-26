'use client';

import { useState, useEffect } from 'react';
import { Image as ImageIcon, Trash2, Loader2, Plus, ArrowUp, ArrowDown, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CldUploadWidget } from 'next-cloudinary';

interface GalleryItem {
  _id: string;
  title: string;
  image_url: string;
  order: number;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [order, setOrder] = useState(0);
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
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load gallery',
        variant: 'destructive',
      });
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!imageUrl) {
      toast({
        title: 'Error',
        description: 'Please upload a photo first',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          image_url: imageUrl,
          order: parseInt(order.toString()),
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Success!',
          description: 'Photo added to gallery successfully.',
        });
        setTitle('');
        setImageUrl('');
        setOrder(0);
        fetchGallery();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add photo',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Success!',
          description: 'Photo deleted.',
        });
        fetchGallery();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete photo',
        variant: 'destructive',
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleReorderUp = async (item: GalleryItem) => {
    const newOrder = item.order - 1;
    setUpdatingOrder(item._id);

    try {
      const res = await fetch(`/api/gallery?id=${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          image_url: item.image_url,
          order: newOrder,
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchGallery();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to reorder',
        variant: 'destructive',
      });
    } finally {
      setUpdatingOrder(null);
    }
  };

  const handleReorderDown = async (item: GalleryItem) => {
    const newOrder = item.order + 1;
    setUpdatingOrder(item._id);

    try {
      const res = await fetch(`/api/gallery?id=${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          image_url: item.image_url,
          order: newOrder,
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchGallery();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
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
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Photo
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g., Event Photo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo
                </label>
                {imageUrl ? (
                  <div className="relative aspect-video mb-2 group">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(result: any) => {
                      if (result.event === 'success') {
                        setImageUrl(result.info.secure_url);
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value))}
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Add to Gallery
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">All Photos</h2>

            {fetching ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : gallery.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No photos in gallery yet.</p>
            ) : (
              <div className="space-y-3 max-h-[700px] overflow-y-auto">
                {gallery.map((item, index) => (
                  <div
                    key={item._id}
                    className="border border-gray-200 rounded-lg p-4 flex gap-4 items-center hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <span className="bg-gray-200 text-gray-700 font-semibold px-3 py-1 rounded-full text-sm">
                        #{item.order}
                      </span>
                    </div>

                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-20 w-20 object-cover rounded-lg flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {item.image_url}
                      </p>
                    </div>

                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleReorderUp(item)}
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
                        onClick={() => handleReorderDown(item)}
                        disabled={updatingOrder === item._id}
                        className="text-blue-600 hover:text-blue-700 disabled:opacity-50 p-1"
                        title="Move down"
                      >
                        {updatingOrder === item._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
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
