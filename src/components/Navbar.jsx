import React, { useState, useContext } from "react";
import { ChevronDown } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";

const Navbar = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout failed");
      });
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
        <div className="h-full px-4 md:px-6 flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center gap-2 text-xl font-bold">
            <span className="text-gray-900">✦ Nebs-IT</span>
          </div>

          {/* Middle - Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to={"/dashboard"}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to={"/about"}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              About
            </Link>
          </div>

          {/* Right - User/Profile */}
          <div className="relative">
            {user ? (
              <div
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user.displayName || "User"}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold">
                      {user.displayName
                        ? user.displayName.slice(0, 2).toUpperCase()
                        : "U"}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                    userDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* User Dropdown */}
            {userDropdown && user && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-white font-semibold text-lg">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : user.displayName ? (
                        user.displayName.slice(0, 2).toUpperCase()
                      ) : (
                        "U"
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {user.displayName || "User"}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <span className="text-lg">👤</span>
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <span className="text-lg">⚙️</span>
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <span className="text-lg">❓</span>
                    <span>Help & Support</span>
                  </Link>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-left"
                  >
                    <span className="text-lg">🚪</span>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
