import mongoose from 'mongoose';

const LegislativeAssemblySchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      en: { type: String, required: true },
      hi: { type: String, default: '' },
    },
    constituencyNumber: {
      type: Number,
      default: null,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

LegislativeAssemblySchema.index({ state: 1, 'name.en': 1 }, { unique: true });

export default mongoose.models.LegislativeAssembly ||
  mongoose.model('LegislativeAssembly', LegislativeAssemblySchema);
