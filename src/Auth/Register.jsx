import React, { use, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, registerUser, updateUserProfile } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((res) => {
        console.log("user->", res.user);

        toast.success("User registered successfully!");
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_api_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        fetch(image_api_URL, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            const userProfile = {
              displayName: data.name,
              photoURL: imgData.data.display_url,
            };

            updateUserProfile(userProfile).then(() => {
              navigate(location.state || "/");
            });
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Registration failed: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mt-14">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-2xl font-bold">
            Create your account
          </p>
        </div>

        {/* Registration Card */}
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Register</h2>

          <div className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name?.type === "required" && (
                <p className="mt-1 text-sm text-red-600">Name is required.</p>
              )}
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo URL <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
              </div>
              {errors.photo?.type === "required" && (
                <p className="mt-1 text-sm text-red-600">Photo is required.</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition`}
                />
              </div>
              {errors.email?.type === "required" && (
                <p className="mt-1 text-sm text-red-600">Email is required.</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-sm">
                  Password must include uppercase, lowercase, number & symbol
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a
                  href="#terms"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <SocialLogin />

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                state={location.state}
                to={"/login"}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2026 Nebs-IT. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
