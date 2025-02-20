import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save, ArrowLeft, Play, Pause, Phone, Clock, CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { LeadsTable } from "@/components/campaign/LeadsTable";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CallStats {
  label: string;
  value: number;
  icon: JSX.Element;
  color: string;
  bgColor: string;
  description?: string;
}

export default function CampaignDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRunning, setIsRunning] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [campaignData, setCampaignData] = useState({
    name: "Summer Outreach Campaign",
    type: "outbound",
    agent: "John Doe",
    phoneNumber: "+1 (555) 123-4567",
    activeDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    activeHours: "9:00 AM - 5:00 PM (UTC-4)",
    retrySettings: "3 retries, 30 minutes interval"
  });

  const callStats: CallStats[] = [
    {
      label: "Pending Calls",
      value: 450,
      icon: <Clock className="h-5 w-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Scheduled calls waiting to be made"
    },
    {
      label: "Triggered Calls",
      value: 850,
      icon: <Phone className="h-5 w-5" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "Calls currently in progress"
    },
    {
      label: "Completed Calls",
      value: 720,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Successfully completed calls"
    },
    {
      label: "Failed Calls",
      value: 130,
      icon: <XCircle className="h-5 w-5" />,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      description: "Calls that failed to connect"
    },
  ];

  const toggleCampaignStatus = () => {
    setIsRunning(!isRunning);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-7xl mx-auto py-8 px-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/app/campaigns")}
              className="hover:bg-background"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={campaignData.name}
                    onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                    className="text-2xl font-bold h-12 w-[400px]"
                  />
                </div>
              ) : (
                <h1 className="text-3xl font-bold text-foreground">{campaignData.name}</h1>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Campaign ID: {id}</span>
                <span>•</span>
                <span>Created on Feb 15, 2025</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsEditing(!isEditing)}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <Save className="h-5 w-5" />
                Save Changes
              </>
            ) : (
              <>
                <Pencil className="h-5 w-5" />
                Edit Campaign
              </>
            )}
          </Button>
          <Button
            variant={isRunning ? "destructive" : "default"}
            size="lg"
            onClick={toggleCampaignStatus}
            className="gap-2"
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5" />
                Pause Campaign
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Start Campaign
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
        {callStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, translateY: -5 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "p-6 rounded-2xl space-y-4 relative overflow-hidden group cursor-pointer",
              "bg-white dark:bg-gray-900",
              "shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),_4px_4px_8px_rgba(0,0,0,0.1),_-4px_-4px_8px_rgba(255,255,255,0.9)]",
              "dark:shadow-[inset_0px_1px_1px_rgba(255,255,255,0.1),_4px_4px_8px_rgba(0,0,0,0.5),_-4px_-4px_8px_rgba(255,255,255,0.03)]",
              "hover:shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),_6px_6px_12px_rgba(0,0,0,0.15),_-6px_-6px_12px_rgba(255,255,255,0.95)]",
              "dark:hover:shadow-[inset_0px_1px_1px_rgba(255,255,255,0.1),_6px_6px_12px_rgba(0,0,0,0.6),_-6px_-6px_12px_rgba(255,255,255,0.04)]",
              "transition-all duration-300"
            )}
          >
            {/* Gradient overlay */}
            <div 
              className={cn(
                "absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20",
                "bg-gradient-to-br",
                stat.bgColor
              )} 
            />
            
            <div className="space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className={cn(
                      "p-2 rounded-xl transition-all duration-300",
                      "bg-gray-100 dark:bg-gray-800",
                      "shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),_-2px_-2px_4px_rgba(255,255,255,0.9)]",
                      "dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5),_-2px_-2px_4px_rgba(255,255,255,0.03)]",
                      "group-hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.15),_-3px_-3px_6px_rgba(255,255,255,0.95)]",
                      "dark:group-hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.6),_-3px_-3px_6px_rgba(255,255,255,0.04)]",
                      stat.color
                    )}
                  >
                    {stat.icon}
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{stat.label}</span>
                </div>
                {stat.description && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle className="h-4 w-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stat.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
                {stat.value.toLocaleString()}
              </div>
            </div>
            
            {/* Progress indicator */}
            <Progress 
              value={(stat.value / 2000) * 100} 
              className="h-1 bg-background/50" 
            />
          </motion.div>
        ))}
      </div>

      {/* Campaign Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Campaign Progress</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Total Leads: 2,150</span>
            <span>•</span>
            <span>Completion: 33.5%</span>
          </div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: "33.5%" }}
          />
        </div>
      </div>

      {/* Campaign Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Campaign Type</Label>
          {isEditing ? (
            <Select value={campaignData.type} onValueChange={(value) => setCampaignData({ ...campaignData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outbound">Outbound</SelectItem>
                <SelectItem value="inbound">Inbound</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <p className="text-foreground capitalize">{campaignData.type}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Assigned Agent</Label>
          {isEditing ? (
            <Select value={campaignData.agent} onValueChange={(value) => setCampaignData({ ...campaignData, agent: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <p className="text-foreground">{campaignData.agent}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
          {isEditing ? (
            <Input
              value={campaignData.phoneNumber}
              onChange={(e) => setCampaignData({ ...campaignData, phoneNumber: e.target.value })}
            />
          ) : (
            <p className="text-foreground">{campaignData.phoneNumber}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Active Days</Label>
          {isEditing ? (
            <Select
              value={campaignData.activeDays.join(", ")}
              onValueChange={(value) => setCampaignData({ ...campaignData, activeDays: value.split(", ") })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mon, Tue, Wed, Thu, Fri">Weekdays</SelectItem>
                <SelectItem value="Sat, Sun">Weekends</SelectItem>
                <SelectItem value="Mon, Tue, Wed, Thu, Fri, Sat, Sun">All Days</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <p className="text-foreground">{campaignData.activeDays.join(", ")}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Active Hours</Label>
          {isEditing ? (
            <Input
              value={campaignData.activeHours}
              onChange={(e) => setCampaignData({ ...campaignData, activeHours: e.target.value })}
            />
          ) : (
            <p className="text-foreground">{campaignData.activeHours}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Retry Settings</Label>
          {isEditing ? (
            <Input
              value={campaignData.retrySettings}
              onChange={(e) => setCampaignData({ ...campaignData, retrySettings: e.target.value })}
            />
          ) : (
            <p className="text-foreground">{campaignData.retrySettings}</p>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Campaign Leads</h2>
        <LeadsTable />
      </div>
    </motion.div>
  );
}
