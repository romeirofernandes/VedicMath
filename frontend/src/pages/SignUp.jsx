import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!fullName.trim()) {
      return setError("Please enter your full name");
    }

    // Validate password
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const { data, error } = await signUp(email, password, fullName);

      if (error) throw error;

      if (!data.session) {
        setSuccess(true);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] px-4">
      <div className="flex items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#1e1e23]/40 backdrop-blur-sm border border-[#ffffff05] rounded-xl p-8 shadow-xl">
            <div className="text-center mb-5">
              <h2 className="font-bricolage font-bold text-3xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent">
                Join VedicMath
              </h2>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#3a2a2a] text-[#e0c9b1] p-3 rounded-md mb-6 text-sm border border-[#5a3a3a]"
              >
                {error}
              </motion.div>
            )}

            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="bg-[#2a3a2a] text-[#b1e0c9] p-4 rounded-md mb-6 text-sm border border-[#3a5a3a]">
                  <p>
                    Please check your email for a confirmation link to complete
                    your registration.
                  </p>
                </div>
                <Link
                  to="/signin"
                  className="text-[#e0c9b1] hover:underline transition-all"
                >
                  Return to Sign In
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[#e0c9b1] text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a35] border border-[#3a3a45] rounded-md text-[#e0c9b1] focus:outline-none focus:ring-2 focus:ring-[#e0c9b1]/30 focus:border-[#e0c9b1] transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#e0c9b1] text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a35] border border-[#3a3a45] rounded-md text-[#e0c9b1] focus:outline-none focus:ring-2 focus:ring-[#e0c9b1]/30 focus:border-[#e0c9b1] transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-[#e0c9b1] text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a35] border border-[#3a3a45] rounded-md text-[#e0c9b1] focus:outline-none focus:ring-2 focus:ring-[#e0c9b1]/30 focus:border-[#e0c9b1] transition-all duration-300"
                    placeholder="Create a password (min. 6 characters)"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-[#e0c9b1] text-sm font-medium mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a35] border border-[#3a3a45] rounded-md text-[#e0c9b1] focus:outline-none focus:ring-2 focus:ring-[#e0c9b1]/30 focus:border-[#e0c9b1] transition-all duration-300"
                    placeholder="Confirm your password"
                  />
                </div>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium transition-all duration-300 ${
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#d4b595]"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0f0f12]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                  </motion.button>
                </div>
                <p className="text-xs text-[#e0c9b1]/50 text-center mt-2">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </form>
            )}

            {!success && (
              <div className="mt-6 text-center">
                <p className="text-[#e0c9b1]/70">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-[#e0c9b1] hover:underline transition-all"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
