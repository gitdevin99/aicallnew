import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Left Column - Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-16 flex flex-col justify-between relative"
      >
        {/* Theme Toggle at top right */}
        <div className="theme-toggle-wrapper absolute top-6 right-6 z-10 bg-gray-50 dark:bg-gray-900 p-1 rounded-full shadow-md">
          <ThemeToggle />
        </div>
        
        <div className="max-w-lg mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="space-y-8">
            {/* Logo */}
            <Link to="/app" className="block">
              <img 
                src="/images/logo-dark.svg" 
                alt="CallBeast Logo" 
                className="h-12 w-auto dark:hidden"
              />
              <img 
                src="/images/logo-light.svg" 
                alt="CallBeast Logo" 
                className="h-12 w-auto hidden dark:block"
              />
            </Link>

            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome back
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Remember me</span>
                </label>
                <Link 
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Sign in
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <img src="/images/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Don't have an account?{" "}
          <Link 
            to="/signup"
            className="font-medium text-blue-500 hover:text-blue-600"
          >
            Sign up
          </Link>
        </p>
      </motion.div>

      {/* Right Column - Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:block lg:w-1/2 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
        </div>
        <div className="relative h-full p-8 sm:p-12 xl:p-16 flex flex-col justify-between text-white">
          <div className="text-lg font-medium">CallBeast</div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Transform your business with AI-powered calling
            </h2>
            <p className="text-lg text-white/80">
              Automate your outreach, engage customers, and drive growth with our advanced AI calling platform.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
