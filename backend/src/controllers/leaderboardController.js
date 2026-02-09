import User from '../models/User.js';
import Complaint from '../models/Complaint.js';

// Get leaderboard by karma
const getLeaderboard = async (req, res) => {
  try {
    const flatCode = req.user.flatCode;

    const leaderboard = await User.find({ flatCode })
      .select('username email karma complaintsBadges')
      .sort({ karma: -1 })
      .limit(20);

    res.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get most complained user
const getMostComplaints = async (req, res) => {
  try {
    const flatCode = req.user.flatCode;

    const complaints = await Complaint.aggregate([
      { $match: { flatCode } },
      {
        $group: {
          _id: '$filedBy',
          count: { $sum: 1 },
          totalUpvotes: { $sum: '$votes.upvotes' },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 20 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          username: '$user.username',
          email: '$user.email',
          complaintCount: '$count',
          totalUpvotes: '$totalUpvotes',
        },
      },
    ]);

    res.json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getLeaderboard, getMostComplaints };
