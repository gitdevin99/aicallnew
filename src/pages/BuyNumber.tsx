import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { GB, US, AE } from 'country-flag-icons/react/3x2';
import { BuyNumberRow } from "@/components/BuyNumberRow";
import { BuyNumberCard } from "@/components/BuyNumberCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const phoneNumbersData = [
  {
    number: "+19032897457",
    type: "Local",
    capabilities: {
      voice: true,
      sms: true,
    },
    addressRequired: false,
    price: "1.15 USD",
  },
];

const BuyNumber = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [filtersExpanded, setFiltersExpanded] = useState(!isMobile);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-6 bg-white/10 dark:bg-gray-900/20 rounded-lg border border-gray-200/20 dark:border-gray-700/30 backdrop-blur-sm w-full h-full"
    >
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Buy Phone Number</h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          Select a phone number that suits your needs.
        </p>
      </div>

      {/* Mobile Filter Toggle */}
      {isMobile && (
        <div className="w-full">
          <Button 
            variant="outline" 
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className="w-full flex items-center justify-between border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter Options</span>
            </div>
            {filtersExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      )}

      {/* Filters Section */}
      {filtersExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Country
            </label>
            <Select defaultValue="us">
              <SelectTrigger className="w-full bg-white/50 dark:bg-transparent border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-gray-500/10 transition-all duration-200 text-gray-900 dark:text-white">
                <SelectValue placeholder="Select country" className="text-gray-900 dark:text-white">
                  <div className="flex items-center gap-2">
                    <US className="h-4 w-3" />
                    <span>+1</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <SelectItem className="text-gray-900 dark:text-gray-100" value="us">
                  <div className="flex items-center gap-2">
                    <US className="h-4 w-3" />
                    <span>+1</span>
                  </div>
                </SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="ae">
                  <div className="flex items-center gap-2">
                    <AE className="h-4 w-3" />
                    <span>+971</span>
                  </div>
                </SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="gb">
                  <div className="flex items-center gap-2">
                    <GB className="h-4 w-3" />
                    <span>+44</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-6">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search by digits or phrases"
                className="w-full pl-9 bg-white/50 dark:bg-transparent border-gray-200/50 dark:border-gray-800/50 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-lg hover:shadow-gray-500/10 transition-all duration-200"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Capabilities
            </label>
            <div className="flex items-center gap-2 h-10">
              <Switch id="voice-enabled" />
              <label htmlFor="voice-enabled" className="text-sm text-gray-500 dark:text-gray-400">
                Voice Enabled
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Number Type
            </label>
            <Select defaultValue="local">
              <SelectTrigger className="bg-white/50 dark:bg-transparent border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-gray-500/10 transition-all duration-200 text-gray-900 dark:text-white">
                <SelectValue placeholder="Select type" className="text-gray-900 dark:text-white" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <SelectItem value="local" className="text-gray-900 dark:text-gray-100">
                  Local
                </SelectItem>
                <SelectItem value="toll-free" className="text-gray-900 dark:text-gray-100">
                  Toll-Free
                </SelectItem>
                <SelectItem value="mobile" className="text-gray-900 dark:text-gray-100">
                  Mobile
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {isMobile ? (
        // Mobile Card View
        <div className="grid grid-cols-1 gap-4">
          {phoneNumbersData.map((number) => (
            <BuyNumberCard
              key={number.number}
              {...number}
            />
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div className="relative border border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-[inset_0px_0px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0px_0px_20px_rgba(255,255,255,0.02)] group transition-all duration-200 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:via-transparent dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500">
            <table className="w-full whitespace-nowrap" style={{ minWidth: '800px' }}>
              <thead>
                <tr className="relative border-b border-gray-200/50 dark:border-gray-800/50 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <td className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent dark:from-blue-500/10 dark:to-transparent opacity-50"></td>
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">PHONE NUMBER</th>
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">TYPE</th>
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">CAPABILITIES</th>
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">ADDRESS REQUIRED</th>
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">PRICE</th>
                  <th className="w-[80px]"></th>
                </tr>
              </thead>
              <tbody>
                {phoneNumbersData.map((number) => (
                  <BuyNumberRow
                    key={number.number}
                    {...number}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-4">
        <span>Showing 1-1 of 1 results</span>
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
    </motion.div>
  );
};

export default BuyNumber;
