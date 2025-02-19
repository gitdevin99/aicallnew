import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ActionsStep() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-foreground">Actions Step</h2>
        <p className="text-muted-foreground">
          Configure the actions your agent can perform. Actions are the building blocks that enable your agent to interact with external systems and perform specific tasks.
        </p>
      </div>

      <div className="flex justify-start">
        <Button variant="default" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Action
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card/50 p-6">
        <div className="text-center text-muted-foreground">
          No actions configured yet. Click &quot;Create Action&quot; to add your first action.
        </div>
      </div>
    </div>
  );
}
