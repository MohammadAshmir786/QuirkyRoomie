const ComplaintCard = ({ complaint, onVote, onResolve }) => {
  const severityColors = {
    Mild: 'bg-blue-100 text-blue-900 font-bold border-l-4 border-blue-500',
    Annoying: 'bg-amber-100 text-amber-900 font-bold border-l-4 border-amber-500',
    Major: 'bg-orange-100 text-orange-900 font-bold border-l-4 border-orange-500',
    Nuclear: 'bg-red-100 text-red-900 font-bold border-l-4 border-red-600',
  };

  const statusColors = {
    Active: 'bg-green-100 text-green-900 font-bold border-green-300 border',
    Resolved: 'bg-blue-100 text-blue-900 font-bold border-blue-300 border',
    Archived: 'bg-gray-200 text-gray-900 font-bold border-gray-400 border',
  };

  const netVotes = complaint.votes.upvotes - complaint.votes.downvotes;

  return (
    <div className="bg-white rounded-2xl p-7 shadow-medium border-2 border-gray-200 hover:shadow-lg-custom transition transform hover:-translate-y-1 duration-300 card-hover">
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-xl text-gray-900 leading-tight max-w-2xl">{complaint.title}</h3>
            <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${statusColors[complaint.status]}`}>
              {complaint.status}
            </span>
          </div>

          <p className="text-gray-600 mt-3 text-sm font-semibold leading-relaxed">
            {complaint.description}
          </p>

          <div className="mt-5 flex gap-3 flex-wrap">
            <span className={`inline-block px-4 py-2 rounded-lg text-xs font-bold ${severityColors[complaint.severity]}`}>
              🚨 {complaint.severity}
            </span>
            <span className="inline-block px-4 py-2 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-300">
              📂 {complaint.complaintType}
            </span>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 font-semibold">
              📤 Filed by <strong className="text-gray-900">{complaint.filedBy?.username}</strong> on{' '}
              <strong className="text-gray-900">{new Date(complaint.createdAt).toLocaleDateString()}</strong>
            </p>
          </div>

          {complaint.suggestedPunishment && (
            <div className="mt-5 p-4 bg-linear-to-r from-amber-100 to-orange-100 rounded-lg border-l-4 border-amber-600">
              <p className="text-sm"><strong className="text-amber-900">⚡ Suggested Punishment:</strong> <span className="text-amber-900 font-semibold">{complaint.suggestedPunishment}</span></p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center bg-linear-to-b from-gray-50 to-gray-100 rounded-xl p-5 min-w-30 border border-gray-300 text-center sticky top-4">
          <div className={`text-4xl font-bold mb-2 ${
            netVotes > 0 ? 'text-green-600' : netVotes < 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {netVotes}
          </div>
          <div className="text-xs text-gray-700 font-bold mb-4 leading-tight">
            <div className="mb-1">👍 <span className="text-green-700">{complaint.votes.upvotes}</span></div>
            <div>👎 <span className="text-red-700">{complaint.votes.downvotes}</span></div>
          </div>

          <div className="w-full space-y-2">
            <button 
              className="w-full px-3 py-2.5 text-xs bg-linear-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition transform hover:scale-105 shadow-soft" 
              onClick={() => onVote(complaint._id, 'upvote')}
              title="Upvote this complaint"
            >
              👍 Upvote
            </button>
            <button 
              className="w-full px-3 py-2.5 text-xs bg-linear-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition transform hover:scale-105 shadow-soft" 
              onClick={() => onVote(complaint._id, 'downvote')}
              title="Downvote this complaint"
            >
              👎 Downvote
            </button>
          </div>

          {complaint.status === 'Active' && (
            <button 
              className="w-full px-3 py-2.5 text-xs mt-3 bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition transform hover:scale-105 shadow-soft" 
              onClick={() => onResolve(complaint._id)}
              title="Mark this complaint as resolved"
            >
              ✓ Resolve
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
