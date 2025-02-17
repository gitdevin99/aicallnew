import { Activity } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  {
    id: 1,
    description: "Call completed with John Smith",
    time: "10 minutes ago"
  },
  {
    id: 2,
    description: "New lead created: Sarah Johnson",
    time: "30 minutes ago"
  },
  {
    id: 3,
    description: 'Lead status updated to "Interested"',
    time: "1 hour ago"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export const RecentActivity = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="activity-card h-full"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity size={20} className="text-accent-blue relative z-10" />
              <div className="absolute inset-0 bg-accent-blue/20 blur-lg" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white/90">Recent Leads</h2>
          </div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-5 flex-1"
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={item}
              className="activity-item px-2 py-1"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1.5">
                  <div className="activity-dot" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-900 dark:text-white/90 font-medium">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
