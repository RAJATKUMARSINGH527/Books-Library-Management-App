// Login.jsx
import AuthForm from "../components/AuthForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200">
      <AuthForm mode="login" />
    </div>
  );
}
