import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  targetType: {
    type: String,
    enum: ['NATIONAL', 'STATE', 'RASHTRIYA_PARISHAD', 'RASHTRIYA_KAARYASAMITI', 'DISTRICT', 'CUSTOM_LIST'],
    required: true,
  },
  targetValue: {
    type: String,
  },
  recipientEmails: [{
    type: String,
  }],
  recipientCount: {
    type: Number,
    default: 0,
  },
  successCount: {
    type: Number,
    default: 0,
  },
  sentAt: {
    type: Date,
    default: () => new Date(),
  },
}, { timestamps: true });

export default mongoose.models.Email || mongoose.model('Email', EmailSchema);
