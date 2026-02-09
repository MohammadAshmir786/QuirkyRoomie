import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    complaintType: {
      type: String,
      enum: ['Noise', 'Cleanliness', 'Bills', 'Pets', 'Other'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['Mild', 'Annoying', 'Major', 'Nuclear'],
      required: true,
    },
    filedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    flatCode: {
      type: String,
      required: true,
    },
    votes: {
      upvotes: {
        type: Number,
        default: 0,
      },
      downvotes: {
        type: Number,
        default: 0,
      },
      userVotes: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          voteType: {
            type: String,
            enum: ['upvote', 'downvote'],
          },
        },
      ],
    },
    status: {
      type: String,
      enum: ['Active', 'Resolved', 'Archived'],
      default: 'Active',
    },
    suggestedPunishment: {
      type: String,
      default: null,
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    archivedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Auto-archive downvoted complaints after 3 days
complaintSchema.statics.archiveDownvoted = async function () {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  await this.updateMany(
    {
      status: 'Active',
      'votes.downvotes': { $gt: 'votes.upvotes' },
      createdAt: { $lt: threeDaysAgo },
    },
    {
      status: 'Archived',
      archivedAt: new Date(),
    }
  );
};

export default mongoose.model('Complaint', complaintSchema);
