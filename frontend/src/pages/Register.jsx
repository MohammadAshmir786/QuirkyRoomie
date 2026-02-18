import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const getRegisterErrorMessage = (err) => {
  const statusCode = err?.response?.status;
  const backendMessage = err?.response?.data?.message;

  if (!err?.response) {
    return "Can't connect to server right now. Please try again.";
  }

  if (statusCode === 400) {
    return backendMessage || "Please check your details and try again.";
  }

  if (statusCode === 409) {
    return "This email or username is already in use.";
  }

  if (statusCode === 429) {
    return "Too many attempts. Please wait a moment and retry.";
  }

  return backendMessage || "Registration failed. Please try again.";
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    flatCode: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const flatCode = formData.flatCode.trim();
    const nextFieldErrors = {};

    if (!username) {
      nextFieldErrors.username = "Username is required.";
    }

    if (!email) {
      nextFieldErrors.email = "Email is required.";
    }

    if (email && !isValidEmail(email)) {
      nextFieldErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextFieldErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextFieldErrors.password = "Password must be at least 6 characters.";
    }

    if (!flatCode) {
      nextFieldErrors.flatCode = "Flat code is required.";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setFieldErrors({});
    setError("");
    setLoading(true);

    try {
      await register(
        username,
        email,
        password,
        flatCode,
      );
      // navigate("/complaints");
    } catch (err) {
      setError(getRegisterErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join the Flatmate Fun!"
      subtitle="Create your account to start managing your flat drama"
      footerText="Already have an account?"
      footerLinkText="Sign in here"
      footerLinkHref="/login"
    >
      {error && (
        <div className="bg-red-50 text-red-700 border-2 border-red-300 rounded-xl p-4 mb-6 font-semibold text-sm animate-slideDown">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-5">
          <label className="block font-bold text-gray-900 text-sm mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="john_doe"
            className="form-input"
          />
          {fieldErrors.username && (
            <p className="text-xs text-red-600 font-semibold mt-2">
              {fieldErrors.username}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="block font-bold text-gray-900 text-sm mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="form-input"
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-600 font-semibold mt-2">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="block font-bold text-gray-900 text-sm mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="form-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-xs text-red-600 font-semibold mt-2">
              {fieldErrors.password}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
        </div>

        <div className="mb-8">
          <label className="block font-bold text-gray-900 text-sm mb-2">
            Flat Code
          </label>
          <input
            type="text"
            name="flatCode"
            value={formData.flatCode}
            onChange={handleChange}
            placeholder="FLAT123"
            className="form-input"
          />
          {fieldErrors.flatCode && (
            <p className="text-xs text-red-600 font-semibold mt-2">
              {fieldErrors.flatCode}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Ask your flatmates for your flat's unique code
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl text-sm font-bold hover:from-red-700 hover:to-red-800 transition transform hover:scale-105 shadow-lg-custom disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "🔄 Creating Account..." : "🚀 Create Account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
