import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-toggle-button relative p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md border border-gray-200 dark:border-gray-700"
            aria-label="Toggle theme"
          >
            <div className="relative z-10">
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-500 transition-colors" />
              ) : (
                <Moon size={20} className="text-blue-600 transition-colors" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
