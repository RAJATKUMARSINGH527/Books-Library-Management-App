import AuthForm from "../components/AuthForm";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 transition-colors">
      <AuthForm mode="register" />
    </div>
  );
}
