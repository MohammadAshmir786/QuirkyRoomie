import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    flatCode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.flatCode
      );
      navigate('/complaints');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-lg-custom border border-gray-200 animate-slideUp">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🏠</div>
            <h2 className="text-center font-bold text-3xl text-gray-900">Join QuirkyRoomie</h2>
            <p className="text-gray-600 text-sm mt-2 font-semibold">Create your account and start managing flat drama</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 border-2 border-red-300 rounded-xl p-4 mb-6 font-semibold text-sm animate-slideDown">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block font-bold text-gray-900 text-sm mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="john_doe"
                className="form-input"
              />
            </div>

            <div className="mb-5">
              <label className="block font-bold text-gray-900 text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="form-input"
              />
            </div>

            <div className="mb-5">
              <label className="block font-bold text-gray-900 text-sm mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="••••••••"
                className="form-input"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <div className="mb-8">
              <label className="block font-bold text-gray-900 text-sm mb-2">Flat Code</label>
              <input
                type="text"
                name="flatCode"
                value={formData.flatCode}
                onChange={handleChange}
                required
                placeholder="FLAT123"
                className="form-input"
              />
              <p className="text-xs text-gray-500 mt-1">Ask your flatmates for your flat's unique code</p>
            </div>

            <button 
              type="submit" 
              className="w-full px-4 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl text-sm font-bold hover:from-red-700 hover:to-red-800 transition transform hover:scale-105 shadow-lg-custom disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {loading ? '🔄 Creating Account...' : '🚀 Create Account'}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-semibold">or</span>
            </div>
          </div>

          <p className="text-center text-sm mt-6 text-gray-700">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-700 font-bold hover:text-indigo-800 transition">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
