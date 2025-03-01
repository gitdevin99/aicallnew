import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AdvancedFiltersDialog, AdvancedFilters } from "@/components/AdvancedFiltersDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, Download, SlidersHorizontal, Filter } from "lucide-react";
import { CallTableRow } from "@/components/CallTableRow";
import { CallCardItem } from "@/components/CallCardItem";
import { useMediaQuery } from "@/hooks/use-media-query";

const callsData = [
  {
    phoneNumber: "+1 (555) 123-4567",
    status: "completed",
    type: "outbound",
    duration: "3:00",
    agent: "Sarah Wilson",
    campaign: "Summer Outreach",
    date: "Feb 10",
    time: "10:30 AM",
    credits: 2,
  },
  {
    phoneNumber: "+1 (555) 987-6543",
    status: "triggered",
    type: "outbound",
    duration: "0:00",
    agent: "John Doe",
    campaign: "Winter Campaign",
    date: "Feb 10",
    time: "10:45 AM",
    credits: 0,
  },
  {
    phoneNumber: "+1 (555) 456-7890",
    status: "failed",
    type: "outbound",
    duration: "0:15",
    agent: "Emma Thompson",
    campaign: "Spring Sales",
    date: "Feb 10",
    time: "11:00 AM",
    credits: 1,
  },
  {
    phoneNumber: "+1 (555) 234-5678",
    status: "completed",
    type: "inbound",
    duration: "6:00",
    agent: "Sarah Wilson",
    campaign: "Summer Outreach",
    date: "Feb 10",
    time: "11:15 AM",
    credits: 3,
  },
  {
    phoneNumber: "+1 (555) 345-6789",
    status: "completed",
    type: "outbound",
    duration: "4:00",
    agent: "John Doe",
    campaign: "Winter Campaign",
    date: "Feb 10",
    time: "11:30 AM",
    credits: 2,
  },
  {
    phoneNumber: "+1 (555) 567-8901",
    status: "triggered",
    type: "outbound",
    duration: "0:00",
    agent: "Emma Thompson",
    campaign: "Spring Sales",
    date: "Feb 10",
    time: "11:45 AM",
    credits: 0,
  },
  {
    phoneNumber: "+1 (555) 678-9012",
    status: "failed",
    type: "outbound",
    duration: "0:30",
    agent: "Sarah Wilson",
    campaign: "Summer Outreach",
    date: "Feb 10",
    time: "12:00 PM",
    credits: 1,
  },
  {
    phoneNumber: "+1 (555) 789-0123",
    status: "completed",
    type: "inbound",
    duration: "7:00",
    agent: "John Doe",
    campaign: "Winter Campaign",
    date: "Feb 10",
    time: "12:15 PM",
    credits: 4,
  },
  {
    phoneNumber: "+1 (555) 890-1234",
    status: "completed",
    type: "outbound",
    duration: "5:00",
    agent: "Emma Thompson",
    campaign: "Spring Sales",
    date: "Feb 10",
    time: "12:30 PM",
    credits: 3,
  },
  {
    phoneNumber: "+1 (555) 901-2345",
    status: "triggered",
    type: "outbound",
    duration: "0:00",
    agent: "Sarah Wilson",
    campaign: "Summer Outreach",
    date: "Feb 10",
    time: "12:45 PM",
    credits: 0,
  },
];

const Calls = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-6 bg-white/10 dark:bg-gray-900/20 rounded-lg border border-gray-200/20 dark:border-gray-700/30 backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Calls</h1>
          <Info className="h-5 w-5 text-gray-400" />
        </div>
        <Button variant="outline" className="gap-2 text-sm w-full md:w-auto">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
        Manage and analyze all your call records in one place
      </p>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by phone number, agent, or campaign..."
            className="bg-white dark:bg-transparent border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
        {isMobile && (
          <Button 
            variant="outline" 
            size="icon"
            className="border-gray-200 dark:border-gray-800"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters - Responsive */}
      {(!isMobile || (isMobile && showFilters)) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Status
            </label>
            <Select>
              <SelectTrigger className="bg-white dark:bg-transparent border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Select statuses" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <SelectItem className="text-gray-900 dark:text-gray-100" value="all">All</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="completed">Completed</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="triggered">Triggered</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Call Type
            </label>
            <Select>
              <SelectTrigger className="bg-white dark:bg-transparent border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <SelectItem className="text-gray-900 dark:text-gray-100" value="all">All</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="inbound">Inbound</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="outbound">Outbound</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Campaign
            </label>
            <Select>
              <SelectTrigger className="bg-white dark:bg-transparent border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <SelectItem className="text-gray-900 dark:text-gray-100" value="all">All</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="summer">Summer Outreach</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="winter">Winter Campaign</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="spring">Spring Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Agent
            </label>
            <Select>
              <SelectTrigger className="bg-white dark:bg-transparent border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <SelectItem className="text-gray-900 dark:text-gray-100" value="all">All</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="sarah">Sarah Wilson</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="john">John Doe</SelectItem>
                <SelectItem className="text-gray-900 dark:text-gray-100" value="emma">Emma Thompson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button 
          variant="outline" 
          className="text-sm border-gray-200 dark:border-gray-800 w-full sm:w-auto"
        >
          Reset Filters
        </Button>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button 
            variant="outline" 
            className="text-sm gap-2 border-gray-200 dark:border-gray-800 w-full sm:w-auto"
            onClick={() => setShowAdvancedFilters(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Advanced Filters
          </Button>
          <AdvancedFiltersDialog
            open={showAdvancedFilters}
            onOpenChange={setShowAdvancedFilters}
            onApplyFilters={(filters: AdvancedFilters) => {
              console.log('Applied filters:', filters);
              // TODO: Apply filters to the calls list
            }}
          />
          <Button className="text-sm bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto">
            Apply Filters
          </Button>
        </div>
      </div>

      {isMobile ? (
        // Mobile Card View
        <div className="grid grid-cols-1 gap-4">
          {callsData.map((call) => (
            <CallCardItem
              key={call.phoneNumber}
              {...call}
            />
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div className="relative rounded-lg border border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 opacity-20"></div>
          
          {/* Scroll Container */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500">
            <div className="min-w-[1600px] w-full">
              <table className="w-full">
                <thead>
                  <tr className="relative border-b border-gray-200/50 dark:border-gray-800/50 bg-gray-50/95 dark:bg-gray-900/95">
                    <td className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent dark:from-blue-500/20 dark:to-transparent opacity-20"></td>
                    <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[250px]">PHONE NUMBER</th>
                    <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[150px]">STATUS</th>
                    <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[150px]">TYPE</th>
                    <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[120px]">DURATION</th>
                    <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[200px]">AGENT</th>
                    <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[250px]">CAMPAIGN</th>
                    <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[180px]">DATE</th>
                    <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[120px]">CREDITS</th>
                    <th className="w-[80px] relative z-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {callsData.map((call) => (
                    <CallTableRow
                      key={call.phoneNumber}
                      {...call}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent flex flex-col sm:flex-row items-center justify-between text-sm gap-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <span>Rows per page:</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-gray-900 dark:hover:text-gray-100 h-8"
                disabled
              >
                Previous
              </Button>
              <span>Page 1 of 1</span>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-gray-900 dark:hover:text-gray-100 h-8"
                disabled
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Pagination */}
      {isMobile && (
        <div className="flex items-center justify-between py-4 text-sm">
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-gray-900 dark:hover:text-gray-100 h-8"
            disabled
          >
            Previous
          </Button>
          <span className="text-gray-500 dark:text-gray-400">Page 1 of 1</span>
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-gray-900 dark:hover:text-gray-100 h-8"
            disabled
          >
            Next
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default Calls;
