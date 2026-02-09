import { useState, useEffect } from 'react';
import { leaderboardService } from '../services';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [mostComplaints, setMostComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('karma');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [karmaResponse, complaintsResponse] = await Promise.all([
        leaderboardService.getLeaderboard(),
        leaderboardService.getMostComplaints(),
      ]);
      setLeaderboard(karmaResponse.data.leaderboard);
      setMostComplaints(complaintsResponse.data.complaints);
    } catch (err) {
      setError('Failed to load leaderboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
            🏆 <span className="text-gradient">Leaderboard</span>
          </h1>
          <p className="text-gray-600 text-lg font-semibold">See who rules the flat!</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border-2 border-red-300 rounded-xl p-4 mb-8 font-semibold text-sm animate-slideDown">
            ⚠️ {error}
          </div>
        )}

        <div className="flex gap-4 mb-12 justify-center flex-wrap">
          <button
            className={`px-8 py-3 text-sm font-bold rounded-xl transition transform hover:scale-105 duration-300 ${
              activeTab === 'karma'
                ? 'bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-lg-custom'
                : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-indigo-600 hover:text-indigo-600'
            }`}
            onClick={() => setActiveTab('karma')}
          >
            👑 Top Flatmates (Karma)
          </button>
          <button
            className={`px-8 py-3 text-sm font-bold rounded-xl transition transform hover:scale-105 duration-300 ${
              activeTab === 'complaints'
                ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-lg-custom'
                : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-red-600 hover:text-red-600'
            }`}
            onClick={() => setActiveTab('complaints')}
          >
            🔥 Most Complained
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-spin border-t-indigo-600 border-r-indigo-600"></div>
              <div className="absolute inset-2 flex items-center justify-center text-2xl">⏳</div>
            </div>
          </div>
        ) : activeTab === 'karma' ? (
          <div className="space-y-4">
            {leaderboard.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 text-center">
                <div className="text-5xl mb-4">👀</div>
                <p className="text-gray-900 font-bold text-lg">No users yet - be the first!</p>
              </div>
            ) : (
              leaderboard.map((user, index) => (
                <div 
                  key={user._id} 
                  className={`bg-white rounded-2xl p-6 shadow-medium border-2 transition transform hover:-translate-y-1 duration-300 hover:shadow-lg-custom ${
                    index === 0 ? 'border-yellow-400 bg-linear-to-r from-yellow-50 to-white' :
                    index === 1 ? 'border-gray-400 bg-linear-to-r from-gray-50 to-white' :
                    index === 2 ? 'border-orange-400 bg-linear-to-r from-orange-50 to-white' :
                    'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <span className="text-4xl min-w-16 text-center font-bold">
                        {getMedalEmoji(index) || `#${index + 1}`}
                      </span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl">{user.username}</h3>
                        <p className="text-gray-600 text-sm mt-1 font-semibold">
                          📧 {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right bg-linear-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
                      <div className="text-4xl font-bold text-indigo-700">
                        {user.karma}
                      </div>
                      <div className="text-xs text-indigo-600 font-bold mt-1">Karma Points</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {mostComplaints.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 text-center">
                <div className="text-5xl mb-4">🤐</div>
                <p className="text-gray-900 font-bold text-lg">No complaints yet - let's keep it that way!</p>
              </div>
            ) : (
              mostComplaints.map((user, index) => (
                <div 
                  key={user._id} 
                  className="bg-white rounded-2xl p-6 shadow-medium border-2 border-red-200 transition transform hover:-translate-y-1 duration-300 hover:shadow-lg-custom bg-linear-to-r from-red-50 to-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <span className="text-4xl min-w-16 text-center font-bold text-red-600">
                        #{index + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl">{user.username}</h3>
                        <p className="text-gray-600 text-sm mt-1 font-semibold">
                          📧 {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-right bg-linear-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200 min-w-32.5">
                        <div className="text-3xl font-bold text-red-700">
                          {user.complaintCount}
                        </div>
                        <div className="text-xs text-red-600 font-bold mt-1">Complaints</div>
                      </div>
                      <div className="text-right bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 min-w-32.5">
                        <div className="text-3xl font-bold text-orange-700">
                          {user.totalUpvotes}
                        </div>
                        <div className="text-xs text-orange-600 font-bold mt-1">Upvotes</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
