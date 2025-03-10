import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LeadsTable } from "@/components/campaign/LeadsTable";
import { TemplateBrowser } from "@/components/campaign/TemplateBrowser";
import { NewLeadDialog } from "@/components/NewLeadDialog";
import { CsvUploadDialog } from "@/components/CsvUploadDialog";

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState("UTC-4");
  const [templateBrowserOpen, setTemplateBrowserOpen] = useState(false);
  const [newLeadDialogOpen, setNewLeadDialogOpen] = useState(false);
  const [csvUploadDialogOpen, setCsvUploadDialogOpen] = useState(false);
  const [firstMessage, setFirstMessage] = useState("");
  const [activeDays, setActiveDays] = useState({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: false,
    Sun: false,
  });

  const toggleDay = (day: keyof typeof activeDays) => {
    setActiveDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 sm:space-y-6 max-w-5xl mx-auto py-4 sm:py-8 px-3 sm:px-4"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create Campaign</h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">Set up your outbound campaign configuration</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => navigate("/app/campaigns")} className="flex-1 sm:flex-initial">
            Cancel
          </Button>
          <Button className="flex-1 sm:flex-initial">
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Campaign Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Campaign Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                placeholder="Summer Outreach Campaign"
                className="bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Campaign Type</Label>
              <Select defaultValue="outbound">
                <SelectTrigger className="bg-muted/50">
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outbound">Outbound</SelectItem>
                  <SelectItem value="inbound">Inbound</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* First Message */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <h3 className="text-lg font-semibold">First Message</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 w-full sm:w-auto"
              onClick={() => setTemplateBrowserOpen(true)}
            >
              <FileText className="h-4 w-4" />
              Browse Templates
            </Button>
          </div>
          <Textarea
            placeholder="Hi, {customer.name}! This is {agent.name} from {company.name}."
            className="min-h-[100px] bg-muted/50"
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
          />
          <TemplateBrowser 
            open={templateBrowserOpen}
            onOpenChange={setTemplateBrowserOpen}
            onSelectTemplate={setFirstMessage}
          />
        </div>

        {/* Timezone and Scheduling */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Timezone and Scheduling</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-4">UTC-4</SelectItem>
                  <SelectItem value="UTC-5">UTC-5</SelectItem>
                  <SelectItem value="UTC-6">UTC-6</SelectItem>
                  <SelectItem value="UTC-7">UTC-7</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>From Time</Label>
              <Input type="time" defaultValue="09:00" className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label>To Time</Label>
              <Input type="time" defaultValue="17:00" className="bg-muted/50" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Active Days</Label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeDays).map(([day, active]) => (
                <Button
                  key={day}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDay(day as keyof typeof activeDays)}
                  className={active ? "bg-primary" : ""}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Agent and Phone Number */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Agent and Phone Number</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Agent</Label>
              <Select defaultValue="john-doe">
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-doe">Jane Doe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Select defaultValue="1234567890">
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1234567890">+1 (555) 123-4567</SelectItem>
                  <SelectItem value="0987654321">+1 (555) 987-6543</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Retry Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Retry Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Max Retries</Label>
              <Input type="number" defaultValue="3" min="1" className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label>Retry Interval (Minutes)</Label>
              <Input type="number" defaultValue="30" min="1" className="bg-muted/50" />
            </div>
          </div>
        </div>

        {/* Consent Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Consent Settings</h3>
          <div className="flex items-start space-x-2">
            <Switch id="mark-complete" className="mt-0.5" />
            <Label htmlFor="mark-complete" className="leading-tight">
              Mark Complete on No Leads
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Automatically mark the campaign as complete when there are no more leads to call
              </p>
            </Label>
          </div>
        </div>

        {/* Leads Management */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <h3 className="text-lg font-semibold">Leads Management</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 flex-1 sm:flex-initial"
                onClick={() => setCsvUploadDialogOpen(true)}
              >
                <Upload className="h-4 w-4" />
                Upload CSV
              </Button>
              <Button 
                size="sm"
                className="gap-2 flex-1 sm:flex-initial"
                onClick={() => setNewLeadDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                New Lead
              </Button>
            </div>
          </div>
          <LeadsTable />
          
          {/* Dialogs */}
          <NewLeadDialog
            open={newLeadDialogOpen}
            onOpenChange={setNewLeadDialogOpen}
            onSave={(leadData) => {
              console.log('New lead data:', leadData);
              // TODO: Implement lead creation logic
            }}
          />
          <CsvUploadDialog
            open={csvUploadDialogOpen}
            onOpenChange={setCsvUploadDialogOpen}
            onUpload={(file) => {
              console.log('CSV file:', file);
              // TODO: Implement CSV processing logic
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
