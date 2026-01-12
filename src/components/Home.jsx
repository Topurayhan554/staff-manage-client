// HomePage.jsx
import React from "react";
import { Link } from "react-router";
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  Calendar,
  Bell,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      title: "Employee Management",
      icon: Users,
      description: "Add, update, and manage employees easily.",
    },
    {
      title: "Notice Board",
      icon: FileText,
      description: "Publish and manage notices efficiently.",
    },
    {
      title: "Attendance Tracking",
      icon: Clock,
      description: "Track employee attendance and leave.",
    },
    {
      title: "Reports & Analytics",
      icon: CheckCircle,
      description: "Get insights with performance reports.",
    },
    {
      title: "Event Calendar",
      icon: Calendar,
      description: "Manage company events and schedules.",
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Receive timely alerts and notifications.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-orange-500 to-blue-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Nebs-IT HR Portal
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Manage employees, notices, attendance, and more all in one place.
          </p>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg shadow hover:shadow-lg transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Total Employees
            </div>
            <div className="text-2xl font-bold text-gray-900">248</div>
            <div className="text-green-500 text-sm mt-1">+12%</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Active Notices
            </div>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <div className="text-orange-500 text-sm mt-1">+3</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-full">
            <FileText className="w-6 h-6 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Pending Requests
            </div>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-yellow-500 text-sm mt-1">-5</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-full">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Attendance Rate
            </div>
            <div className="text-2xl font-bold text-gray-900">94.5%</div>
            <div className="text-green-500 text-sm mt-1">+2.3%</div>
          </div>
          <div className="bg-green-50 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="p-3 bg-orange-50 rounded-full inline-block mb-4">
                  <feature.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
