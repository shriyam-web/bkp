import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['image', 'video', 'banner'],
      default: 'image',
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  { _id: true }
);

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    image_url: {
      type: String,
      required: true,
    },
    media_type: {
      type: String,
      enum: ['image', 'video', 'banner'],
      default: 'image',
    },
    attachments: {
      type: [attachmentSchema],
      default: [],
    },
    published_at: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model('News', newsSchema);
