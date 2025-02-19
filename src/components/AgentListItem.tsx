import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgentListItemProps {
  name: string;
  status: "active" | "inactive";
  lastActive: string;
  totalCalls: number;
  avgDuration: string;
  successRate: number;
}

export const AgentListItem = ({
  name,
  status,
  lastActive,
  totalCalls,
  avgDuration,
  successRate,
}: AgentListItemProps) => {
  return (
    <div className="group relative flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-900/50 shadow-sm transition-all duration-300 hover:shadow-lg dark:shadow-gray-900/10 hover:dark:shadow-gray-900/20 backdrop-blur-[2px] hover:backdrop-blur-[4px] hover:-translate-y-0.5">
      {/* Neuromorphic background that only shows on hover */}
      <div className="absolute inset-0 rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/70 to-white/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-lg shadow-[inset_0px_0px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0px_0px_20px_rgba(255,255,255,0.02)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-500/30 dark:to-blue-400/20 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105 flex items-center justify-center">
          <div className="transition-transform duration-300 group-hover:scale-110">
          <span className="text-blue-600 dark:text-blue-500">
            {name.split(" ").map(word => word[0]).join("")}
          </span>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white transition-all duration-300 group-hover:translate-x-0.5">{name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className={`inline-block h-2 w-2 rounded-full ${
              status === "active" ? "bg-green-500" : "bg-gray-400 dark:bg-gray-500"
            }`} />
            <span className="text-gray-500 dark:text-gray-400 capitalize">{status}</span>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <span className="text-gray-500 dark:text-gray-400">{lastActive}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12 px-4">
        <div>
          <div className="text-sm text-gray-500 transition-all duration-300 group-hover:translate-y-0.5">Total Calls</div>
          <div className="text-lg font-medium text-gray-900 dark:text-white transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400">{totalCalls}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 transition-all duration-300 group-hover:translate-y-0.5">Avg Duration</div>
          <div className="text-lg font-medium text-gray-900 dark:text-white transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400">{avgDuration}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 transition-all duration-300 group-hover:translate-y-0.5">Success Rate</div>
          <div className="text-lg font-medium text-gray-900 dark:text-white transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400">{successRate}%</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
          View Details
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
