// Footer.jsx
import React from "react";
import { Link } from "react-router";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">✦ Nebs-IT</h2>
          <p className="text-sm text-gray-400">
            Nebs-IT HR Portal helps you manage employees, notices, attendance,
            and more efficiently.
          </p>
          <div className="flex gap-3 mt-4">
            <Link to="#" className="hover:text-orange-500 transition">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:text-orange-500 transition">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:text-orange-500 transition">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:text-orange-500 transition">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="#" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-orange-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-orange-500 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-orange-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="#" className="hover:text-orange-500 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-orange-500 transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-orange-500 transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-orange-500 transition">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-gray-400 text-sm mb-2">
            123 HR Street, Dhaka, Bangladesh
          </p>
          <p className="text-gray-400 text-sm mb-2">Email: info@nebsit.com</p>
          <p className="text-gray-400 text-sm">Phone: +880 1234 567890</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
        &copy; 2026 Nebs-IT. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
