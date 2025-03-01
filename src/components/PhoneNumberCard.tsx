import React from "react";
import { GB, US } from 'country-flag-icons/react/3x2';
import { Calendar, Tag, PhoneCall, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhoneNumberCardProps {
  country: 'US' | 'GB';
  smsCapable: boolean;
  phoneNumber: string;
  type: 'Local' | 'Toll-Free' | 'Mobile';
  campaignName: string;
  renewsAt: string;
  activeUntil: string;
  createdAt: string;
}

const CountryFlag = ({ country }: { country: PhoneNumberCardProps['country'] }) => {
  switch (country) {
    case 'US':
      return <US title="United States" className="w-6 h-4" />;
    case 'GB':
      return <GB title="United Kingdom" className="w-6 h-4" />;
    default:
      return null;
  }
};

export const PhoneNumberCard = ({
  country,
  smsCapable,
  phoneNumber,
  type,
  campaignName,
  renewsAt,
  activeUntil,
  createdAt
}: PhoneNumberCardProps) => {
  return (
    <div className="relative p-4 rounded-lg bg-white dark:bg-[#0f1623] border border-gray-200/20 dark:border-gray-800/30 shadow-sm group transition-all duration-300">
      <div className="absolute inset-0 rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 to-white/40 dark:from-gray-800/40 dark:to-gray-900/40 rounded-lg shadow-[inset_0px_0px_10px_rgba(0,0,0,0.01)] dark:shadow-[inset_0px_0px_10px_rgba(255,255,255,0.01)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/2 to-purple-500/2 dark:from-blue-500/5 dark:to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
      
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <CountryFlag country={country} />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">{phoneNumber}</h3>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ${smsCapable ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'}`}>
          {smsCapable ? 'SMS' : 'Voice Only'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-gray-400" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Type</div>
            <div className="text-sm text-gray-800 dark:text-gray-300">{type}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <PhoneCall className="h-3.5 w-3.5 text-gray-400" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Campaign</div>
            <div className="text-sm text-gray-800 dark:text-gray-300">{campaignName}</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3 relative z-10 border-t border-gray-100 dark:border-gray-800 pt-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-400" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Renews</div>
            <div className="text-sm text-gray-800 dark:text-gray-300">{renewsAt}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-400" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Active Until</div>
            <div className="text-sm text-gray-800 dark:text-gray-300">{activeUntil}</div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center relative z-10 border-t border-gray-100 dark:border-gray-800 pt-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">Created: {createdAt}</div>
        <Button 
          variant="ghost" 
          className="text-blue-400 hover:text-blue-300 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
