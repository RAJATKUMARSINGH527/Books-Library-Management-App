import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-pink-400 shadow-xl backdrop-blur-md bg-white/30 border-b border-white/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md select-none flex items-center space-x-2"
        >
          <span className="text-4xl">📚</span>
          <span>
            My <span className="text-yellow-400">Library</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-white font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 transition"
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/mybooks"
                className="text-white font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 transition"
              >
                My Books
              </Link>
              <Link
                to="/add-book"
                className="text-white font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 transition"
              >
                Add Book
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white font-semibold px-3 py-1 rounded-full hover:bg-yellow-400 hover:text-purple-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-purple-700 shadow-md hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {user.email}
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-purple-600"
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
                <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={classNames(
                          active ? "bg-purple-100 text-purple-900" : "text-purple-700",
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
