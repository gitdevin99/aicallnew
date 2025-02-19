import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Upload, Trash2, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type KnowledgeItem = {
  type: 'url' | 'file';
  value: string;
};

export function KnowledgeStep() {
  const [llmModel, setLlmModel] = useState("gpt-4");
  const [customKnowledge, setCustomKnowledge] = useState("");
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...knowledgeItems];
    newItems[index] = { ...newItems[index], value };
    setKnowledgeItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = knowledgeItems.filter((_, i) => i !== index);
    setKnowledgeItems(newItems);
  };

  const handleAddItem = (type: 'url' | 'file') => {
    setKnowledgeItems([...knowledgeItems, { type, value: "" }]);
  };

  return (
    <div className="space-y-8">
      {/* LLM Model Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-foreground">LLM</Label>
        <Select value={llmModel} onValueChange={setLlmModel}>
          <SelectTrigger className="w-[200px] bg-background">
            <SelectValue placeholder="Select LLM model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">GPT 4.0</SelectItem>
            <SelectItem value="gpt-3.5">GPT 3.5</SelectItem>
            <SelectItem value="claude">Claude</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Custom Knowledge */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-foreground">
          Custom knowledge
        </Label>
        <Textarea
          value={customKnowledge}
          onChange={(e) => setCustomKnowledge(e.target.value)}
          placeholder="Ex: Hello, how can I help you today?"
          className="min-h-[100px] bg-background resize-none"
        />
        <p className="text-sm text-muted-foreground flex items-start gap-2">
          <Info className="h-4 w-4 mt-0.5" />
          Paste your knowledge here. This will be used to help your agent answer questions.
        </p>
      </div>

      {/* Knowledge Files */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-foreground">
          Knowledge files
        </Label>

        {/* Knowledge Items */}
        <div className="space-y-2">
          {knowledgeItems.map((item, index) => (
            <div key={`item-${index}`} className="flex gap-2">
              <div className="relative flex-1">
                {item.type === 'url' ? (
                  <Input
                    value={item.value}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    placeholder="Enter URL"
                    className="bg-background pr-8"
                  />
                ) : (
                  <Button
                    variant="outline"
                    className="flex-1 bg-background justify-start text-muted-foreground font-normal"
                    onClick={() => {
                      // Handle file upload
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          handleItemChange(index, file.name);
                        }
                      };
                      input.click();
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {item.value || "Upload file"}
                  </Button>
                )}
                {item.value && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => handleItemChange(index, "")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="shrink-0"
                onClick={() => handleRemoveItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* File or URL Dropdown */}
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-primary hover:text-primary"
              >
                File or URL
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAddItem('url')}>
                Add URL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddItem('file')}>
                Add File Upload
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
