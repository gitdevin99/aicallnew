import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Phone, Mail, Calendar, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Lead {
  id: string;
  phone: string;
  name: string;
  email: string;
  createdAt: string;
  calls: string;
  lastCall: string;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    phone: "+1 (555) 123-4567",
    name: "John Smith",
    email: "john.smith@example.com",
    createdAt: "2025-02-01",
    calls: "2/1/0",
    lastCall: "2025-02-09 14:30",
  },
  {
    id: "2",
    phone: "+1 (555) 234-5678",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    createdAt: "2025-02-02",
    calls: "1/2/1",
    lastCall: "2025-02-10 09:15",
  },
  {
    id: "3",
    phone: "+1 (555) 345-6789",
    name: "Michael Brown",
    email: "m.brown@example.com",
    createdAt: "2025-02-03",
    calls: "0/3/0",
    lastCall: "2025-02-10 11:45",
  },
];

export function LeadsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 10;

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const filteredLeads = mockLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
        <div className="flex items-center gap-4">
          {selectedLeads.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedLeads.length} selected
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setLeads(leads.filter(lead => !selectedLeads.includes(lead.id)));
                  setSelectedLeads([]);
                }}
                className="gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Delete Selected
              </Button>
            </div>
          )}
        </div>
        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-3">
        {currentLeads.map((lead, index) => (
          <div key={index} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">{lead.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{lead.phone}</span>
                </div>
              </div>
              <Checkbox
                checked={selectedLeads.includes(lead.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedLeads([...selectedLeads, lead.id]);
                  } else {
                    setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                  }
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>{lead.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center">
                  <span>Calls:</span>
                  <span className="text-green-500">{lead.calls.split("/")[0]}</span>
                  <span>/</span>
                  <span className="text-yellow-500">{lead.calls.split("/")[1]}</span>
                  <span>/</span>
                  <span className="text-red-500">{lead.calls.split("/")[2]}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                <span>{lead.lastCall}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={currentLeads.length > 0 && selectedLeads.length === currentLeads.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedLeads(currentLeads.map(lead => lead.id));
                    } else {
                      setSelectedLeads([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead className="font-medium">PHONE</TableHead>
              <TableHead className="font-medium">NAME</TableHead>
              <TableHead className="font-medium">EMAIL</TableHead>
              <TableHead className="font-medium">CREATED AT</TableHead>
              <TableHead className="font-medium">CALLS (P/C/F)</TableHead>
              <TableHead className="font-medium">LAST CALL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLeads.map((lead, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedLeads([...selectedLeads, lead.id]);
                      } else {
                        setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium">{lead.phone}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.createdAt}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <span className="text-green-500">{lead.calls.split("/")[0]}</span>
                    <span>/</span>
                    <span className="text-yellow-500">{lead.calls.split("/")[1]}</span>
                    <span>/</span>
                    <span className="text-red-500">{lead.calls.split("/")[2]}</span>
                  </div>
                </TableCell>
                <TableCell>{lead.lastCall}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 text-sm text-muted-foreground">
        <div className="text-center sm:text-left">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredLeads.length)} of{" "}
          {filteredLeads.length} results
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
}
