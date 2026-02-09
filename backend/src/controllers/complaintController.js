import Complaint from '../models/Complaint.js';
import User from '../models/User.js';

// Punishment suggestions
const punishments = [
  "Didn't clean the dishes? You're making chai for everyone for a week.",
  'Blasted loud music at 2 AM? You owe everyone samosas.',
  'Hogging the bathroom? You are banned from hot water for a week.',
  'Left dishes in the sink? You are cooking biryani for everyone.',
  'Loud phone calls? You are paying for pizza night.',
  'Thermostat wars? You are paying the electricity bill.',
  'Borrowed stuff without asking? Time to do everyone\'s laundry.',
];

// File a complaint
const fileComplaint = async (req, res) => {
  try {
    const { title, description, complaintType, severity } = req.body;
    const userId = req.user.userId;
    const flatCode = req.user.flatCode;

    // Validation
    if (!title || !description || !complaintType || !severity) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const complaint = await Complaint.create({
      title,
      description,
      complaintType,
      severity,
      filedBy: userId,
      flatCode,
    });

    // Add complaint to user
    await User.findByIdAndUpdate(
      userId,
      { $push: { complaintsFiled: complaint._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Complaint filed successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all complaints for a flat
const getComplaints = async (req, res) => {
  try {
    const flatCode = req.user.flatCode;
    const { status = 'Active' } = req.query;

    const complaints = await Complaint.find({
      flatCode,
      status,
    })
      .populate('filedBy', 'username email')
      .populate('resolvedBy', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single complaint
const getComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('filedBy', 'username email')
      .populate('resolvedBy', 'username')
      .populate('votes.userVotes.userId', 'username');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vote on complaint
const voteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body; // 'upvote' or 'downvote'
    const userId = req.user.userId;

    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({ message: 'Invalid vote type' });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check if user already voted
    const existingVote = complaint.votes.userVotes.find(
      (v) => v.userId.toString() === userId
    );

    if (existingVote) {
      // Remove previous vote
      if (existingVote.voteType === 'upvote') {
        complaint.votes.upvotes -= 1;
      } else {
        complaint.votes.downvotes -= 1;
      }
      complaint.votes.userVotes = complaint.votes.userVotes.filter(
        (v) => v.userId.toString() !== userId
      );
    }

    // Add new vote
    if (voteType === 'upvote') {
      complaint.votes.upvotes += 1;
    } else {
      complaint.votes.downvotes += 1;
    }

    complaint.votes.userVotes.push({
      userId,
      voteType,
    });

    // Generate punishment if upvotes >= 10
    if (complaint.votes.upvotes >= 10 && !complaint.suggestedPunishment) {
      complaint.suggestedPunishment =
        punishments[Math.floor(Math.random() * punishments.length)];
    }

    await complaint.save();

    res.json({
      success: true,
      message: 'Vote recorded',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resolve complaint
const resolveComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      {
        status: 'Resolved',
        resolvedBy: userId,
        resolvedAt: new Date(),
      },
      { new: true }
    )
      .populate('filedBy', 'username email')
      .populate('resolvedBy', 'username');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Award karma points
    await User.findByIdAndUpdate(
      userId,
      { $inc: { karma: 10 } },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Complaint resolved successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trending complaints
const getTrendingComplaints = async (req, res) => {
  try {
    const flatCode = req.user.flatCode;

    const complaints = await Complaint.find({
      flatCode,
      status: 'Active',
    })
      .populate('filedBy', 'username email')
      .sort({ 'votes.upvotes': -1 })
      .limit(10);

    res.json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { fileComplaint, getComplaints, getComplaint, voteComplaint, resolveComplaint, getTrendingComplaints };
