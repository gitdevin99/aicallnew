import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6 max-w-2xl">
        {/* Theme Settings */}
        <div className="glassmorphic p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Theme Settings</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Toggle between light and dark mode
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Profile Settings */}
        <div className="glassmorphic p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Profile customization features are coming soon. Stay tuned for updates!
          </p>
        </div>

        {/* Notification Settings */}
        <div className="glassmorphic p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Notification management features are coming soon. Stay tuned for updates!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
