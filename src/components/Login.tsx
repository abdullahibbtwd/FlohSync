/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAppContext } from "@/context/useAppContext";
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (cookies.authToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
};
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { router } = useAppContext();
  type Errors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    username?: string;
  };
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the current field as the user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (isLogin) {
      if (!formData.username) newErrors.username = "Username is required";
      if (!formData.password) newErrors.password = "Password is required";
    } else {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.username) newErrors.username = "Username is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;
  setIsLoading(true);

  try {
    if (!isLogin) {
      // Registration
      const { data } = await axios.post(
        backendUrl + "/api/auth/register",
        {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "An error occurred");
      }
    } else {
      // Login
      const response = await axios.post(
        backendUrl + "/api/auth/login",
        {
          username: formData.username,
          password: formData.password,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success(response.data.message || "Success!");
        router.replace('/')
      } else {
        toast.error(response.data.message || "An error occurred");
      }
    }
  } catch (error: any) {
    if (error.response) {
      // Handles 409 and other non-2xx errors
      toast.error(error.response.data.message || "An error occurred");
    } else {
      toast.error("Network error");
    }
  } finally {
    setIsLoading(false);
  }
};

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      username: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4">
            <span className="text-2xl font-bold text-white">FS</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent">
            FlohSync
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isLogin ? "Welcome back!" : "Join our community"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-900/10 transform -skew-y-6 translate-y-8"></div>

          <div className="relative z-10">
            {/* Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-8">
              <button
                onClick={() => !isLogin && toggleMode()}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  isLogin
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => isLogin && toggleMode()}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  !isLogin
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field (Register only) */}
              <div
                className={`transition-all duration-500 ${
                  isLogin
                    ? "h-0 opacity-0 overflow-hidden"
                    : "h-auto opacity-100"
                }`}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Username Field (Register only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.username
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Enter your Username"
                  />
                  {errors.username && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.username}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div
                className={`transition-all duration-500 ${
                  isLogin
                    ? "h-0 opacity-0 overflow-hidden"
                    : "h-auto opacity-100"
                }`}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.password && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              {/* Confirm Password Field (Register only) */}
              <div
                className={`transition-all duration-500 ${
                  isLogin
                    ? "h-0 opacity-0 overflow-hidden"
                    : "h-auto opacity-100"
                }`}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-green-900 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              {isLogin ? (
                <p className="text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={toggleMode}
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
                  >
                    Sign up here
                  </button>
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <button
                    onClick={toggleMode}
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="mt-4 text-center">
                <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Forgot your password?
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
