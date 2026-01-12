import React, { useState } from "react";
import { ChevronDown, Upload, X, Calendar, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const NoticeBoard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const handleCreateNotice = (data) => {
    // console.log(
    //   data.title,
    //   data.department,
    //   data.employeeId,
    //   data.employeeName,
    //   data.position,
    //   data.noticeType,
    //   data.publishDate,
    //   data.noticeBody,
    //   data.file
    // );

    console.log(data);
    axiosSecure.post("/notices", data).then((res) => {
      console.log("after saving", res.data);
    });
    setShowSuccessModal(true);
    reset();
  };
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    targetDepartment: "",
    noticeTitle: "",
    employeeId: "",
    employeeName: "",
    position: "",
    noticeType: "",
    publishDate: "",
    noticeBody: "",
    attachments: [],
  });

  const handlePublish = () => {
    // console.log("Publishing notice:", formData);
    setShowSuccessModal(true);
  };

  const handleSaveDraft = () => {
    console.log("Saving as draft:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Create a Notice
          </h1>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(handleCreateNotice)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <p className="text-sm text-gray-600 mb-6">
            Please fill in the details below
          </p>

          {/* Target Department */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="text-red-500">*</span> Target Departments or
              Individual
            </label>
            <div className="relative">
              <select
                required
                {...register("department")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white text-sm"
              >
                <option value="">Individual</option>
                <option value="All Departments">All Departments</option>
                <option value="HR Department">HR Department</option>
                <option value="Finance Department">Finance Department</option>
                <option value="IT Department">IT Department</option>
                <option value="Sales Department">Sales Department</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Notice Title */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="text-red-500">*</span> Notice Title
            </label>
            <input
              type="text"
              required
              {...register("title")}
              placeholder="Write the Title of Notice"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Employee Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span>
                Select Employee Id
              </label>
              <div className="relative">
                <select
                  required
                  {...register("employeeId")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white text-sm"
                >
                  <option value="">Select employee designation</option>
                  <option value="E001">E001 - John Doe</option>
                  <option value="E002">E002 - Jane Smith</option>
                  <option value="E003">E003 - Mike Johnson</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Employee Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Employee Name
              </label>
              <input
                required
                {...register("employeeName")}
                placeholder="Enter employee full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Position
              </label>
              <div className="relative">
                <select
                  required
                  {...register("position")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white text-sm"
                >
                  <option value="">Select employee department</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="hr">HR Specialist</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Notice Type and Publish Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Notice Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Notice Type
              </label>
              <div className="relative">
                <select
                  required
                  {...register("noticeType")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white text-sm"
                >
                  <option value="">Select Notice Type</option>
                  <option value="General / Company News">
                    General / Company News
                  </option>
                  <option value="Holiday & Event">Holiday & Event</option>
                  <option value="HR & Policy Update">HR & Policy Update</option>
                  <option value="Finance & Payroll">Finance & Payroll</option>
                  <option value="IT / System Maintenance">
                    IT / System Maintenance
                  </option>
                  <option value="Emergency / Urgent">Emergency / Urgent</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Publish Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  {...register("publishDate")}
                  placeholder="Select Publishing Date"
                  className="w-full px-3 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Notice Body */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice Body
            </label>
            <textarea
              required
              {...register("noticeBody")}
              placeholder="Write the details about notice"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
            />
          </div>

          {/* Upload Attachments */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Attachments (optional)
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                required
                multiple
                id="file-upload"
                {...register("file")}
                className="hidden"
                accept=".pdf,.jpg,.png"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="text-blue-600 font-medium">Upload</span>{" "}
                    non-tech pdf/img, drag and drop.
                  </p>
                  <p className="text-xs text-gray-500">
                    Accepted File Type: jpg, png.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <button
              onClick={() => window.history.back()}
              className="px-8 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-8 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
            >
              Publish Notice
            </button>
          </div>
        </form>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-xl p-6 text-center shadow-lg">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-3xl">✅</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Notice Published Successfully
              </h2>

              {/* Subtitle */}
              <p className="text-sm text-gray-600 mb-6">
                Your notice{" "}
                <span className="font-medium">
                  “Holiday Schedule – November 2025”
                </span>{" "}
                has been published and is now visible to all selected
                departments.
              </p>

              {/* Buttons */}
              <div className="flex md:flex-row flex-col gap-3">
                <Link
                  to={"/dashboard/employee/database"}
                  className="w-full border border-gray-200 px-4 py-2 text-[#3B82F6] rounded-full hover:bg-gray-100"
                >
                  View Notice
                </Link>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-4 py-2 border text-[#F95524] border-gray-300 rounded-full hover:bg-gray-50"
                >
                  + Create Another
                </button>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-3 py-2 text-gray-500 border border-y-gray-400 rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
