import React, { use, useState } from "react";
import {
  ChevronDown,
  X,
  Menu,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  Bell,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employeeDropdown, setEmployeeDropdown] = useState(false);
  const [careerDropdown, setCareerDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const { user, logOut } = use(AuthContext);
  console.log(user);

  // Stats Data
  const stats = [
    {
      title: "Total Employees",
      value: "248",
      change: "+12%",
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active Notices",
      value: "18",
      change: "+3",
      icon: FileText,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "Pending Requests",
      value: "24",
      change: "-5",
      icon: Clock,
      color: "bg-yellow-500",
      lightColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Attendance Rate",
      value: "94.5%",
      change: "+2.3%",
      icon: CheckCircle,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      action: "New employee added",
      user: "John Doe",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      action: "Notice published",
      user: "HR Department",
      time: "4 hours ago",
      type: "info",
    },
    {
      id: 3,
      action: "Leave request approved",
      user: "Sarah Wilson",
      time: "5 hours ago",
      type: "success",
    },
    {
      id: 4,
      action: "Salary processed",
      user: "Finance Team",
      time: "1 day ago",
      type: "success",
    },
    {
      id: 5,
      action: "Document uploaded",
      user: "Mike Johnson",
      time: "2 days ago",
      type: "info",
    },
  ];

  // Menu Items
  const menuItems = [
    { id: "homepage", icon: "🏠", label: "Homepage", path: "/" },
    {
      id: "employee",
      icon: "👥",
      label: "Employee",
      type: "dropdown",
      subItems: [
        { label: "Employee Database", path: "/dashboard/employee/database" },
        { label: "Add New Employee", path: "/dashboard/employee/add" },
        {
          label: "Performance Report",
          path: "/dashboard/employee/performance",
        },
        { label: "Discipline Record", path: "/dashboard/employee/discipline" },
      ],
    },
    { id: "payroll", icon: "💰", label: "Payroll", path: "/dashboard/payroll" },
    {
      id: "payslip",
      icon: "💵",
      label: "Pay Slip",
      path: "/dashboard/payslip",
    },
    {
      id: "attendance",
      icon: "📅",
      label: "Attendance",
      path: "/dashboard/attendance",
    },
    {
      id: "request",
      icon: "🎫",
      label: "Request Center",
      path: "/dashboard/request-center",
    },
    {
      id: "career",
      icon: "💼",
      label: "Career Database",
      type: "dropdown",
      subItems: [
        { label: "Job Postings", path: "/dashboard/career/postings" },
        { label: "Applications", path: "/dashboard/career/applications" },
        { label: "Interview Schedule", path: "/dashboard/career/interviews" },
      ],
    },
    {
      id: "document",
      icon: "📄",
      label: "Document Manage",
      path: "/dashboard/documents",
    },
    {
      id: "notice",
      icon: "📢",
      label: "Notice Board",
      path: "/dashboard/notice-board",
    },
    {
      id: "activity",
      icon: "📊",
      label: "Activity Log",
      path: "/dashboard/activity-log",
    },
    {
      id: "exit",
      icon: "✏️",
      label: "Exit Interview",
      path: "/dashboard/exit-interview",
    },
    { id: "profile", icon: "👤", label: "Profile", path: "/dashboard/profile" },
  ];

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

  const handleMenuClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const isActive = (path) => activePath === path;

  const isParentActive = (subItems) => {
    return subItems?.some((item) => activePath === item.path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="fixed top-0 left-0 lg:left-64 right-0 bg-white border-b border-gray-200 z-40 h-16">
        <div className="h-full px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
            <div className="flex items-center gap-2 text-xl font-bold lg:hidden">
              <span className="text-gray-900">✦ Nebs-IT</span>
            </div>
          </div>

          <div className="relative">
            <div
              onClick={() => setUserDropdown(!userDropdown)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-gray-900">
                  {user.displayName}
                </div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
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
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  userDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            {userDropdown && (
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
                        {user.displayName}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 w-full text-left">
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 w-full text-left">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 w-full text-left">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-blue-50">
          <div className="flex items-center gap-2 text-xl font-bold">
            <span className="text-gray-900">✦ Nebs-IT</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">HR Management System</p>
        </div>

        <nav className="p-4 space-y-1 pb-24">
          {menuItems.map((item) => {
            if (item.type === "dropdown") {
              const isOpen =
                item.id === "employee" ? employeeDropdown : careerDropdown;
              const setOpen =
                item.id === "employee"
                  ? setEmployeeDropdown
                  : setCareerDropdown;

              return (
                <div key={item.id} className="space-y-1">
                  <div
                    onClick={() => setOpen(!isOpen)}
                    className={`px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isParentActive(item.subItems)
                        ? "bg-orange-50 text-orange-600 font-medium"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {isOpen && (
                    <div className="ml-4 space-y-1">
                      {item.subItems.map((subItem, index) => (
                        <Link
                          key={index}
                          to={subItem.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`px-3 py-2 rounded cursor-pointer transition-all duration-200 flex items-center gap-2 text-sm ${
                            isActive(subItem.path)
                              ? "bg-orange-100 text-orange-700 font-medium border-l-2 border-orange-600 pl-4"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-4"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive(subItem.path)
                                ? "bg-orange-600"
                                : "bg-gray-400"
                            }`}
                          ></span>
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                  isActive(item.path)
                    ? "bg-orange-50 text-orange-600 font-medium shadow-sm"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="lg:ml-64 pt-16">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
