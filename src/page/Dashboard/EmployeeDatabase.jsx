import React, { useState, useContext } from "react";
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
  Filter,
  PencilLine,
} from "lucide-react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const EmployeeDatabase = () => {
  const [selectedNotices, setSelectedNotices] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch notices
  const { data: notices = [] } = useQuery({
    queryKey: ["myNotices"],
    queryFn: async () => {
      const res = await axiosSecure.get("/notices");
      return res.data;
    },
  });

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: async (noticeId) => {
      const res = await axiosSecure.patch(`/notices/${noticeId}/toggle-status`);
      return res.data;
    },
  });

  const handleToggleStatus = (noticeId) => {
    toggleStatusMutation.mutate(noticeId);
  };

  const handleEditClick = (noticeId) => {
    if (openDropdownId === noticeId) {
      setOpenDropdownId(null); // close if already open
    } else {
      setOpenDropdownId(noticeId); // open dropdown
    }
  };

  const toggleSelectAll = () => {
    if (selectedNotices.length === notices.length) {
      setSelectedNotices([]);
    } else {
      setSelectedNotices(notices.map((n) => n._id));
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Notice Management
            </h1>
            <p className="mt-1 text-sm text-[#00A46E]">
              Active Notices: {notices.length} |{" "}
              <span className="text-[#FFA307]">Draft Notices: 4</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={"/dashboard/notice-board"}
              className="inline-flex items-center px-4 py-2 bg-[#F95524] text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
            >
              + Create Notice
            </Link>
            <button className="inline-flex gap-2 items-center text-[#F59E0B] px-4 py-2 bg-white border border-[#F59E0B] rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
              <PencilLine /> All Draft Notice
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 mb-6">
          {/* Filter Section - All in one line */}
          <div className="flex items-end gap-3">
            {/* Filter by label */}
            <div className="flex items-center gap-2 pb-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700 whitespace-nowrap">
                Filter by:
              </span>
            </div>

            {/* Departments or Individuals */}
            <div className="flex-1 min-w-[200px]">
              <select className="w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Departments or Individuals</option>
                <option value="All Departments">All Departments</option>
                <option value="HR Department">HR Department</option>
                <option value="Finance Department">Finance Department</option>
                <option value="IT Department">IT Department</option>
                <option value="Sales Department">Sales Department</option>
              </select>
            </div>

            {/* Employee Id or Name */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Employee Id or Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status */}
            <div className="flex-1 min-w-[150px]">
              <select className="w-full px-3 py-2 text-gray-500 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Status</option>
                <option>Published</option>
                <option>Unpublished</option>
                <option>Draft</option>
              </select>
            </div>

            {/* Published on */}
            <div className="flex-1 min-w-[180px]">
              <input
                type="date"
                placeholder="Published on"
                className="w-full px-3 py-2 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Reset Filter Button */}
            <div className="min-w-[140px]">
              <label className="block text-sm font-medium text-gray-700 mb-1 invisible">
                Action
              </label>
              <button
                onClick={() => {}}
                className="w-full px-3 py-2 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedNotices.length === notices.length}
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notice Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Departments/Individual
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Published On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notices.map((notice) => (
                    <tr key={notice._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedNotices.includes(notice._id)}
                          onChange={() => toggleSelect(notice._id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {notice.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {notice.noticeType}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {notice.hasAlert && (
                            <span className="text-red-500">🔔</span>
                          )}
                          <span className="text-sm text-gray-500">
                            {notice.department}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {notice.publishDate}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            notice.status
                          )}`}
                        >
                          {notice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 relative">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Eye className="w-5 h-5" />
                          </button>

                          {/* Edit button with dropdown */}
                          <button
                            className="text-gray-400 hover:text-gray-600 relative"
                            onClick={() => handleEditClick(notice._id)}
                          >
                            <Edit className="w-5 h-5" />

                            {openDropdownId === notice._id && (
                              <div className="absolute bottom-full mb-1 right-0 z-10 w-36 bg-white border rounded shadow p-2 flex gap-3 items-center justify-between">
                                {/* Status text */}
                                <span className="text-sm font-medium text-gray-700">
                                  {notice.status}
                                </span>

                                {/* Toggle button */}
                                <button
                                  onClick={() => handleToggleStatus(notice._id)}
                                  disabled={toggleStatusMutation.isPending}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    notice.status === "Published"
                                      ? "bg-blue-600"
                                      : "bg-gray-700"
                                  } ${
                                    toggleStatusMutation.isPending
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      notice.status === "Published"
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                    }`}
                                  />
                                </button>
                              </div>
                            )}
                          </button>

                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            ←
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            2
          </button>
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            3
          </button>
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            4
          </button>
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            5
          </button>
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDatabase;
