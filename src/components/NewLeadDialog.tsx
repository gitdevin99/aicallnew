import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface NewLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (leadData: LeadData) => void;
}

interface Variable {
  key: string;
  value: string;
}

interface LeadData {
  phoneNumber: string;
  name: string;
  email: string;
  variables: Variable[];
}

export function NewLeadDialog({
  open,
  onOpenChange,
  onSave,
}: NewLeadDialogProps) {
  const [leadData, setLeadData] = useState<LeadData>({
    phoneNumber: "",
    name: "",
    email: "",
    variables: [{ key: "", value: "" }],
  });

  const handleSave = () => {
    onSave(leadData);
    onOpenChange(false);
  };

  const addVariable = () => {
    setLeadData({
      ...leadData,
      variables: [...leadData.variables, { key: "", value: "" }],
    });
  };

  const removeVariable = (index: number) => {
    const newVariables = [...leadData.variables];
    newVariables.splice(index, 1);
    setLeadData({ ...leadData, variables: newVariables });
  };

  const updateVariable = (index: number, field: "key" | "value", value: string) => {
    const newVariables = [...leadData.variables];
    newVariables[index][field] = value;
    setLeadData({ ...leadData, variables: newVariables });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border border-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-100">New Lead</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-400">
              Phone number
            </label>
            <Input
              id="phone"
              placeholder="+1234567890"
              value={leadData.phoneNumber}
              onChange={(e) =>
                setLeadData({ ...leadData, phoneNumber: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-400">
              Name
            </label>
            <Input
              id="name"
              placeholder="Ex: John Doe"
              value={leadData.name}
              onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
              className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-400">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Ex: john@doe.com"
              value={leadData.email}
              onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
              className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-400">Variables</label>
              <Button
                type="button"
                variant="link"
                className="text-blue-500 hover:text-blue-400 p-0 h-auto"
                onClick={addVariable}
              >
                Add Row
              </Button>
            </div>
            {leadData.variables.map((variable, index) => (
              <div key={index} className="grid grid-cols-[1fr,1fr,auto] gap-2">
                <Input
                  placeholder="Variable name"
                  value={variable.key}
                  onChange={(e) => updateVariable(index, "key", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
                />
                <Input
                  placeholder="Default value will be used"
                  value={variable.value}
                  onChange={(e) => updateVariable(index, "value", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeVariable(index)}
                  className="h-10 w-10 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-700 hover:bg-gray-800 text-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
