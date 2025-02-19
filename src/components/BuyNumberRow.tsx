import { Phone, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuyNumberRowProps {
  number: string;
  type: "Local" | "Toll-Free" | "Mobile";
  capabilities: {
    voice: boolean;
    sms: boolean;
  };
  addressRequired: boolean;
  price: string;
}

export const BuyNumberRow = ({
  number,
  type,
  capabilities,
  addressRequired,
  price,
}: BuyNumberRowProps) => {
  return (
    <tr className="group relative border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 hover:-translate-y-0.5">
      {/* Neuromorphic background that only shows on hover */}
      <td className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/70 to-white/70 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-[1px] shadow-[inset_0px_0px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0px_0px_20px_rgba(255,255,255,0.02)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </td>

      <td className="relative py-2 px-3 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-900 dark:text-white font-medium">{number}</span>
        </div>
      </td>
      <td className="relative py-2 px-3 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-700 dark:text-gray-300 capitalize">{type}</span>
        </div>
      </td>
      <td className="relative py-2 px-3 z-20">
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
      <td className="relative py-2 px-3 z-20">
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-hover:translate-x-0.5">
          <MapPin className="h-4 w-4" />
          <span>{addressRequired ? "Required" : "None"}</span>
        </div>
      </td>
      <td className="relative py-2 px-3 z-20">
        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-gray-900 dark:text-white font-medium">{price}</span>
        </div>
      </td>
      <td className="relative py-2 px-3 z-20">
        <div className="flex justify-end transition-transform duration-300 group-hover:translate-x-0.5">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
          >
            Buy
          </Button>
        </div>
      </td>
    </tr>
  );
};
