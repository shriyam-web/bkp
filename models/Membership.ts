import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    fathersOrHusbandsName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    voterIdCardNo: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    membershipType: {
      type: String,
      enum: ['Active Membership', 'Normal Membership'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Membership || mongoose.model('Membership', membershipSchema);
