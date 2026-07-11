import mongoose from 'mongoose';
import { normalizeBoothLabel } from '@/lib/normalize-booth';

const CommitteeMemberSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    hi: { type: String, required: true },
  },
  position: {
    en: { type: String, required: true },
    hi: { type: String, required: true },
  },
  image: { type: String },
  bio: {
    en: { type: String },
    hi: { type: String },
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String, default: 'India' },
  },
  state: { type: String },
  district: { type: String },
  constituency: { type: String }, // Legislative assembly name (booth committee)
  booth: { type: String }, // Booth number/name (booth committee)
  isBoothIncharge: { type: Boolean, default: false },
  mobileNumber: { type: String },
  email: { type: String },
  type: {
    type: String,
    enum: ['NATIONAL', 'STATE', 'RASHTRIYA_PARISHAD', 'RASHTRIYA_KAARYASAMITI', 'DISTRICT', 'BOOTH'],
    required: true,
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

function applyBoothNormalization(update: Record<string, unknown> | null | undefined) {
  if (!update || typeof update !== 'object') return;
  const set = (update.$set && typeof update.$set === 'object'
    ? (update.$set as Record<string, unknown>)
    : update) as Record<string, unknown>;

  if (typeof set.booth === 'string') {
    set.booth = normalizeBoothLabel(set.booth);
  }
}

CommitteeMemberSchema.pre('save', function (next) {
  if (typeof this.booth === 'string') {
    this.booth = normalizeBoothLabel(this.booth);
  }
  next();
});

CommitteeMemberSchema.pre(['findOneAndUpdate', 'updateOne', 'updateMany'], function (next) {
  applyBoothNormalization(this.getUpdate() as Record<string, unknown>);
  next();
});

export default mongoose.models.CommitteeMember || mongoose.model('CommitteeMember', CommitteeMemberSchema);
