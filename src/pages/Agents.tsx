import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Users, Zap, Phone, BarChart } from "lucide-react";
import { AgentListItem } from "@/components/AgentListItem";

const statsData = [
  {
    label: "Total Agents",
    value: "3",
    icon: <Users className="h-4 w-4 text-blue-600 dark:text-blue-500" />
  },
  {
    label: "Active Now",
    value: "2",
    icon: <Zap className="h-4 w-4 text-blue-600 dark:text-blue-500" />
  },
  {
    label: "Total Calls",
    value: "590",
    icon: <Phone className="h-4 w-4 text-blue-600 dark:text-blue-500" />
  },
  {
    label: "Avg. Success Rate",
    value: "91%",
    icon: <BarChart className="h-4 w-4 text-blue-600 dark:text-blue-500" />
  },
];

const agentsData = [
  {
    name: "Sales Assistant",
    status: "active",
    lastActive: "2 mins ago",
    totalCalls: 245,
    avgDuration: "3:45",
    successRate: 92,
  },
  {
    name: "Support Agent",
    status: "active",
    lastActive: "5 mins ago",
    totalCalls: 189,
    avgDuration: "4:12",
    successRate: 88,
  },
  {
    name: "Appointment Scheduler",
    status: "inactive",
    lastActive: "1 hour ago",
    totalCalls: 156,
    avgDuration: "2:30",
    successRate: 95,
  },
];

const Agents = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">AI Agents</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and monitor your AI agents</p>
        </div>
        <Button
          className="gap-2"
          variant="default"
          onClick={() => navigate('/agents/create')}
        >
          <Plus className="h-4 w-4" />
          Create New Agent
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <div key={stat.label} className="p-6 rounded-lg bg-gray-100 dark:bg-gray-900/50 space-y-2">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              {stat.icon}
              <span>{stat.label}</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Active Agents</h2>
        <div className="space-y-3">
          {agentsData.map((agent) => (
            <AgentListItem
              key={agent.name}
              name={agent.name}
              status={agent.status as "active" | "inactive"}
              lastActive={agent.lastActive}
              totalCalls={agent.totalCalls}
              avgDuration={agent.avgDuration}
              successRate={agent.successRate}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Agents;
