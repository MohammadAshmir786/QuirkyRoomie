const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-indigo-700 via-indigo-600 to-indigo-900 text-white py-32 px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-slideUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Manage Flatmate <span className="text-yellow-300 animate-pulse">Drama</span> with <span className="text-red-200 animate-pulse">Humor</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-semibold leading-relaxed">
              Turn those silly roommate conflicts into a hilarious game. File complaints, vote on justice, and earn karma points!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/register" className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-bold text-lg hover:bg-yellow-100 transition transform hover:scale-110 shadow-lg-custom hover:shadow-glow duration-300">
                🚀 Get Started Free
              </a>
              <a href="/login" className="px-8 py-4 bg-indigo-900 text-white rounded-2xl font-bold text-lg hover:bg-indigo-950 transition transform hover:scale-110 shadow-lg-custom border-2 border-white duration-300">
                Sign In
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl p-8 border-2 border-white text-center hover:bg-opacity-30 transition transform hover:scale-105 duration-300 shadow-lg-custom">
              <div className="text-5xl font-bold text-yellow-300 mb-3 animate-bounce-gentle">10K+</div>
              <p className="text-indigo-900 font-bold text-lg">Active Flatmates</p>
            </div>
            <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl p-8 border-2 border-white text-center hover:bg-opacity-30 transition transform hover:scale-105 duration-300 shadow-lg-custom">
              <div className="text-5xl font-bold text-red-300 mb-3 animate-bounce-gentle">50K+</div>
              <p className="text-indigo-900 font-bold text-lg">Complaints Filed</p>
            </div>
            <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl p-8 border-2 border-white text-center hover:bg-opacity-30 transition transform hover:scale-105 duration-300 shadow-lg-custom">
              <div className="text-5xl font-bold text-green-300 mb-3 animate-bounce-gentle">95%</div>
              <p className="text-indigo-900 font-bold text-lg">Conflicts Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">Why Choose QuirkyRoomie?</h2>
            <p className="text-center text-gray-600 text-xl font-semibold">Everything you need to manage flat conflicts with style and humor</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border-2 border-blue-300 hover:shadow-lg-custom transition transform hover:-translate-y-3 duration-300 group">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition duration-300">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">File Complaints</h3>
              <p className="text-gray-700 leading-relaxed">Document household issues with detailed descriptions, severity levels, and suggested punishments. Keep a record of everything!</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-linear-to-br from-red-50 to-red-100 rounded-3xl p-8 border-2 border-red-300 hover:shadow-lg-custom transition transform hover:-translate-y-3 duration-300 group">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition duration-300">🗳️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Vote & Discuss</h3>
              <p className="text-gray-700 leading-relaxed">Let your flatmates upvote or downvote complaints. See what the majority thinks and settle disputes democratically!</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-3xl p-8 border-2 border-green-300 hover:shadow-lg-custom transition transform hover:-translate-y-3 duration-300 group">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition duration-300">🏆</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Earn Karma</h3>
              <p className="text-gray-700 leading-relaxed">Build your reputation by resolving complaints and making fair judgments. Climb the leaderboard and become a legend!</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-32 px-6 bg-linear-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="absolute -left-5 top-0 w-10 h-10 bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">1</div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-300 ml-4 hover:shadow-lg-custom transition duration-300 transform hover:-translate-y-2">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Create Flat</h4>
                <p className="text-gray-600 font-semibold">Set up your flat and invite flatmates to join</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-0 w-10 h-10 bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">2</div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-300 ml-4 hover:shadow-lg-custom transition duration-300 transform hover:-translate-y-2">
                <h4 className="text-xl font-bold text-gray-900 mb-3">File Issues</h4>
                <p className="text-gray-600 font-semibold">Report household problems with details</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-0 w-10 h-10 bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">3</div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-300 ml-4 hover:shadow-lg-custom transition duration-300 transform hover:-translate-y-2">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Vote & Discuss</h4>
                <p className="text-gray-600 font-semibold">Your flatmates vote on the situation</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-0 w-10 h-10 bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">4</div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-300 ml-4 hover:shadow-lg-custom transition duration-300 transform hover:-translate-y-2">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Resolve & Earn</h4>
                <p className="text-gray-600 font-semibold">Get karma points when issues are resolved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-indigo-700 via-indigo-800 to-indigo-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Flat?</h2>
          <p className="text-xl text-white font-semibold mb-10 leading-relaxed">Join thousands of flatmates who've turned their conflicts into comedy gold.</p>
          <a href="/register" className="inline-block px-12 py-4 bg-white text-indigo-700 rounded-2xl font-bold text-lg hover:bg-yellow-100 transition transform hover:scale-110 shadow-lg-custom hover:shadow-glow duration-300">
            🎯 Start Your Free Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
