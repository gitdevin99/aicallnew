import { motion } from "framer-motion";

const ManageNumbers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Numbers</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Content will go here */}
        <div className="glassmorphic p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Phone number management features are currently under development. Stay tuned for updates!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageNumbers;
