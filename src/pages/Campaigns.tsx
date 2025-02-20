import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, BarChart3, Phone, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const statsData = [
  {
    label: "Running Campaigns",
    value: "3",
    icon: <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-500" />
  },
  {
    label: "Total Campaigns",
    value: "5",
    icon: <Phone className="h-4 w-4 text-blue-600 dark:text-blue-500" />
  },
];

const campaignsData = [
  {
    id: "summer-outreach-2025",
    name: "Summer Outreach",
    status: "running",
    progress: 75,
    performance: 82,
    totalLeads: 1200,
    callsMade: 850,
    updated: "2025-02-10",
    created: "2025-01-15",
  },
  {
    id: "winter-sales-2025",
    name: "Winter Sales",
    status: "paused",
    progress: 45,
    performance: 68,
    totalLeads: 800,
    callsMade: 320,
    updated: "2025-02-09",
    created: "2025-01-20",
  },
  {
    id: "product-launch-2025",
    name: "Product Launch",
    status: "completed",
    progress: 100,
    performance: 95,
    totalLeads: 2500,
    callsMade: 2100,
    updated: "2025-02-08",
    created: "2025-01-01",
  },
  {
    id: "customer-feedback-2025",
    name: "Customer Feedback",
    status: "running",
    progress: 30,
    performance: 78,
    totalLeads: 450,
    callsMade: 120,
    updated: "2025-02-10",
    created: "2025-02-01",
  },
  {
    id: "market-research-2025",
    name: "Market Research",
    status: "running",
    progress: 60,
    performance: 88,
    totalLeads: 1500,
    callsMade: 900,
    updated: "2025-02-10",
    created: "2025-01-10",
  },
];

const Campaigns = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6 bg-white/10 dark:bg-gray-900/20 rounded-lg border border-gray-200/20 dark:border-gray-700/30 backdrop-blur-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Campaigns</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Campaigns</span>
            <span className="mx-2">/</span>
            <span>List</span>
          </div>
        </div>
        <Button 
          className="w-full sm:w-auto gap-2 justify-center" 
          variant="default" 
          onClick={() => navigate("/app/campaigns/create")}
        >
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statsData.map((stat) => (
          <div key={stat.label} className="p-6 rounded-lg bg-white/80 dark:bg-gray-900/80 space-y-2 cursor-pointer hover:bg-gray-50/90 dark:hover:bg-gray-800/90 transition-colors shadow-sm border border-gray-200/20 dark:border-gray-700/30">
            <div className="flex items-center gap-2">
              {stat.icon}
              <span className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="bg-white/80 dark:bg-gray-900/80 border-gray-200/20 dark:border-gray-700/30"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative rounded-lg border border-gray-200/20 dark:border-gray-700/30 bg-white/80 dark:bg-gray-900/80 shadow-sm transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 opacity-20"></div>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500">
          <div className="min-w-[1600px] w-full">
            <table className="w-full">
          <thead>
            <tr className="relative border-b border-gray-200/20 dark:border-gray-700/30 bg-gray-50/80 dark:bg-gray-800/80">
              <td className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent dark:from-blue-400/10 dark:to-transparent opacity-20"></td>
              <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[300px]">Name</th>
              <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[150px]">Status</th>
              <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[200px]">Progress</th>
              <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[150px]">Performance</th>
              <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[150px]">Total Leads</th>
              <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[150px]">Calls Made</th>
              <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[150px]">Updated</th>
              <th className="text-left py-3 px-6 text-gray-700 dark:text-gray-200 font-semibold relative z-10 w-[150px]">Created</th>
            </tr>
          </thead>
          <tbody>
            {campaignsData.map((campaign) => (
              <tr 
                key={campaign.name}
                onClick={() => navigate(`/app/campaigns/${campaign.id}`)} 
                className="group relative border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/80"
              >
                <td className="relative py-4 px-6 z-20">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium">{campaign.name}</span>
                  </div>
                </td>
                <td className="relative py-4 px-6 z-20">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      campaign.status === "running" ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400" :
                      campaign.status === "paused" ? "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400" :
                      "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400"
                    )}>
                      {campaign.status}
                    </span>
                  </div>
                </td>
                <td className="relative py-4 px-6 z-20">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{campaign.progress}%</span>
                  </div>
                </td>
                <td className="relative py-4 px-6 z-20">
                  <span className="text-foreground">{campaign.performance}%</span>
                </td>
                <td className="relative py-4 px-6 z-20">
                  <span className="text-foreground">{campaign.totalLeads}</span>
                </td>
                <td className="relative py-4 px-6 z-20">
                  <span className="text-foreground">{campaign.callsMade}</span>
                </td>
                <td className="relative py-4 px-6 z-20">
                  <span className="text-muted-foreground">{campaign.updated}</span>
                </td>
                <td className="relative py-4 px-6 z-20">
                  <span className="text-muted-foreground">{campaign.created}</span>
                </td>
              </tr>
            ))}
          </tbody>
            </table>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span>Rows per page:</span>
            <select className="bg-transparent border-none text-gray-500 dark:text-gray-400">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
            <button className="hover:text-gray-900 dark:hover:text-gray-100">Previous</button>
            <span>Page 1</span>
            <button className="hover:text-gray-900 dark:hover:text-gray-100">Next</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Campaigns;
