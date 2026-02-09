import Flat from '../models/Flat.js';
import Complaint from '../models/Complaint.js';

// Get flat statistics
const getFlatStats = async (req, res) => {
  try {
    const flatCode = req.user.flatCode;

    const flat = await Flat.findOne({ flatCode }).populate('members', 'username email');

    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    const complaints = await Complaint.find({ flatCode });

    const complaintsByType = {};
    complaints.forEach((c) => {
      complaintsByType[c.complaintType] = (complaintsByType[c.complaintType] || 0) + 1;
    });

    const activeComplaints = complaints.filter((c) => c.status === 'Active').length;
    const resolvedComplaints = complaints.filter((c) => c.status === 'Resolved').length;
    const archivedComplaints = complaints.filter((c) => c.status === 'Archived').length;

    res.json({
      success: true,
      stats: {
        flatName: flat.flatName,
        memberCount: flat.members.length,
        totalComplaints: complaints.length,
        activeComplaints,
        resolvedComplaints,
        archivedComplaints,
        complaintsByType,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get flat members
const getFlatMembers = async (req, res) => {
  try {
    const flatCode = req.user.flatCode;

    const flat = await Flat.findOne({ flatCode }).populate(
      'members',
      'username email karma'
    );

    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    res.json({
      success: true,
      members: flat.members,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getFlatStats, getFlatMembers };
