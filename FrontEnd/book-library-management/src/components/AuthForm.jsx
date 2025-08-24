import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode }) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
        navigate("/");
      } else {
        await register(email, password);
        navigate("/login");
      }
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Authentication failed.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-10 rounded-3xl border bg-white/70 dark:bg-black/60 backdrop-blur-xl shadow-2xl border-purple-300 dark:border-gray-700 transition-colors"
      noValidate
    >
      <h2 className="text-4xl font-extrabold text-purple-700 dark:text-yellow-300 mb-8 text-center drop-shadow-sm">
        {mode === "login" ? "Log In to Library" : "Create a Library Account"}
      </h2>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full bg-transparent text-purple-900 dark:text-yellow-100 border-0 border-b-2 border-purple-300 dark:border-yellow-300 focus:outline-none focus:ring-0 focus:border-pink-500 dark:focus:border-yellow-400 peer transition"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
        />
        <label
          htmlFor="email"
          className="absolute text-purple-600 dark:text-yellow-200 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75"
        >
          Email
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full bg-transparent text-purple-900 dark:text-yellow-100 border-0 border-b-2 border-purple-300 dark:border-yellow-300 focus:outline-none focus:ring-0 focus:border-pink-500 dark:focus:border-yellow-400 peer transition"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="current-password"
        />
        <label
          htmlFor="password"
          className="absolute text-purple-600 dark:text-yellow-200 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75"
        >
          Password
        </label>
      </div>

      {errMsg && (
        <div className="text-red-600 dark:text-red-400 text-center font-semibold mb-4">{errMsg}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-pink-400 dark:from-gray-900 dark:via-purple-900 dark:to-yellow-500 text-white dark:text-black font-extrabold shadow-lg hover:from-pink-400 hover:to-purple-700 transition duration-200 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? "Please wait..." : mode === "login" ? "Log In" : "Register"}
      </button>
    </form>
  );
}
