import { motion } from "framer-motion";

const Automation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6 bg-white/10 dark:bg-gray-900/20 rounded-lg border border-gray-200/20 dark:border-gray-700/30 backdrop-blur-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Automation</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Automation</span>
            <span className="mx-2">/</span>
            <span>Overview</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg bg-white/80 dark:bg-gray-900/80 space-y-4 border border-gray-200/20 dark:border-gray-700/30 shadow-sm backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-blue-500/10 dark:bg-blue-400/10">
              <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Coming Soon</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                The automation features are currently under development. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Automation;
