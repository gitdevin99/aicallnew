import { PhoneOutgoing, PhoneIncoming, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CallTableRowProps {
  phoneNumber: string;
  status: "completed" | "triggered" | "failed";
  type: "inbound" | "outbound";
  duration: string;
  agent: string;
  campaign: string;
  date: string;
  time: string;
  credits: number;
}

export const CallTableRow = ({
  phoneNumber,
  status,
  type,
  duration,
  agent,
  campaign,
  date,
  time,
  credits,
}: CallTableRowProps) => {
  const navigate = useNavigate();

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the dropdown menu
    if (!(e.target as HTMLElement).closest('.dropdown-trigger')) {
      navigate(`/app/calls/${phoneNumber.replace(/[^0-9]/g, '')}`);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400";
      case "triggered":
        return "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <tr 
      onClick={handleRowClick}
      className="group relative border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
    >
      {/* Neuromorphic background that only shows on hover */}
      <td className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/30 to-white/30 dark:from-gray-800/30 dark:to-gray-900/30 shadow-[inset_0px_0px_10px_rgba(0,0,0,0.01)] dark:shadow-[inset_0px_0px_10px_rgba(255,255,255,0.01)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/2 to-purple-500/2 dark:from-blue-500/5 dark:to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[250px]">
        <span className="text-gray-900 dark:text-white font-medium relative z-30">{phoneNumber}</span>
      </td>
      <td className="relative py-4 px-6 z-20 w-[150px]">
        <span className={`relative z-30 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusStyles(status)}`}>
          {status}
        </span>
      </td>
      <td className="relative py-4 px-6 z-20 w-[150px]">
        <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1 relative z-30">
          {type === "outbound" ? (
            <PhoneOutgoing className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          ) : (
            <PhoneIncoming className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          )}
          <span className="text-gray-800 dark:text-gray-200 capitalize font-medium">{type}</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[120px]">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1 relative z-30">
          <span className="text-gray-900 dark:text-white font-medium">{duration}</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[200px]">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1 relative z-30">
          <span className="text-gray-900 dark:text-white font-semibold">{agent}</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[250px]">
        <span className="text-gray-900 dark:text-white font-medium relative z-30">{campaign}</span>
      </td>
      <td className="relative py-4 px-6 z-20 w-[180px]">
        <div className="flex flex-col relative z-30">
          <span className="text-gray-900 dark:text-gray-100">{date}</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">{time}</span>
        </div>
      </td>
      <td className="relative py-4 px-6 z-20 w-[120px]">
        <div className="flex justify-start relative z-30">
          <span className="text-gray-900 dark:text-white font-medium text-base">{credits}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="flex justify-end transition-transform duration-300 group-hover:scale-105">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 dropdown-trigger">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/app/calls/${phoneNumber.replace(/[^0-9]/g, '')}`)}>View Details</DropdownMenuItem>
              <DropdownMenuItem>Download Recording</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};
