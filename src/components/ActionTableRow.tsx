import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionTableRowProps {
  name: string;
  description: string;
  type: string;
  createdAt: string;
  lastUsed: string;
}

export const ActionTableRow = ({
  name,
  description,
  type,
  createdAt,
  lastUsed,
}: ActionTableRowProps) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="py-4 px-4">
        <span className="text-gray-900 dark:text-gray-100">{name}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-gray-500 dark:text-gray-400">{description}</span>
      </td>
      <td className="py-4 px-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
          {type}
        </span>
      </td>
      <td className="py-4 px-4">
        <span className="text-gray-500 dark:text-gray-400">{createdAt}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-gray-500 dark:text-gray-400">{lastUsed}</span>
      </td>
      <td className="py-4 px-4">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};
