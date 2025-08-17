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
      className="max-w-md mx-auto p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-purple-300"
      noValidate
    >
      <h2 className="text-4xl font-extrabold text-purple-700 mb-8 text-center drop-shadow-sm">
        {mode === "login" ? "Log In to Library" : "Create a Library Account"}
      </h2>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          className="block py-2.5 px-0 w-full text-purple-900 bg-transparent border-0 border-b-2 border-purple-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-500 peer"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <label
          htmlFor="email"
          className="absolute text-purple-600 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75"
        >
          Email
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="password"
          className="block py-2.5 px-0 w-full text-purple-900 bg-transparent border-0 border-b-2 border-purple-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-500 peer"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <label
          htmlFor="password"
          className="absolute text-purple-600 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin- peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75"
        >
          Password
        </label>
      </div>

      {errMsg && (
        <div className="text-red-600 text-center font-semibold mb-4">{errMsg}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-pink-400 text-white font-extrabold shadow-lg hover:from-pink-400 hover:to-purple-700 transition duration-200 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? "Please wait..." : mode === "login" ? "Log In" : "Register"}
      </button>
    </form>
  );
}
