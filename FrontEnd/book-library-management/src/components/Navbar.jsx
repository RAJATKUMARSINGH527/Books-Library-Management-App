import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // optional if you use SVG icons
import { useTheme } from "../contexts/ThemeContext"; // You need to create/use this context

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-pink-400 dark:from-gray-900 dark:via-black dark:to-gray-800 shadow-xl backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/20 dark:border-gray-700 transition-colors">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Theme Toggle Button - LEFT side */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="mr-6 p-2 rounded-full bg-white/80 dark:bg-black/80 shadow hover:bg-white/90 dark:hover:bg-black/60 transition"
        >
          {/* Use icon component or emoji */}
          {darkMode ? (
            // <SunIcon className="h-5 w-5 text-yellow-400" />
            <span role="img" aria-label="Light mode" className="text-xl">🌙</span>
          ) : (
            // <MoonIcon className="h-5 w-5 text-purple-700" />
            <span role="img" aria-label="Dark mode" className="text-xl">☀️</span>
          )}
        </button>

        {/* Logo/Text Center */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white dark:text-yellow-300 tracking-wide drop-shadow-md select-none flex items-center space-x-2"
        >
          <span className="text-4xl">📚</span>
          <span>
            My <span className="text-yellow-400 dark:text-yellow-300">Library</span>
          </span>
        </Link>

        {/* Right side: Nav Links/user menu */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-white dark:text-yellow-200 font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 dark:hover:bg-purple-700 transition"
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/mybooks"
                className="text-white dark:text-yellow-200 font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 dark:hover:bg-purple-700 transition"
              >
                My Books
              </Link>
              <Link
                to="/add-book"
                className="text-white dark:text-yellow-200 font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 dark:hover:bg-purple-700 transition"
              >
                Add Book
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white dark:text-yellow-200 font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 dark:hover:bg-purple-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white dark:text-yellow-200 font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 dark:hover:bg-purple-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full rounded-full bg-white/80 dark:bg-black/60 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-yellow-100 shadow-md hover:bg-white dark:hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition">
                {user.email}
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-purple-600 dark:text-yellow-300"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={classNames(
                          active
                            ? "bg-purple-100 dark:bg-purple-700 text-purple-900 dark:text-yellow-100"
                            : "text-purple-700 dark:text-yellow-300",
                          "block w-full text-left px-4 py-2 text-sm font-semibold"
                        )}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}
