import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        {/* Theme Toggle */}
        <div className="theme-toggle-wrapper absolute top-6 right-6 z-10 bg-gray-50 dark:bg-gray-900 p-1 rounded-full shadow-md">
          <ThemeToggle />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/images/logo-dark.svg" 
              alt="CallBeast Logo" 
              className="h-12 dark:hidden"
            />
            <img 
              src="/images/logo-light.svg" 
              alt="CallBeast Logo" 
              className="h-12 hidden dark:block"
            />
          </div>
          
          {/* Content */}
          <div className="text-gray-900 dark:text-white">
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
