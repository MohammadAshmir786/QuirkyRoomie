import { useState, useEffect } from 'react';
import { complaintService } from '../services';
import ComplaintCard from '../components/ComplaintCard';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Active');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    complaintType: 'Noise',
    severity: 'Annoying',
    suggestedPunishment: '',
  });

  useEffect(() => {
    fetchComplaints();
  }, [status]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintService.getComplaints(status);
      setComplaints(response.data.complaints);
    } catch (err) {
      setError('Failed to load complaints');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileComplaint = async (e) => {
    e.preventDefault();
    try {
      await complaintService.fileComplaint(
        formData.title,
        formData.description,
        formData.complaintType,
        formData.severity,
        formData.suggestedPunishment
      );
      setFormData({ title: '', description: '', complaintType: 'Noise', severity: 'Annoying', suggestedPunishment: '' });
      setShowForm(false);
      fetchComplaints();
    } catch (err) {
      setError('Failed to file complaint');
    }
  };

  const handleVote = async (complaintId, voteType) => {
    try {
      const response = await complaintService.voteComplaint(complaintId, voteType);
      setComplaints(
        complaints.map((c) =>
          c._id === complaintId ? response.data.complaint : c
        )
      );
    } catch (err) {
      setError('Failed to vote');
    }
  };

  const handleResolve = async (complaintId) => {
    try {
      const response = await complaintService.resolveComplaint(complaintId);
      setComplaints(
        complaints.map((c) =>
          c._id === complaintId ? response.data.complaint : c
        )
      );
    } catch (err) {
      setError('Failed to resolve complaint');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 flex-col md:flex-row gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              📝 <span className="text-gradient">Complaints</span>
            </h1>
            <p className="text-gray-600 mt-2 font-semibold text-lg">Let your voice be heard! File and vote on flat issues.</p>
          </div>
          <button
            className={`px-8 py-4 rounded-xl text-sm font-bold transition transform hover:scale-105 duration-300 shadow-lg-custom ${
              showForm 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-linear-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800'
            }`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '+ File Complaint'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border-2 border-red-300 rounded-xl p-4 mb-8 font-semibold text-sm animate-slideDown">
            ⚠️ {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-2xl p-8 shadow-lg-custom border border-gray-200 mb-10 animate-slideDown">
            <h3 className="font-bold text-2xl text-gray-900 mb-2">⚡ File a New Complaint</h3>
            <p className="text-gray-600 font-semibold mb-6">Share what's bothering you. Be detailed and fair!</p>
            <form onSubmit={handleFileComplaint} className="space-y-6">
              <div>
                <label className="block font-bold text-gray-900 text-sm mb-3">🎯 Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g., Dishes left in the sink again"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-900 text-sm mb-3">📖 Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Provide detailed information about what happened, when, and who was involved..."
                  className="form-input resize-none min-h-28"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-bold text-gray-900 text-sm mb-3">📂 Type</label>
                  <select
                    value={formData.complaintType}
                    onChange={(e) => setFormData({ ...formData, complaintType: e.target.value })}
                    className="form-input"
                  >
                    <option>Noise</option>
                    <option>Cleanliness</option>
                    <option>Bills</option>
                    <option>Pets</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-900 text-sm mb-3">⚠️ Severity</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="form-input"
                  >
                    <option>Mild</option>
                    <option>Annoying</option>
                    <option>Major</option>
                    <option>Nuclear</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-900 text-sm mb-3">⚡ Suggested Punishment</label>
                  <input
                    type="text"
                    value={formData.suggestedPunishment}
                    onChange={(e) => setFormData({ ...formData, suggestedPunishment: e.target.value })}
                    placeholder="e.g., Buy coffee for everyone"
                    className="form-input"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full px-6 py-4 bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-indigo-800 transition transform hover:scale-105 shadow-lg-custom"
              >
                🚀 File Complaint
              </button>
            </form>
          </div>
        )}

        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <label className="font-bold text-gray-900">Filter by Status:</label>
          <div className="flex gap-3 flex-wrap">
            {['Active', 'Resolved', 'Archived'].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition transform hover:scale-105 duration-300 ${
                  status === s
                    ? 'bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-lg-custom'
                    : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-indigo-600'
                }`}
              >
                {s === 'Active' && '🔴'} {s === 'Resolved' && '✅'} {s === 'Archived' && '📦'} {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-spin border-t-indigo-600 border-r-indigo-600"></div>
              <div className="absolute inset-2 flex items-center justify-center text-2xl">⏳</div>
            </div>
          </div>
        ) : complaints.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 shadow-lg border border-gray-200 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-gray-900 font-bold text-xl mb-2">No {status.toLowerCase()} complaints yet!</p>
            <p className="text-gray-600 font-semibold">
              {status === 'Active' && 'All is peaceful. Long may it last! 🕊️'}
              {status === 'Resolved' && 'Come back soon once some complaints are resolved.'}
              {status === 'Archived' && 'No archived complaints to show.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {complaints.map((complaint) => (
              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                onVote={handleVote}
                onResolve={handleResolve}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
