import React, { useState } from "react";
import {
  ChevronDown,
  X,
  Menu,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Eye,
  Edit,
  MoreVertical,
  Search,
  Filter,
  Download,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router";

const EmployeeDatabase = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employeeDropdown, setEmployeeDropdown] = useState(false);
  const [careerDropdown, setCareerDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [activePath, setActivePath] = useState("/notice-board");
  const [selectedNotices, setSelectedNotices] = useState([]);

  // Notice Data
  const [notices] = useState([
    {
      id: 1,
      title: "Office closed on Friday for maintenance.",
      type: "General / Company News",
      department: "All Department",
      publishedOn: "15-Jun-2025",
      status: "Published",
    },
    {
      id: 2,
      title: "Eid al-Fitr holiday schedule.",
      type: "Holiday & Event",
      department: "Finance",
      publishedOn: "15-Jun-2025",
      status: "Published",
    },
    {
      id: 3,
      title: "Updated code of conduct policy.",
      type: "HR & Policy Update",
      department: "Sales Team",
      publishedOn: "15-Jun-2025",
      status: "Published",
      hasAlert: true,
    },
    {
      id: 4,
      title: "Payroll for October will be processed on 28th.",
      type: "Finance & Payroll",
      department: "Web Team",
      publishedOn: "15-Jun-2025",
      status: "Published",
      subStatus: "Published",
    },
    {
      id: 5,
      title: "System update scheduled for 30 Oct 10:30-11:00 PM.",
      type: "IT / System Maintenance",
      department: "Database Team",
      publishedOn: "15-Jun-2025",
      status: "Published",
      hasToggle: true,
    },
    {
      id: 6,
      title: "Design team sprint review moved to Tuesday.",
      type: "Department / Team",
      department: "Admin",
      publishedOn: "15-Jun-2025",
      status: "Published",
    },
    {
      id: 7,
      title: "Unauthorized absence recorded on 18 Oct 2025",
      type: "Warning / Disciplinary",
      department: "Individual",
      publishedOn: "15-Jun-2025",
      status: "Unpublished",
    },
    {
      id: 8,
      title: "Office closed today due to severe weather",
      type: "Emergency / Urgent",
      department: "HR",
      publishedOn: "15-Jun-2025",
      status: "Draft",
      subStatus: "Unpublished",
      hasToggle: true,
    },
  ]);

  const handleMenuClick = (path) => {
    setActivePath(path);
    setSidebarOpen(false);
    console.log("Navigating to:", path);
  };

  const isActive = (path) => activePath === path;

  const isParentActive = (subItems) => {
    return subItems?.some((item) => activePath === item.path);
  };

  const toggleSelectAll = () => {
    if (selectedNotices.length === notices.length) {
      setSelectedNotices([]);
    } else {
      setSelectedNotices(notices.map((n) => n.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedNotices.includes(id)) {
      setSelectedNotices(selectedNotices.filter((nid) => nid !== id));
    } else {
      setSelectedNotices([...selectedNotices, id]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "text-emerald-600 bg-emerald-50";
      case "Unpublished":
        return "text-gray-600 bg-gray-100";
      case "Draft":
        return "text-amber-600 bg-amber-50";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}

      <div className="p-4 md:p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Notice Management
          </h1>
          <div className="text-sm">
            <span className="text-blue-600 font-medium">Active Notices: 8</span>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-amber-600">Draft Notices: 04</span>
          </div>
        </div>

        {/* Action Bar */}
        <div>
          <div className="p-4 flex justify-end">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={"/dashboard/notice-board"}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
              >
                + Create Notice
              </Link>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                📝 All Draft Notice
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="my-5 flex justify-end">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
              <span className="text-sm text-gray-600">Filter by:</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3 w-full lg:w-auto">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Departments or Individuals</option>
                  <option>All Departments</option>
                  <option>HR</option>
                  <option>Finance</option>
                </select>

                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Employee Id or Name</option>
                </select>

                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Status</option>
                  <option>Published</option>
                  <option>Unpublished</option>
                  <option>Draft</option>
                </select>

                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center justify-center gap-2">
                  Published on
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectedNotices.length === notices.length}
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Notice Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Departments/Individual
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Published On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {notices.map((notice) => (
                    <tr key={notice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedNotices.includes(notice.id)}
                          onChange={() => toggleSelect(notice.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {notice.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {notice.type}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {notice.hasAlert && (
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          )}
                          <span className="text-sm text-blue-600">
                            {notice.department}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {notice.publishedOn}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium inline-block w-fit ${getStatusColor(
                              notice.status
                            )}`}
                          >
                            {notice.status}
                          </span>
                          {notice.subStatus && (
                            <span className="text-xs text-gray-500">
                              {notice.subStatus}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                          {notice.hasToggle && (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked={notice.id === 5}
                              />
                              <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="p-4 flex flex-col sm:flex-row justify-center items-center gap-3 border-t border-gray-200">
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                ←
              </button>
              <button className="px-3 py-1 bg-orange-500 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                4
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                5
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDatabase;
