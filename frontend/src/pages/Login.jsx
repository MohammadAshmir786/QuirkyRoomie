import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const getLoginErrorMessage = (err) => {
  const statusCode = err?.response?.status;
  const backendMessage = err?.response?.data?.message;

  if (!err?.response) {
    return "Can't connect to server right now. Please try again.";
  }

  if (statusCode === 401) {
    return "Invalid email or password. Please try again.";
  }

  if (statusCode === 429) {
    return "Too many attempts. Please wait a moment and retry.";
  }

  return backendMessage || "Login failed. Please try again.";
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

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

    const email = formData.email.trim();
    const password = formData.password;
    const nextFieldErrors = {};

    if (!email) {
      nextFieldErrors.email = "Email is required.";
    }

    if (email && !isValidEmail(email)) {
      nextFieldErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextFieldErrors.password = "Password is required.";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setFieldErrors({});
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      // navigate("/complaints");
    } catch (err) {
      setError(getLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to manage your flat drama"
      footerText="Don't have an account?"
      footerLinkText="Sign up here"
      footerLinkHref="/register"
    >
      {error && (
        <div className="bg-red-50 text-red-700 border-2 border-red-300 rounded-xl p-4 mb-6 font-semibold text-sm animate-slideDown">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6">
          <label className="block font-bold text-gray-900 text-sm mb-3">
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

        <div className="mb-8">
          <label className="block font-bold text-gray-900 text-sm mb-3">
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
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-indigo-800 transition transform hover:scale-105 shadow-lg-custom disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "🔄 Logging in..." : "🔓 Login"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
