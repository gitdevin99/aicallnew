import { motion } from "framer-motion";
import { AgentTemplateCard } from "@/components/AgentTemplateCard";
import { Stethoscope, Hotel, UtensilsCrossed, Building2, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Templates = () => {
  const templates = [
    {
      title: "Create Your Own AI Agent",
      description: "Create your own AI agent from scratch, tailored to your business, your products, your knowledge, your goals, etc.",
      icon: <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      tags: [],
      custom: true,
    },
    {
      title: "Healthcare Practice",
      description: "This agent is professional, courteous, and focused on providing efficient assistance for scheduling and inquiries related to medical appointments.",
      icon: <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      tags: ["health-care"],
    },
    {
      title: "Hotel Concierge",
      description: "This agent is professional, courteous, and focused on providing efficient assistance for scheduling and inquiries related to hotel services.",
      icon: <Hotel className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      tags: ["hotel"],
    },
    {
      title: "Restaurant Staff",
      description: "This agent is professional, courteous, and focused on providing efficient assistance for scheduling and inquiries related to restaurant services.",
      icon: <UtensilsCrossed className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      tags: ["restaurant"],
    },
    {
      title: "Frontdesk Reception",
      description: "This agent is analytical, data-driven, and has a unique approach to solving problems, reminiscent of support services.",
      icon: <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      tags: ["support"],
    },
    {
      title: "Ecommerce Store",
      description: "This agent is professional, courteous, and focused on providing efficient assistance for scheduling and inquiries related to online shopping.",
      icon: <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      tags: ["ecommerce"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6 bg-white/10 dark:bg-gray-900/20 rounded-lg border border-gray-200/20 dark:border-gray-700/30 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agent Templates</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <AgentTemplateCard
            key={template.title}
            title={template.title}
            description={template.description}
            icon={template.icon}
            tags={template.tags}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Templates;
