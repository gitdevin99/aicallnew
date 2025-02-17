import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light/50 transition-all duration-300"
    >
      <div className="relative z-10">
        {theme === "dark" ? (
          <Sun size={18} className="text-gray-400 hover:text-accent-blue transition-colors" />
        ) : (
          <Moon size={18} className="text-gray-400 hover:text-accent-blue transition-colors" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-accent-green/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
