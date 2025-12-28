import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
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
    enum: ['NATIONAL', 'STATE', 'DISTRICT', 'SPECIFIC_USER', 'ALL_MEMBERS'],
    required: true,
  },
  targetValue: {
    type: String, // State name, District name, or empty for NATIONAL/ALL_MEMBERS
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  recipientCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Clear the model if it exists to ensure schema updates are applied
if (mongoose.models.Message) {
  delete mongoose.models.Message;
}

const Message = mongoose.model('Message', MessageSchema);
export default Message;
