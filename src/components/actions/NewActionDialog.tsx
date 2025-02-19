import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";

interface NewActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface HeaderRow {
  key: string;
  value: string;
}

interface QueryParam {
  key: string;
  value: string;
}

export function NewActionDialog({ open, onOpenChange }: NewActionDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("POST");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<HeaderRow[]>([{ key: "", value: "" }]);
  const [queryParams, setQueryParams] = useState<QueryParam[]>([{ key: "", value: "" }]);

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: "", value: "" }]);
  };

  const removeQueryParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    // TODO: Implement action creation
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Action</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Action Type */}
          <div className="space-y-2">
            <Label>Action Type</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-4 cursor-pointer bg-muted/50">
                <div className="font-medium mb-1">Custom</div>
                <div className="text-sm text-muted-foreground">
                  Integrate with your own API
                </div>
              </div>
              <div className="rounded-lg border border-border p-4 cursor-not-allowed opacity-50">
                <div className="font-medium mb-1">Zapier</div>
                <div className="text-sm text-muted-foreground">Coming Soon!</div>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Add customer query"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Add a customer query to the database. Take the user's name and email and add the call the action to add the customer to the database."
              className="h-24"
            />
          </div>

          {/* Method */}
          <div className="space-y-2">
            <Label>Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url">
              URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Ex: https://www.mywebsite.com/api/user"
            />
          </div>

          {/* Headers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Headers</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addHeader}
                className="h-8 text-xs"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Row
              </Button>
            </div>
            <div className="space-y-2">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Key"
                    value={header.key}
                    onChange={(e) =>
                      setHeaders(
                        headers.map((h, i) =>
                          i === index ? { ...h, key: e.target.value } : h
                        )
                      )
                    }
                  />
                  <Input
                    placeholder="Value"
                    value={header.value}
                    onChange={(e) =>
                      setHeaders(
                        headers.map((h, i) =>
                          i === index ? { ...h, value: e.target.value } : h
                        )
                      )
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHeader(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Query Parameters */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Query Parameters</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addQueryParam}
                className="h-8 text-xs"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Row
              </Button>
            </div>
            <div className="space-y-2">
              {queryParams.map((param, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Key"
                    value={param.key}
                    onChange={(e) =>
                      setQueryParams(
                        queryParams.map((p, i) =>
                          i === index ? { ...p, key: e.target.value } : p
                        )
                      )
                    }
                  />
                  <Input
                    placeholder="Value"
                    value={param.value}
                    onChange={(e) =>
                      setQueryParams(
                        queryParams.map((p, i) =>
                          i === index ? { ...p, value: e.target.value } : p
                        )
                      )
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQueryParam(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
