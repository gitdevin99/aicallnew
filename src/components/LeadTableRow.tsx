import { Checkbox } from "@/components/ui/checkbox";

interface LeadTableRowProps {
  phone: string;
  name: string;
  email: string;
  createdAt: string;
  callStats: {
    pending: number;
    completed: number;
    failed: number;
  };
  lastCall: string;
}

export const LeadTableRow = ({
  phone,
  name,
  email,
  createdAt,
  callStats,
  lastCall,
}: LeadTableRowProps) => {
  return (
    <tr className="group relative border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
      {/* Neuromorphic background that only shows on hover */}
      <td className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm shadow-[inset_0px_0px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0px_0px_20px_rgba(255,255,255,0.02)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </td>
      <td className="relative py-4 px-4 z-10">
        <div className="transition-transform duration-300 group-hover:scale-105">
          <Checkbox className="shadow-lg shadow-gray-500/5 dark:shadow-gray-900/5" />
        </div>
      </td>
      <td className="relative py-4 px-4 z-10">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-900 dark:text-gray-100">{phone}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-10">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-900 dark:text-gray-100">{name}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-10">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-500 dark:text-gray-400">{email}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-10">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-500 dark:text-gray-400">{createdAt}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-10">
        <div className="flex items-center gap-1 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-yellow-500">{callStats.pending}</span>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-green-500">{callStats.completed}</span>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-red-500">{callStats.failed}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-10">
        <div className="transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
          <span className="text-gray-500 dark:text-gray-400">{lastCall}</span>
        </div>
      </td>
    </tr>
  );
};
