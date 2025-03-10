import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Search, Plus, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { GB, US } from 'country-flag-icons/react/3x2';
import { PhoneNumberDialog } from "@/components/phone-number-dialog";
import { SipTrunkDialog } from "@/components/sip-trunk-dialog";
import { LinkNumberDialog } from "@/components/link-number-dialog";
import { PhoneNumberCard } from "@/components/PhoneNumberCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";

interface PhoneNumber {
  country: 'US' | 'GB';
  smsCapable: boolean;
  phoneNumber: string;
  type: 'Local' | 'Toll-Free' | 'Mobile';
  campaignName: string;
  renewsAt: string;
  activeUntil: string;
  createdAt: string;
}

const CountryFlag = ({ country }: { country: PhoneNumber['country'] }) => {
  switch (country) {
    case 'US':
      return <US title="United States" className="w-6 h-4" />;
    case 'GB':
      return <GB title="United Kingdom" className="w-6 h-4" />;
    default:
      return null;
  }
};

export default function ManageNumbers() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showFilters, setShowFilters] = useState(false);
  
  const demoNumbers: PhoneNumber[] = [
    {
      country: 'US',
      smsCapable: true,
      phoneNumber: '+1 (325) 241-4903',
      type: 'Local',
      campaignName: 'Summer Sale 2025',
      renewsAt: '2025-03-28',
      activeUntil: '2026-03-28',
      createdAt: '2025-01-28'
    },
    {
      country: 'US',
      smsCapable: false,
      phoneNumber: '+1 (800) 289-7458',
      type: 'Toll-Free',
      campaignName: 'Customer Support',
      renewsAt: '2025-02-15',
      activeUntil: '2026-02-15',
      createdAt: '2025-01-15'
    },
    {
      country: 'GB',
      smsCapable: true,
      phoneNumber: '+44 7700 090123',
      type: 'Mobile',
      campaignName: 'UK Sales Q1',
      renewsAt: '2025-04-01',
      activeUntil: '2026-04-01',
      createdAt: '2025-01-01'
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Manage Numbers</h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          View and manage your phone numbers and their associated campaigns.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search numbers, campaigns..."
            className="pl-10 bg-transparent border-gray-200 dark:border-gray-700 w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {isMobile && (
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </div>
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
          <div className="flex flex-wrap gap-2">
            <LinkNumberDialog />
            <SipTrunkDialog />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-auto justify-center">
              <Plus className="h-4 w-4 mr-2" />
              Add New Number
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile filters section (expandable) */}
      {isMobile && showFilters && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Country
            </label>
            <Select />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Type
            </label>
            <Select />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Campaign
            </label>
            <Select />
          </div>
        </div>
      )}

      {isMobile ? (
        // Mobile Card View
        <div className="grid grid-cols-1 gap-4">
          {demoNumbers.map((number) => (
            <PhoneNumberCard
              key={number.phoneNumber}
              {...number}
            />
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div className="relative overflow-x-auto rounded-xl bg-white dark:bg-[#0f1623] shadow-md dark:shadow-[inset_0px_0px_20px_rgba(255,255,255,0.05)] border border-gray-200 dark:border-gray-800/50 group/table transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover/table:opacity-100 transition-opacity duration-500"></div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500">
            <table className="w-full table-auto border-collapse min-w-[1000px]">
              <thead>
                <tr className="relative border-b border-gray-200 dark:border-gray-800/50 bg-gray-50 dark:bg-[#0f1623]">
                  <td className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-50"></td>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Country</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">SMS</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Campaign</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Renews At</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Active Until</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Created At</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {demoNumbers.map((number, index) => (
                  <tr 
                    key={number.phoneNumber}
                    className={`group relative border-b border-gray-200 dark:border-gray-800/50 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-[#141b29] ${index === demoNumbers.length - 1 ? '' : 'border-b'}`}
                  >
                    <td className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></td>
                    <td className="relative px-6 py-4 text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      <div className="flex items-center justify-center">
                        <CountryFlag country={number.country} />
                      </div>
                    </td>
                    <td className="relative px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ${number.smsCapable ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 group-hover:text-green-800 dark:group-hover:text-green-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 group-hover:text-gray-800 dark:group-hover:text-gray-300'}`}>
                        {number.smsCapable ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">{number.phoneNumber}</td>
                    <td className="relative px-6 py-4 text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{number.type}</td>
                    <td className="relative px-6 py-4 text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{number.campaignName}</td>
                    <td className="relative px-6 py-4 text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{number.renewsAt}</td>
                    <td className="relative px-6 py-4 text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{number.activeUntil}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{number.createdAt}</td>
                    <td className="relative px-6 py-4 text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        className="text-blue-400 hover:text-blue-300 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-4">
        <span>Showing {demoNumbers.length} of {demoNumbers.length} numbers</span>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 hover:text-gray-900 dark:hover:text-gray-100"
            disabled
          >
            Previous
          </Button>
          <span>Page 1 of 1</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 hover:text-gray-900 dark:hover:text-gray-100"
            disabled
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
