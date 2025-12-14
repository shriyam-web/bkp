import mongoose from 'mongoose';

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
    image_url: {
      type: String,
      required: true,
    },
    published_at: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model('News', newsSchema);
