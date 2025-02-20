import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, LogOut } from "lucide-react";

export function UserMenu() {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logging out...");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-md hover:bg-muted"
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0">
        <div className="py-2">
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm font-normal hover:bg-muted"
            onClick={() => window.location.href = "/app/billing"}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm font-normal hover:bg-muted"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
