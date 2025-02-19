import { Phone, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhoneNumberRowProps {
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

export const PhoneNumberRow = ({
  number,
  type,
  capabilities,
  price,
  status,
  tags = [],
  subscription,
  subscriptionEnds,
  createdAt,
  addressRequired,
  view = "buy",
}: PhoneNumberRowProps) => {
  return (
    <tr className="group relative border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 hover:-translate-y-0.5">
      {/* Neuromorphic background that only shows on hover */}
      <td className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/70 to-white/70 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-[1px] shadow-[inset_0px_0px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0px_0px_20px_rgba(255,255,255,0.02)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </td>

      <td className="relative py-4 px-4 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-900 dark:text-white font-medium">{number}</span>
        </div>
      </td>
      <td className="relative py-4 px-4 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`}>
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
