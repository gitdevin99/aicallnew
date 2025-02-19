import { Phone, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Call {
  id: string;
  status: "completed" | "in-progress" | "failed";
  phoneNumber: string;
  duration: string;
  assistant: string;
  date: string;
}

const demoData: Call[] = [
  {
    id: "1",
    status: "completed",
    phoneNumber: "+1 (555) 123-4567",
    duration: "5:23",
    assistant: "Sales Bot 1",
    date: "2025-02-09 14:30"
  },
  {
    id: "2",
    status: "in-progress",
    phoneNumber: "+1 (555) 987-6543",
    duration: "2:45",
    assistant: "Support Bot 2",
    date: "2025-02-09 15:15"
  },
  {
    id: "3",
    status: "failed",
    phoneNumber: "+1 (555) 246-8135",
    duration: "0:45",
    assistant: "Sales Bot 1",
    date: "2025-02-09 16:00"
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

export const RecentCalls = () => {
  const navigate = useNavigate();

  const getStatusIcon = (status: Call["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusClass = (status: Call["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-700 dark:text-green-400";
      case "in-progress":
        return "text-yellow-700 dark:text-yellow-400";
      case "failed":
        return "text-red-700 dark:text-red-400";
      default:
        return "text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Phone size={20} className="text-blue-600 dark:text-blue-500 relative z-10" />
              <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/30 blur-lg" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white/90">Latest Calls</h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/app/calls")}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            View All Calls
          </Button>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {demoData.map((call) => (
            <motion.div
              key={call.id}
              variants={item}
              className="group relative rounded-lg border border-gray-200 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 p-4 transition-all duration-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(call.status)}
                    <span className={cn("text-sm font-medium", getStatusClass(call.status))}>
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{call.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {call.phoneNumber}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {call.assistant}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(call.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
