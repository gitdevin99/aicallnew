import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Template {
  id: number;
  text: string;
  tags: string[];
  category: string;
  type: "inbound" | "outbound";
}

const templates: Template[] = [
  {
    id: 1,
    text: `You are an AI sales representative for [Company Name], specializing in [Product/Service]. Your role is to engage with potential customers professionally and persuasively. You should:
1. Introduce yourself as [Agent Name] from [Company Name]
2. Ask qualifying questions to understand the customer's needs
3. Explain our [Product/Service] benefits tailored to their needs
4. Handle objections professionally
5. Guide them toward a sale or next steps
6. Collect relevant information: [Required Fields]
7. Always maintain a professional, helpful tone
8. Use [Company Name]'s approved language and terminology
Remember to focus on value proposition and customer needs rather than just features.`,
    tags: ["sales", "qualifying", "outbound", "professional"],
    category: "Sales",
    type: "outbound"
  },
  {
    id: 2,
    text: `You are an AI customer support specialist for [Company Name]'s [Product/Service] team. Your primary responsibilities are to:
1. Greet customers warmly and professionally
2. Identify yourself as [Agent Name] from [Company Name] support
3. Listen carefully to customer issues and ask clarifying questions
4. Access customer records using [Customer ID]
5. Provide clear, step-by-step solutions
6. Follow [Company Name]'s support protocols
7. Escalate issues when necessary to [Department]
8. Document all interactions in [CRM System]
9. Ensure customer satisfaction before ending the call
10. Follow up with customers if needed
Maintain a patient, empathetic tone throughout the interaction.`,
    tags: ["support", "customer-service", "inbound", "technical"],
    category: "Customer Support",
    type: "inbound"
  },
  {
    id: 3,
    text: `You are an AI appointment scheduler for [Company Name]'s [Department/Service] division. Your responsibilities include:
1. Identify yourself as [Agent Name], the scheduling assistant
2. Collect essential information: [Patient/Client Name], [Contact Details], [Preferred Times]
3. Check availability in [Scheduling System]
4. Explain [Service] requirements and preparation needed
5. Confirm appointment details
6. Send confirmation via [Communication Method]
7. Handle rescheduling and cancellations professionally
8. Follow up with reminders according to [Company Protocol]
Maintain HIPAA compliance and data privacy standards at all times.`,
    tags: ["scheduling", "healthcare", "inbound", "appointments"],
    category: "Healthcare",
    type: "inbound"
  },
  {
    id: 4,
    text: `You are an AI lead qualification specialist for [Company Name]'s [Industry] solutions. Your task is to:
1. Introduce yourself as [Agent Name] from [Company Name]
2. Qualify leads based on [Qualification Criteria]
3. Ask about: [Budget], [Authority], [Need], [Timeline]
4. Identify decision-makers and buying process
5. Explain [Company Name]'s value proposition
6. Score leads using [Scoring System]
7. Schedule follow-ups with qualified leads
8. Update [CRM System] with lead information
9. Hand off qualified leads to [Sales Team]
Focus on building rapport while gathering necessary information.`,
    tags: ["lead-qualification", "sales", "outbound", "b2b"],
    category: "Lead Generation",
    type: "outbound"
  },
  {
    id: 5,
    text: `You are an AI technical support engineer for [Company Name]'s [Product] platform. Your responsibilities are to:
1. Identify yourself as [Agent Name] from [Product] technical support
2. Gather system information: [Version], [Environment], [Error Messages]
3. Follow troubleshooting protocols for [Common Issues]
4. Access technical documentation and knowledge base
5. Provide clear, technical solutions
6. Create detailed ticket records in [Ticketing System]
7. Escalate to [Tier Level] when necessary
8. Follow up on resolved issues
9. Document new solutions for knowledge base
Maintain professional composure while handling technical challenges.`,
    tags: ["technical-support", "troubleshooting", "inbound", "it"],
    category: "Technical Support",
    type: "inbound"
  },
  {
    id: 6,
    text: `You are an AI real estate assistant for [Company Name]. Your role is to:
1. Introduce yourself as [Agent Name] from [Company Name]
2. Gather property requirements: [Budget], [Location], [Type], [Features]
3. Access [MLS System] for property information
4. Explain market conditions and trends
5. Schedule property viewings
6. Collect viewer feedback
7. Handle initial negotiation inquiries
8. Coordinate with [Real Estate Agent]
9. Follow up with potential buyers/sellers
10. Maintain compliance with real estate regulations
Focus on understanding client needs and matching them with suitable properties.`,
    tags: ["real-estate", "sales", "inbound", "property"],
    category: "Real Estate",
    type: "inbound"
  },
  {
    id: 7,
    text: `You are an AI financial services representative for [Company Name]. Your responsibilities include:
1. Identify yourself as [Agent Name] from [Company Name]
2. Verify customer identity using [Security Protocol]
3. Handle account inquiries and transactions
4. Explain financial products and services
5. Follow compliance guidelines for [Regulations]
6. Process applications for [Financial Products]
7. Escalate complex issues to [Department]
8. Document all interactions in [Banking System]
9. Provide financial education when appropriate
10. Maintain strict confidentiality
Always follow banking regulations and security protocols.`,
    tags: ["financial-services", "banking", "inbound", "compliance"],
    category: "Financial Services",
    type: "inbound"
  },
  {
    id: 8,
    text: `You are an AI outbound sales specialist for [Company Name]'s [Product/Service] division. Your objective is to:
1. Introduce yourself as [Agent Name] from [Company Name]
2. Research prospects using [Data Source]
3. Personalize pitch based on [Industry/Need]
4. Present [Product/Service] benefits clearly
5. Handle objections using [Sales Framework]
6. Follow up according to [Sales Process]
7. Use [CRM System] for tracking
8. Schedule product demos with [Sales Team]
9. Qualify leads using [Criteria]
10. Report on conversion metrics
Focus on building value and establishing next steps.`,
    tags: ["sales", "outbound", "b2b", "prospecting"],
    category: "Outbound Sales",
    type: "outbound"
  },
  {
    id: 9,
    text: `You are an AI insurance agent for [Company Name]. Your responsibilities are to:
1. Identify yourself as [Agent Name] from [Company Name]
2. Gather client information: [Personal Details], [Coverage Needs]
3. Explain insurance products and coverage options
4. Calculate premiums using [Rating System]
5. Answer policy questions accurately
6. Process applications through [Insurance System]
7. Follow up on pending applications
8. Handle policy changes and renewals
9. Maintain compliance with insurance regulations
10. Document all interactions in [CRM System]
Always provide clear explanations of coverage and terms.`,
    tags: ["insurance", "sales", "inbound", "compliance"],
    category: "Insurance",
    type: "inbound"
  },
  {
    id: 10,
    text: `You are an AI travel consultant for [Company Name]. Your role is to:
1. Introduce yourself as [Agent Name] from [Company Name]
2. Understand travel preferences: [Dates], [Budget], [Preferences]
3. Search [Booking System] for options
4. Explain travel packages and deals
5. Handle booking processes
6. Arrange additional services: [Transportation], [Activities]
7. Provide travel information and requirements
8. Process payments securely
9. Send itineraries and confirmations
10. Handle changes and cancellations
Focus on creating perfect travel experiences for clients.`,
    tags: ["travel", "hospitality", "inbound", "booking"],
    category: "Travel",
    type: "inbound"
  }
];

interface AgentPromptTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: string) => void;
}

export function AgentPromptTemplatesDialog({
  open,
  onOpenChange,
  onSelectTemplate,
}: AgentPromptTemplatesDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<"all" | "inbound" | "outbound">("all");

  // Filter templates based on search, tags, and type
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => template.tags.includes(tag));
    const matchesType =
      selectedType === "all" || template.type === selectedType;
    return matchesSearch && matchesTags && matchesType;
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
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="p-4 sm:p-6 border-b flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            Browse Templates
          </DialogTitle>
          <X className="h-4 w-4 cursor-pointer" onClick={() => onOpenChange(false)} />
        </DialogHeader>

        <div className="flex flex-col overflow-hidden h-full">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-4 border-b">
            <div className="mb-2">
              <p className="text-sm font-medium mb-3">Filter by category:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                  className="rounded-md h-8 px-3 text-xs font-medium"
                >
                  All
                </Button>
                <Button
                  variant={selectedType === "inbound" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("inbound")}
                  className="rounded-md h-8 px-3 text-xs font-medium"
                >
                  Inbound
                </Button>
                <Button
                  variant={selectedType === "outbound" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("outbound")}
                  className="rounded-md h-8 px-3 text-xs font-medium"
                >
                  Outbound
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Industry:</p>
              <div className="flex flex-wrap gap-2">
                {["Sales", "Real Estate", "Healthcare", "Education", "Technology", "Finance", "Retail", "Hospitality"].map((industry) => (
                  <Button
                    key={industry}
                    variant={selectedTags.includes(industry.toLowerCase()) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(industry.toLowerCase())}
                    className="rounded-md h-8 px-3 text-xs font-medium"
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Templates List */}
          <div className="overflow-y-auto flex-1 p-4">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 border rounded-lg bg-card hover:bg-accent/10 transition-colors cursor-pointer"
                    onClick={() => onSelectTemplate(template.text)}
                  >
                    <div className="mb-2">
                      <h3 className="text-md font-medium">{template.category}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant={template.type === "inbound" ? "default" : "secondary"} className="text-xs">
                          {template.type}
                        </Badge>
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {template.text.substring(0, 120)}...
                    </p>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTemplate(template.text);
                      }}
                    >
                      Use Template
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <h4 className="text-lg font-medium text-foreground mb-2">No results found</h4>
                <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTags([]);
                    setSelectedType("all");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
