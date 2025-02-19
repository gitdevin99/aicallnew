import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bot, Plus, Trash2 } from "lucide-react";
import { GreetingTemplatesDialog } from "./GreetingTemplatesDialog";
import { AgentPromptTemplatesDialog } from "./AgentPromptTemplatesDialog";

interface CallVariable {
  key: string;
  value: string;
}

export function BehaviourStep() {
  const [greeting, setGreeting] = useState("Hello, how can I help you today?");
  const [agentPrompt, setAgentPrompt] = useState(
    "You are a helpful assistant that can help the user with their questions. You need to collect information and book a schedule for the user."
  );
  const [callVariables, setCallVariables] = useState<CallVariable[]>([]);
  const [showGreetingTemplates, setShowGreetingTemplates] = useState(false);
  const [showAgentPromptTemplates, setShowAgentPromptTemplates] = useState(false);

  const agentPromptRef = useRef<HTMLTextAreaElement>(null);

  // Function to adjust textarea height
  const adjustTextareaHeight = () => {
    const textarea = agentPromptRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Adjust height on content change
  useEffect(() => {
    adjustTextareaHeight();
  }, [agentPrompt]);

  const handleAddVariable = () => {
    setCallVariables([...callVariables, { key: "", value: "" }]);
  };

  const handleRemoveVariable = (index: number) => {
    setCallVariables(callVariables.filter((_, i) => i !== index));
  };

  const handleVariableChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newVariables = [...callVariables];
    newVariables[index][field] = value;
    setCallVariables(newVariables);
  };

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium text-foreground">
            Greeting (Incoming)
          </Label>
          <Button
            variant="outline"
            size="sm"
            className="text-primary hover:text-primary"
            onClick={() => setShowGreetingTemplates(true)}
          >
            Browse templates
          </Button>
          <GreetingTemplatesDialog
            open={showGreetingTemplates}
            onOpenChange={setShowGreetingTemplates}
            onSelectTemplate={(template) => {
              setGreeting(template);
              setShowGreetingTemplates(false);
            }}
          />
        </div>
        <Textarea
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          placeholder="Ex: Hello, how can I help you today?"
          className="min-h-[100px] bg-background resize-none"
        />
        <p className="text-sm text-muted-foreground">
          This text will be used to greet the user when they start a conversation
          with your agent.
        </p>
      </div>

      {/* Agent Prompt Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium text-foreground">
            Agent prompt
          </Label>
          <Button
            variant="outline"
            size="sm"
            className="text-primary hover:text-primary"
            onClick={() => setShowAgentPromptTemplates(true)}
          >
            Browse templates
          </Button>
          <AgentPromptTemplatesDialog
            open={showAgentPromptTemplates}
            onOpenChange={setShowAgentPromptTemplates}
            onSelectTemplate={(template) => {
              setAgentPrompt(template);
              setShowAgentPromptTemplates(false);
            }}
          />
        </div>
        <Textarea
          ref={agentPromptRef}
          value={agentPrompt}
          onChange={(e) => {
            setAgentPrompt(e.target.value);
            adjustTextareaHeight();
          }}
          placeholder="Ex: You are a helpful assistant..."
          className="min-h-[120px] bg-background resize-none overflow-hidden"
        />
        <div className="flex items-start gap-2">
          <Bot className="h-5 w-5 text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground flex-1">
            Give more information about your agent to help it understand the user's
            context.
          </p>
        </div>
      </div>

      {/* Call Variables Section */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-foreground">
          Call variables
        </Label>
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr,1fr,auto] gap-4 text-sm font-medium text-muted-foreground">
            <div>Key</div>
            <div>Value</div>
            <div className="w-10"></div>
          </div>
          {callVariables.map((variable, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr,1fr,auto] items-center gap-4"
            >
              <Input
                value={variable.key}
                onChange={(e) =>
                  handleVariableChange(index, "key", e.target.value)
                }
                placeholder="Variable name"
                className="bg-background"
              />
              <Input
                value={variable.value}
                onChange={(e) =>
                  handleVariableChange(index, "value", e.target.value)
                }
                placeholder="Default value will be used"
                className="bg-background"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveVariable(index)}
                className="h-10 w-10 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddVariable}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
        </div>
      </div>
    </div>
  );
}
