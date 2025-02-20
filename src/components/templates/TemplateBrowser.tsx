import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Template {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

interface TemplateBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
  title: string;
  templates: Template[];
  type: 'greeting' | 'prompt';
}

export function TemplateBrowser({
  isOpen,
  onClose,
  onSelect,
  title,
  templates,
  type
}: TemplateBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = type === 'greeting' 
    ? ['professional', 'formal', 'customer-service', 'scheduling', 'friendly', 'appointments', 'sales', 'real-estate']
    : ['sales', 'qualifying', 'outbound', 'professional', 'support', 'customer-service', 'technical'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchQuery.trim() === '' || 
                         template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => template.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl border shadow-lg w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-6">
            <div className="relative">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 px-4 transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(prev => prev.filter(t => t !== tag));
                    } else {
                      setSelectedTags(prev => [...prev, tag]);
                    }
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-4 border-t">
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              className="bg-muted/50 rounded-lg p-5 hover:bg-muted transition-all border border-border/50 hover:border-border group relative"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{template.title}</h3>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {template.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="shrink-0 transition-all"
                    onClick={() => {
                      onSelect(template.content);
                      setSearchQuery('');
                      setSelectedTags([]);
                    }}
                  >
                    Use Template
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm">{template.content}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
