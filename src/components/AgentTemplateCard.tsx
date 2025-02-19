import { Button } from "@/components/ui/button";

interface AgentTemplateCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export const AgentTemplateCard = ({
  title,
  description,
  icon,
  tags,
}: AgentTemplateCardProps) => {
  return (
    <div className="group relative p-6 rounded-xl space-y-4 bg-white/50 dark:bg-gray-900/50 shadow-sm transition-all duration-300 hover:shadow-lg dark:shadow-gray-900/10 hover:dark:shadow-gray-900/20 backdrop-blur-[2px] hover:backdrop-blur-[4px] hover:-translate-y-0.5">
      {/* Neuromorphic background that only shows on hover */}
      <div className="absolute inset-0 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/70 to-white/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl shadow-[inset_0px_0px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0px_0px_20px_rgba(255,255,255,0.02)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      </div>
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
        </div>
      </div>
      <div className="transition-all duration-300 group-hover:translate-x-0.5">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-md bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 shadow-sm transition-all duration-300 group-hover:shadow group-hover:-translate-y-0.5 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/80"
          >
            {tag}
          </span>
        ))}
      </div>
      <Button variant="outline" className="w-full transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 bg-white/80 dark:bg-gray-900/80 hover:bg-gray-50 dark:hover:bg-gray-800/80">
        Use this Agent Template
      </Button>
    </div>
  );
};
