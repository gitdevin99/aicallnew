import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, User, Mail, Calendar, Clock, BarChart3 } from "lucide-react";

interface LeadCardItemProps {
  phone: string;
  name: string;
  email: string;
  createdAt: string;
  callStats: {
    pending: number;
    completed: number;
    failed: number;
  };
  lastCall: string;
}

export const LeadCardItem = ({
  phone,
  name,
  email,
  createdAt,
  callStats,
  lastCall,
}: LeadCardItemProps) => {
  return (
    <div className="relative p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200/20 dark:border-gray-700/30 shadow-sm group transition-all duration-300">
      <div className="absolute inset-0 rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 to-white/40 dark:from-gray-800/40 dark:to-gray-900/40 rounded-lg shadow-[inset_0px_0px_10px_rgba(0,0,0,0.01)] dark:shadow-[inset_0px_0px_10px_rgba(255,255,255,0.01)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/2 to-purple-500/2 dark:from-blue-500/5 dark:to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
      
      <div className="flex items-start gap-3 mb-3 relative z-10">
        <Checkbox className="mt-1 shadow-lg shadow-gray-500/5 dark:shadow-gray-900/5" />
        <div className="flex-1">
          <div className="flex flex-col mb-1">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{name}</h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Phone className="h-3.5 w-3.5" />
              <span>{phone}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Mail className="h-3.5 w-3.5" />
            <span>{email}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-100 dark:border-gray-800 pt-2 mt-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-400" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Created</div>
            <div className="text-gray-800 dark:text-gray-300">{createdAt}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gray-400" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Last Call</div>
            <div className="text-gray-800 dark:text-gray-300">{lastCall}</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-2 mt-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-500">Call Stats</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-500 font-medium">{callStats.pending}</span>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-green-500 font-medium">{callStats.completed}</span>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-red-500 font-medium">{callStats.failed}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(P/C/F)</span>
        </div>
      </div>
    </div>
  );
};
