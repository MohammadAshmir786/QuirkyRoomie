import { useState, useEffect } from 'react';
import { flatService } from '../services';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, membersResponse] = await Promise.all([
        flatService.getFlatStats(),
        flatService.getFlatMembers(),
      ]);
      setStats(statsResponse.data.stats);
      setMembers(membersResponse.data.members);
    } catch (err) {
      setError('Failed to load statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-10 flex justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) {
    return <div className="max-w-6xl mx-auto px-5 py-10">No data available</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">📊 Flat Statistics</h1>

      {error && <div className="bg-red-200 text-red-800 border-2 border-red-400 rounded-md p-4 mb-6 font-semibold">{error}</div>}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-gray-300 text-center">
          <div className="text-5xl font-bold text-indigo-700">
            {stats.memberCount}
          </div>
          <div className="text-gray-900 mt-3 font-bold">Members</div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-gray-300 text-center">
          <div className="text-5xl font-bold text-red-700">
            {stats.totalComplaints}
          </div>
          <div className="text-gray-900 mt-3 font-bold">Total Complaints</div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-gray-300 text-center">
          <div className="text-5xl font-bold text-green-700">
            {stats.activeComplaints}
          </div>
          <div className="text-gray-900 mt-3 font-bold">Active</div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-gray-300 text-center">
          <div className="text-5xl font-bold text-amber-700">
            {stats.resolvedComplaints}
          </div>
          <div className="text-gray-900 mt-3 font-bold">Resolved</div>
        </div>
      </div>

      {/* Complaint Types */}
      <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-gray-300 mb-8">
        <h3 className="font-bold text-lg text-gray-900 mb-6">Complaints by Type</h3>
        <div>
          {Object.entries(stats.complaintsByType).length === 0 ? (
            <p className="text-gray-900 font-semibold">No complaints filed yet</p>
          ) : (
            Object.entries(stats.complaintsByType).map(([type, count]) => (
              <div key={type} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-900">{type}</span>
                  <span className="font-bold text-indigo-700">{count}</span>
                </div>
                <div className="bg-gray-300 rounded-md h-3 overflow-hidden">
                  <div
                    style={{
                      backgroundColor: '#4F46E5',
                      height: '100%',
                      width: `${(count / stats.totalComplaints) * 100}%`,
                      transition: 'width 0.3s ease',
                    }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Members */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
        <h3 className="font-bold text-base mb-5">Flat Members</h3>
        <div>
          {members.length === 0 ? (
            <p className="text-gray-500">No members</p>
          ) : (
            <div className="space-y-1">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0"
                >
                  <div>
                    <div className="font-medium text-sm">{member.username}</div>
                    <div className="text-xs text-gray-500">{member.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-indigo-600">{member.karma}</div>
                    <div className="text-xs text-gray-500">Karma</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
