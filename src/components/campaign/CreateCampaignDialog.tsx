import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Clock, Upload } from "lucide-react";

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCampaignDialog({ open, onOpenChange }: CreateCampaignDialogProps) {
  const [timezone, setTimezone] = useState("UTC-4");
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Campaign</DialogTitle>
        </DialogHeader>

        {/* Campaign Details */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Campaign Details</h3>
            <div className="grid grid-cols-2 gap-4">
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">First Message</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Browse Templates
              </Button>
            </div>
            <Textarea
              placeholder="Hi, {customer.name}! This is {agent.name} from {company.name}."
              className="min-h-[100px] bg-muted/50"
            />
          </div>

          {/* Timezone and Scheduling */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Timezone and Scheduling</h3>
            <div className="grid grid-cols-3 gap-4">
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
              <div className="flex gap-2">
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
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
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
            <div className="flex items-center space-x-2">
              <Switch id="mark-complete" />
              <Label htmlFor="mark-complete">
                Mark Complete on No Leads
                <p className="text-sm text-muted-foreground">
                  Automatically mark the campaign as complete when there are no more leads to call
                </p>
              </Label>
            </div>
          </div>

          {/* Leads Management */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Leads Management</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload CSV
                </Button>
                <Button size="sm">+ New Lead</Button>
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 text-center text-muted-foreground">
              No leads added yet. Add leads by uploading a CSV or manually adding them.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button>
              Create Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
