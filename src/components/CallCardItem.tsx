import React from "react";
import { useNavigate } from "react-router-dom";
import { PhoneOutgoing, PhoneIncoming, Clock, Calendar, MoreVertical, User, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CallCardItemProps {
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

export const CallCardItem = ({
  phoneNumber,
  status,
  type,
  duration,
  agent,
  campaign,
  date,
  time,
  credits,
}: CallCardItemProps) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
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
    <div 
      onClick={handleCardClick}
      className="group relative p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200/20 dark:border-gray-700/30 shadow-sm transition-all duration-300 cursor-pointer hover:shadow-md"
    >
      <div className="absolute inset-0 rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 to-white/40 dark:from-gray-800/40 dark:to-gray-900/40 rounded-lg shadow-[inset_0px_0px_10px_rgba(0,0,0,0.01)] dark:shadow-[inset_0px_0px_10px_rgba(255,255,255,0.01)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/2 to-purple-500/2 dark:from-blue-500/5 dark:to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-gray-900 dark:text-white font-medium mb-1 relative z-10">{phoneNumber}</div>
          <div className="flex items-center gap-2 relative z-10">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusStyles(status)}`}>
              {status}
            </span>
            <div className="flex items-center gap-1">
              {type === "outbound" ? (
                <PhoneOutgoing className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              ) : (
                <PhoneIncoming className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-xs capitalize font-medium">{type}</span>
            </div>
          </div>
        </div>
        
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
      
      <div className="grid grid-cols-2 gap-3 text-sm mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">{duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-800 dark:text-gray-200 font-medium truncate">{agent}</span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <BarChart className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-800 dark:text-gray-200 font-medium truncate">{campaign}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 dark:border-gray-700/30 text-xs relative z-10">
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>{date} • {time}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500 dark:text-gray-400">Credits:</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">{credits}</span>
        </div>
      </div>
    </div>
  );
};
