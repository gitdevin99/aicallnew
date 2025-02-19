import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

type Variable = {
  name: string;
  type: string;
  description: string;
};

export function DataCollectionStep() {
  const [variables, setVariables] = useState<Variable[]>([]);

  const handleAddVariable = () => {
    setVariables([...variables, { name: "", type: "string", description: "" }]);
  };

  const handleRemoveVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const handleVariableChange = (
    index: number,
    field: keyof Variable,
    value: string
  ) => {
    const newVariables = [...variables];
    newVariables[index] = { ...newVariables[index], [field]: value };
    setVariables(newVariables);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-medium text-foreground">
          Post call variables
        </Label>
        <p className="text-sm text-muted-foreground">
          Define the variables that the AI will extract from the call and trigger automation.
        </p>

        {/* Variables List */}
        <div className="space-y-4">
          {variables.map((variable, index) => (
            <div
              key={index}
              className="flex gap-4 items-start p-4 rounded-lg border bg-card"
            >
              <div className="flex-1 space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={variable.name}
                    onChange={(e) =>
                      handleVariableChange(index, "name", e.target.value)
                    }
                    placeholder="Variable name"
                    className="bg-background"
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={variable.type}
                    onValueChange={(value) =>
                      handleVariableChange(index, "type", value)
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="string">string</SelectItem>
                      <SelectItem value="number">number</SelectItem>
                      <SelectItem value="boolean">boolean</SelectItem>
                      <SelectItem value="date">date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={variable.description}
                    onChange={(e) =>
                      handleVariableChange(index, "description", e.target.value)
                    }
                    placeholder="Describe variable such that agent can understand how to extract it"
                    className="bg-background resize-none"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveVariable(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add Variable Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddVariable}
        >
          Add Row
        </Button>
      </div>
    </div>
  );
}
