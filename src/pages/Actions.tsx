import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ActionTableRow } from "@/components/ActionTableRow";
import { useNavigate } from "react-router-dom";

const actionsData = [
  {
    name: "Add customer query",
    description: "Add a customer query to the database",
    type: "Custom",
    createdAt: "Jan 15, 2025",
    lastUsed: "Feb 01, 2025",
  },
  {
    name: "Update user status",
    description: "Update the status of a user in the CRM",
    type: "Custom",
    createdAt: "Jan 20, 2025",
    lastUsed: "Never",
  },
];

const Actions = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Actions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Actions are the building blocks of your workflows. They are used to integrate with
          external APIs and services. The agents will use these actions to perform their tasks.
        </p>
      </div>

      <div className="flex justify-end">
        <Button className="gap-2" onClick={() => navigate("/app/actions/new")}>
          <Plus className="h-4 w-4" />
          New Action
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">ACTION NAME</th>
              <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">DESCRIPTION</th>
              <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">TYPE</th>
              <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">CREATED AT</th>
              <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">LAST USED</th>
              <th className="w-[48px]"></th>
            </tr>
          </thead>
          <tbody>
            {actionsData.map((action) => (
              <ActionTableRow
                key={action.name}
                {...action}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Actions;
