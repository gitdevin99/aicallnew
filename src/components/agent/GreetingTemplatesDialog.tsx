import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface Template {
  id: number;
  text: string;
  tags: string[];
  category: string;
}

const templates: Template[] = [
  {
    id: 1,
    text: "Thank you for calling [Company Name], this is [Agent Name]. How may I assist you today?",
    tags: ["professional", "formal", "customer-service"],
    category: "Customer Service"
  },
  {
    id: 2,
    text: "Hello! Welcome to [Company Name]'s virtual assistant. I'm here to help you schedule appointments and answer any questions you might have.",
    tags: ["scheduling", "friendly", "appointments"],
    category: "Appointment Booking"
  },
  {
    id: 3,
    text: "Hi there! I'm [Agent Name], your dedicated sales assistant at [Company Name]. I'd love to help you find the perfect solution for your needs.",
    tags: ["sales", "friendly", "solution-focused"],
    category: "Sales"
  },
  {
    id: 4,
    text: "Welcome to [Company Name]'s technical support. I'm [Agent Name], and I'll be helping you resolve any technical issues you're experiencing.",
    tags: ["technical", "support", "problem-solving"],
    category: "Technical Support"
  },
  {
    id: 5,
    text: "Good [Time of Day]! This is [Agent Name] from [Company Name]'s billing department. How can I assist you with your account today?",
    tags: ["billing", "formal", "account-management"],
    category: "Billing"
  },
  {
    id: 6,
    text: "Hi! I'm your AI travel assistant at [Company Name]. I can help you plan your trip, find the best deals, and answer any travel-related questions.",
    tags: ["travel", "friendly", "planning"],
    category: "Travel"
  },
  {
    id: 7,
    text: "Welcome to [Company Name]! I'm your virtual healthcare assistant. How can I help you with your healthcare needs today?",
    tags: ["healthcare", "professional", "caring"],
    category: "Healthcare"
  },
  {
    id: 8,
    text: "Hello! I'm [Agent Name], your real estate assistant. I'm here to help you find your perfect property and answer any questions about the market.",
    tags: ["real-estate", "professional", "property"],
    category: "Real Estate"
  }
];

interface GreetingTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: string) => void;
}

export function GreetingTemplatesDialog({
  open,
  onOpenChange,
  onSelectTemplate,
}: GreetingTemplatesDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique tags
  const allTags = Array.from(
    new Set(templates.flatMap((template) => template.tags))
  );

  // Filter templates based on search and tags
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => template.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-background/95 backdrop-blur-xl h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Greeting Templates
          </DialogTitle>
        </DialogHeader>

        {/* Search and Tags */}
        <div className="space-y-2 flex-shrink-0 pb-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Tag Cloud */}
          <div className="flex flex-wrap gap-0.5">
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag)}
                className="rounded-full h-6 px-2 text-[10px] font-medium"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates List */}
        <div className="flex-1 overflow-y-auto pr-4 min-h-0">
          <div className="space-y-2 pt-2">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-3 rounded-lg border border-border bg-card hover:bg-accent/50 
                  transition-all duration-200 cursor-pointer mb-2
                  hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.1)]
                  dark:hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)]"
                onClick={() => onSelectTemplate(template.text)}
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {template.category}
                  </span>
                  <div className="flex gap-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{template.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
