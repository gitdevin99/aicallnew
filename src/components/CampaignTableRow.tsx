import { Play, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CampaignTableRowProps {
  id: string;
  name: string;
  status: "running" | "paused" | "completed";
  progress: number;
  performance: number;
  totalLeads: number;
  callsMade: number;
  updated: string;
  created: string;
}

export const CampaignTableRow = ({
  name,
  status,
  progress,
  performance,
  totalLeads,
  callsMade,
  updated,
  created,
}: CampaignTableRowProps) => {
  const navigate = useNavigate();
  const navigate = useNavigate();
  return (
    <tr 
      onClick={() => navigate(`/campaigns/${id}`)} 
      className="group relative border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/80">
      {/* Highlight effect on hover */}
      <td className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      {/* Neuromorphic background that only shows on hover */}
      <td className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/70 to-white/70 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-[1px] shadow-[inset_0px_0px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0px_0px_20px_rgba(255,255,255,0.02)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[300px]">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-900 dark:text-white font-semibold">{name}</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[150px]">
        <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full shadow-sm transition-all duration-300 group-hover:shadow-lg ${
            status === "running" ? "bg-green-100 dark:bg-green-500/20" :
            status === "paused" ? "bg-gray-100 dark:bg-gray-500/20" :
            "bg-blue-100 dark:bg-blue-500/20"
          }`}>
            {status === "running" ? (
              <Play className="h-3 w-3 text-green-600 dark:text-green-500" />
            ) : status === "paused" ? (
              <Pause className="h-3 w-3 text-gray-600 dark:text-gray-500" />
            ) : (
              <span className="h-3 w-3 text-blue-600 dark:text-blue-500">✓</span>
            )}
          </span>
          <span className="capitalize text-gray-700 dark:text-gray-200 font-medium">
            {status}
          </span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[200px]">
        <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <div className="flex-1 h-2 bg-gray-100/70 dark:bg-gray-800/70 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full shadow-sm transition-all duration-300 group-hover:shadow-blue-500/20"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">{progress}%</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[150px]">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-900 dark:text-white font-semibold">{performance}%</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[150px]">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-900 dark:text-white font-medium">{totalLeads}</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[150px]">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-900 dark:text-white font-medium">{callsMade}</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[150px]">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-900 dark:text-white font-medium">{updated}</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[150px]">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-900 dark:text-white font-medium">{created}</span>
        </div>
      </td>
    </tr>
  );
};
