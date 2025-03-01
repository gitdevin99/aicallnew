import React from "react";
import { Phone, MessageSquare, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuyNumberCardProps {
  number: string;
  type: "Local" | "Toll-Free" | "Mobile";
  capabilities: {
    voice: boolean;
    sms: boolean;
  };
  addressRequired: boolean;
  price: string;
}

export const BuyNumberCard = ({
  number,
  type,
  capabilities,
  addressRequired,
  price,
}: BuyNumberCardProps) => {
  return (
    <div className="relative p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200/20 dark:border-gray-700/30 shadow-sm group transition-all duration-300">
      <div className="absolute inset-0 rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 to-white/40 dark:from-gray-800/40 dark:to-gray-900/40 rounded-lg shadow-[inset_0px_0px_10px_rgba(0,0,0,0.01)] dark:shadow-[inset_0px_0px_10px_rgba(255,255,255,0.01)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/2 to-purple-500/2 dark:from-blue-500/5 dark:to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
      
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white">{number}</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 capitalize">{type}</div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-gray-900 dark:text-white font-medium">
            <Tag className="h-3.5 w-3.5" />
            <span>{price}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-3 relative z-10">
        {capabilities.voice && (
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Phone className="h-3.5 w-3.5" />
            <span className="text-sm">Voice</span>
          </div>
        )}
        {capabilities.sms && (
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="text-sm">SMS</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <MapPin className="h-3.5 w-3.5" />
          <span className="text-sm">{addressRequired ? "Address Required" : "No Address Required"}</span>
        </div>
      </div>
      
      <div className="relative z-10">
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-blue-500/20 transition-all duration-200"
        >
          Buy This Number
        </Button>
      </div>
    </div>
  );
};
