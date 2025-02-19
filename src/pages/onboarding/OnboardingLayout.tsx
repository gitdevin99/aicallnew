import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/images/logo-light.svg" 
              alt="CallBeast Logo" 
              className="h-12"
            />
          </div>
          
          {/* Content */}
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
