import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Upload, Download, Filter } from "lucide-react";
import { CsvUploadDialog } from "@/components/CsvUploadDialog";
import { NewLeadDialog } from "@/components/NewLeadDialog";
import { LeadTableRow } from "@/components/LeadTableRow";
import { LeadCardItem } from "@/components/LeadCardItem";
import { Checkbox } from "@/components/ui/checkbox";
import { useMediaQuery } from "@/hooks/use-media-query";

const leadsData = [
  {
    phone: "+1 (555) 123-4567",
    name: "John Smith",
    email: "john.smith@example.com",
    createdAt: "Feb 10, 10:30 AM",
    callStats: {
      pending: 2,
      completed: 3,
      failed: 1,
    },
    lastCall: "Feb 10, 2:30 PM",
  },
  {
    phone: "+1 (555) 987-6543",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    createdAt: "Feb 10, 11:15 AM",
    callStats: {
      pending: 1,
      completed: 4,
      failed: 0,
    },
    lastCall: "Feb 10, 3:45 PM",
  },
];

const CRM = () => {
  const [newLeadDialogOpen, setNewLeadDialogOpen] = useState(false);
  const [csvUploadDialogOpen, setCsvUploadDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleNewLead = (leadData: any) => {
    console.log('New lead data:', leadData);
    // TODO: Implement lead creation logic
  };

  const handleCsvUpload = (file: File) => {
    console.log('CSV file:', file);
    // TODO: Implement CSV processing logic
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-6 bg-white/10 dark:bg-gray-900/20 rounded-lg border border-gray-200/20 dark:border-gray-700/30 backdrop-blur-sm"
    >
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">CRM</h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          Manage your leads and assign them to your campaigns. You can see all the calling activity happened with them, data collected from this section.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="flex gap-2">
          <Button 
            className="gap-2 flex-1 md:flex-auto" 
            onClick={() => setNewLeadDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New Lead
          </Button>
          <NewLeadDialog
            open={newLeadDialogOpen}
            onOpenChange={setNewLeadDialogOpen}
            onSave={handleNewLead}
          />
          <Button 
            variant="outline" 
            className="gap-2 border-gray-200 dark:border-gray-800 flex-1 md:flex-auto"
            onClick={() => setCsvUploadDialogOpen(true)}
          >
            <Upload className="h-4 w-4" />
            Upload CSV
          </Button>
          <CsvUploadDialog
            open={csvUploadDialogOpen}
            onOpenChange={setCsvUploadDialogOpen}
            onUpload={handleCsvUpload}
          />
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
        <div className={`flex-1 ${isMobile && !showFilters ? 'hidden' : 'block'}`}>
          <Input
            type="search"
            placeholder="Search lead by name, phone, or email..."
            className="bg-white dark:bg-transparent border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 w-full"
          />
        </div>
      </div>

      {isMobile ? (
        // Mobile Card View
        <div className="grid grid-cols-1 gap-4">
          {leadsData.map((lead) => (
            <LeadCardItem
              key={lead.phone}
              {...lead}
            />
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div className="relative rounded-lg border border-gray-200/50 dark:border-gray-800/50 overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 opacity-50"></div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500">
            <div className="min-w-[1000px] w-full">
              <table className="w-full">
                <thead>
                  <tr className="relative border-b border-gray-200/50 dark:border-gray-800/50 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <td className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent dark:from-blue-500/10 dark:to-transparent opacity-50"></td>
                    <th className="py-3 px-4">
                      <Checkbox />
                    </th>
                    <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">PHONE</th>
                    <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">NAME</th>
                    <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">EMAIL</th>
                    <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">CREATED AT</th>
                    <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium"># CALLS (P/C/F)</th>
                    <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">LAST CALL</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsData.map((lead) => (
                    <LeadTableRow
                      key={lead.phone}
                      {...lead}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-4">
        <span>Showing 1-2 of 2 leads</span>
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

export default CRM;
