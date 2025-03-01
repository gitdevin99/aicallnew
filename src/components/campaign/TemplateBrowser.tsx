import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

// Template categories with their associated tags
const templateTags = [
  { name: "Sales", color: "bg-blue-500" },
  { name: "Real Estate", color: "bg-green-500" },
  { name: "Healthcare", color: "bg-red-500" },
  { name: "Education", color: "bg-purple-500" },
  { name: "Technology", color: "bg-indigo-500" },
  { name: "Finance", color: "bg-yellow-500" },
  { name: "Retail", color: "bg-pink-500" },
  { name: "Hospitality", color: "bg-orange-500" },
  { name: "Automotive", color: "bg-teal-500" },
  { name: "Professional Services", color: "bg-cyan-500" },
] as const;

// Predefined templates
const templates = [
  {
    id: 1,
    title: "Sales Follow-up",
    content: "Hi {customer.name}, this is {agent.name} from {company.name}. I'm following up on our previous conversation about {product.name}. Would you have a few minutes to discuss how we can help optimize your business operations?",
    tags: ["Sales", "Professional Services"],
    useCase: "Following up with potential clients after initial contact"
  },
  {
    id: 2,
    title: "Real Estate Showing",
    content: "Hello {customer.name}, this is {agent.name} from {company.name}. I noticed you showed interest in properties in {location}. I have a beautiful property that matches your criteria. Would you like to schedule a viewing?",
    tags: ["Real Estate"],
    useCase: "Scheduling property viewings with interested buyers"
  },
  {
    id: 3,
    title: "Medical Appointment",
    content: "Hi {customer.name}, this is {agent.name} from {doctor.name}'s office. I'm calling to confirm your appointment scheduled for {appointment.date} at {appointment.time}. Would you like to keep this appointment?",
    tags: ["Healthcare"],
    useCase: "Confirming medical appointments"
  },
  {
    id: 4,
    title: "Course Enrollment",
    content: "Hello {customer.name}, this is {agent.name} from {institution.name}. I saw you expressed interest in our {course.name} program. Would you like to learn more about our upcoming enrollment period?",
    tags: ["Education"],
    useCase: "Following up with potential students"
  },
  {
    id: 5,
    title: "Tech Support",
    content: "Hi {customer.name}, this is {agent.name} from {company.name} technical support. I'm following up on ticket #{ticket.id} regarding {issue.description}. Is now a good time to discuss the solution?",
    tags: ["Technology"],
    useCase: "Technical support follow-up calls"
  },
  {
    id: 6,
    title: "Investment Advisory",
    content: "Hello {customer.name}, this is {agent.name}, your financial advisor from {company.name}. I've noticed some market changes that could affect your portfolio. Would you like to schedule a review?",
    tags: ["Finance"],
    useCase: "Portfolio review and investment advice"
  },
  {
    id: 7,
    title: "Retail Promotion",
    content: "Hi {customer.name}, this is {agent.name} from {store.name}. As a valued customer, I wanted to let you know about our exclusive {promotion.name} with savings up to {discount}%. Would you like to hear more?",
    tags: ["Retail", "Sales"],
    useCase: "Promoting retail sales and special offers"
  },
  {
    id: 8,
    title: "Hotel Booking",
    content: "Hello {customer.name}, this is {agent.name} from {hotel.name}. I'm calling about your reservation for {booking.dates}. I have a complimentary upgrade available for your stay. Would you be interested?",
    tags: ["Hospitality"],
    useCase: "Hotel reservation upselling"
  },
  {
    id: 9,
    title: "Car Service",
    content: "Hi {customer.name}, this is {agent.name} from {service.name}. Your vehicle is due for its {service.type} maintenance. Would you like to schedule an appointment?",
    tags: ["Automotive"],
    useCase: "Vehicle maintenance scheduling"
  },
  {
    id: 10,
    title: "Consulting Introduction",
    content: "Hello {customer.name}, this is {agent.name} from {company.name}. Based on our research, we've developed some strategies that could help {pain.point}. Would you be interested in a brief consultation?",
    tags: ["Professional Services", "Sales"],
    useCase: "Consulting service introduction"
  },
];

interface TemplateBrowserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: string) => void;
}

export function TemplateBrowser({
  open,
  onOpenChange,
  onSelectTemplate,
}: TemplateBrowserProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((template) => {
    const matchesTags =
      selectedTags.length === 0 ||
      template.tags.some((tag) => selectedTags.includes(tag));
    const matchesSearch =
      searchQuery === "" ||
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTags && matchesSearch;
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
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw] sm:w-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center sm:text-left">Browse Templates</DialogTitle>
        </DialogHeader>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tag Cloud */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Filter by category:</h3>
          <div className="flex flex-wrap gap-2">
            {templateTags.map((tag) => (
              <button
                key={tag.name}
                onClick={() => toggleTag(tag.name)}
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag.name)
                    ? `${tag.color} text-white`
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <ScrollArea className="h-[350px] sm:h-[400px] pr-2 sm:pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 sm:p-4 bg-card rounded-lg border hover:border-primary transition-all duration-200 flex flex-col"
                >
                  <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">{template.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{template.useCase}</p>
                  <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 sm:px-2 py-0.5 bg-muted rounded-full text-[10px] sm:text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground mb-3 sm:mb-4 line-clamp-3 flex-grow">{template.content}</p>
                  <Button
                    variant="outline"
                    className="w-full h-8 sm:h-10 text-xs sm:text-sm hover:bg-muted text-primary"
                    onClick={() => {
                      onSelectTemplate(template.content);
                      onOpenChange(false);
                    }}
                  >
                    Use Template
                  </Button>
                </div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-muted-foreground mb-2">No templates match your search criteria</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTags([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
