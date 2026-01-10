import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [userDropdown, setUserDropdown] = useState(false);

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
            <a
              href="#home"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#dashboard"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              About
            </a>
          </div>

          {/* Right - User Profile */}
          <div className="relative">
            <div
              onClick={() => setUserDropdown(!userDropdown)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900 text-right">
                  Asif Roja
                </div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                AR
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  userDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* User Dropdown */}
            {userDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      AR
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Asif Roja
                      </div>
                      <div className="text-sm text-gray-500">
                        asif@nebs-it.com
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <a
                    href="#profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <span className="text-lg">👤</span>
                    <span>My Profile</span>
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <span className="text-lg">⚙️</span>
                    <span>Settings</span>
                  </a>
                  <a
                    href="#help"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <span className="text-lg">❓</span>
                    <span>Help & Support</span>
                  </a>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-left">
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
