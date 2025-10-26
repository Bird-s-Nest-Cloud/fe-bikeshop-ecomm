'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { axiosInstance } from '@/utils/axiosInstance';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);

      const response = await axiosInstance.post('/auth/login/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status) {
        // Store token in cookies
        Cookies.set('user_token', response.data.data.token, { expires: 365 });
        
        // Show success message
        toast.success(response.data.message || 'Login successful!');
        
        // Redirect to home or dashboard
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      
      if (error.response?.data) {
        const { status, status_code, message, data } = error.response.data;
        
        if (!status) {
          // Handle field-specific errors (400)
          if (status_code === 400 && data?.errors) {
            setErrors(data.errors);
            toast.error(message || 'Please fix the errors below');
          }
          // Handle general errors (401, etc.)
          else if (data?.errors?.detail) {
            toast.error(data.errors.detail[0] || message);
          } else {
            toast.error(message || 'Login failed');
          }
        }
      } else {
        toast.error('Network error. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
