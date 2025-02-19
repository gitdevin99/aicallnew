import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ManageNumberRowProps {
  number: string;
  status: "active" | "inactive";
  type: "Local" | "Toll-Free" | "Mobile";
  capabilities: {
    voice: boolean;
    sms: boolean;
  };
  tags: string[];
  subscription: "Monthly" | "Yearly";
  subscriptionEnds: string;
  price: string;
  createdAt: string;
}

export const ManageNumberRow = ({
  number,
  status,
  type,
  capabilities,
  tags,
  subscription,
  subscriptionEnds,
  price,
  createdAt,
}: ManageNumberRowProps) => {
  return (
    <tr className="group relative border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
      {/* Row highlight effect */}
      <td className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/70 to-white/70 dark:from-gray-800/70 dark:to-gray-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </td>


      {/* Phone Number */}
      <td className="relative py-4 px-5 z-20 w-[200px]">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-900 dark:text-white font-medium block truncate">{number}</span>
        </div>
      </td>

      {/* Status */}
      <td className="relative py-4 px-5 z-20 w-[100px]">
        <div className="flex justify-center transition-transform duration-300 group-hover:translate-x-0.5">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
          }`}>
            {status}
          </span>
        </div>
      </td>

      {/* Type */}
      <td className="relative py-4 px-5 z-20 w-[120px]">
        <div className="flex justify-center transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-700 dark:text-gray-300 capitalize">{type}</span>
        </div>
      </td>

      {/* Capabilities */}
      <td className="relative py-4 px-5 z-20 w-[180px]">
        <div className="flex items-center justify-center gap-3 transition-transform duration-300 group-hover:translate-x-0.5">
          {capabilities.voice && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Voice</span>
            </div>
          )}
          {capabilities.sms && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">SMS</span>
            </div>
          )}
        </div>
      </td>

      {/* Tags */}
      <td className="relative py-4 px-5 z-20 w-[200px]">
        <div className="flex flex-wrap gap-1.5 max-w-full transition-transform duration-300 group-hover:translate-x-0.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 text-xs rounded-md bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 shadow-sm transition-all duration-300 group-hover:shadow group-hover:-translate-y-0.5 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/80 truncate max-w-[100px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>

      {/* Subscription */}
      <td className="relative py-4 px-5 z-20 w-[150px]">
        <div className="flex justify-center transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-700 dark:text-gray-300 truncate">{subscription}</span>
        </div>
      </td>

      {/* Subscription Ends */}
      <td className="relative py-4 px-5 z-20 w-[180px]">
        <div className="flex justify-center transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-700 dark:text-gray-300 truncate">{subscriptionEnds}</span>
        </div>
      </td>

      {/* Price */}
      <td className="relative py-4 px-5 z-20 w-[120px]">
        <div className="flex justify-end transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-900 dark:text-white font-medium truncate">{price}</span>
        </div>
      </td>

      {/* Created At */}
      <td className="relative py-4 px-5 z-20 w-[180px]">
        <div className="flex justify-center transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-700 dark:text-gray-300 truncate">{createdAt}</span>
        </div>
      </td>

      {/* Actions */}
      <td className="relative py-4 px-5 z-20 w-[120px]">
        <div className="flex justify-end transition-transform duration-300 group-hover:translate-x-0.5">
          <Button 
            size="sm" 
            variant="outline"
            className="bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 w-full"
          >
            Manage
          </Button>
        </div>
      </td>

      <td className="relative py-4 px-4 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-900 dark:text-white font-medium">{number}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
          }`}>
            {status}
          </span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-700 dark:text-gray-300 capitalize">{type}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-0.5">
          {capabilities.voice && (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Voice</span>
            </div>
          )}
          {capabilities.sms && (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">SMS</span>
            </div>
          )}
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="flex flex-wrap gap-1 transition-transform duration-300 group-hover:translate-x-0.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 shadow-sm transition-all duration-300 group-hover:shadow group-hover:-translate-y-0.5 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-700 dark:text-gray-300">{subscription}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-700 dark:text-gray-300">{subscriptionEnds}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-900 dark:text-white font-medium">{price}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-700 dark:text-gray-300">{createdAt}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="flex justify-end transition-transform duration-300 group-hover:translate-x-0.5">
          <Button 
            size="sm" 
            variant="outline"
            className="bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5"
          >
            Manage
          </Button>
        </div>
      </td>
    </tr>
  );
};
