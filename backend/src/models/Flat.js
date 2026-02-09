import mongoose from 'mongoose';

const flatSchema = new mongoose.Schema(
  {
    flatCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    flatName: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    stats: {
      totalComplaints: {
        type: Number,
        default: 0,
      },
      resolvedComplaints: {
        type: Number,
        default: 0,
      },
      complaintsByType: {
        type: Map,
        of: Number,
        default: new Map(),
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Flat', flatSchema);
