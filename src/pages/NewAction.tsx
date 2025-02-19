import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { X, Plus, ArrowLeft } from "lucide-react";

interface HeaderRow {
  key: string;
  value: string;
}

interface QueryParam {
  key: string;
  value: string;
}

const NewAction = () => {
  const navigate = useNavigate();
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
    navigate("/app/actions");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/app/actions")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            New Action
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create a new action to integrate with external APIs and services
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* Action Type */}
        <div className="space-y-4">
          <Label>Action Type</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div className="space-y-4">
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
        <div className="space-y-4">
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
        <div className="space-y-4">
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
        <div className="space-y-4">
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
        <div className="space-y-4">
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
        <div className="space-y-4">
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

      {/* Footer */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate("/app/actions")}>
          Cancel
        </Button>
        <Button onClick={handleCreate}>Create</Button>
      </div>
    </motion.div>
  );
};

export default NewAction;
