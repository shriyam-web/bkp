import mongoose from 'mongoose';

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
  state: { type: String }, // For state and district committee members
  district: { type: String }, // For district committee members
  mobileNumber: { type: String },
  type: {
    type: String,
    enum: ['NATIONAL', 'STATE', 'RASHTRIYA_PARISHAD', 'RASHTRIYA_KAARYASAMITI', 'DISTRICT'],
    required: true,
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.CommitteeMember || mongoose.model('CommitteeMember', CommitteeMemberSchema);
