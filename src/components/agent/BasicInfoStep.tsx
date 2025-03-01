import { useState } from "react";
import { VoiceCloneDialog } from "../voice/VoiceCloneDialog";
import { motion } from "framer-motion";
import { AlertCircle, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const toneOptions = [
  { id: "professional", label: "Professional", description: "Formal and business-like communication" },
  { id: "casual", label: "Casual", description: "Friendly and conversational" },
  { id: "talkative", label: "Talkative", description: "Engaging and chatty" },
];

const voiceOptions = [
  "Christopher",
  "Emma",
  "Matthew",
  "Olivia",
  "James",
  "Sophie",
];

export function BasicInfoStep() {
  const [voiceCloneOpen, setVoiceCloneOpen] = useState(false);
  const [name, setName] = useState("");
  const [voice, setVoice] = useState("");
  const [tone, setTone] = useState("");

  return (
    <div className="space-y-8">
      {/* Agent Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">
          Agent Name
        </Label>
        <div className="relative">
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: John Doe"
            className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary"
          />
          {!name && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 flex items-center gap-1 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Name is required</span>
            </div>
          )}
        </div>
      </div>

      {/* Voice Selection */}
      <div className="space-y-2">
        <Label htmlFor="voice" className="text-foreground">
          Voice
        </Label>
        <div className="flex gap-4">
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger className="w-[200px] bg-muted/50 border-input text-foreground">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent className="bg-background border-input">
              {voiceOptions.map((v) => (
                <SelectItem key={v} value={v} className="text-foreground hover:bg-muted">
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2 border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
            onClick={() => setVoiceCloneOpen(true)}
          >
            <Mic className="w-4 h-4" />
            Clone Voice
          </Button>

          <VoiceCloneDialog
            open={voiceCloneOpen}
            onOpenChange={setVoiceCloneOpen}
            onVoiceRecorded={(blob, name) => {
              console.log('Voice recorded:', { blob, name });
              setVoice(name);
              // TODO: Handle the recorded voice blob
            }}
          />
        </div>
      </div>

      {/* Tone Selection */}
      <div className="space-y-4">
        <Label className="text-foreground">Tone</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {toneOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setTone(option.id)}
              className={`relative p-3 sm:p-4 rounded-lg border transition-all duration-300 text-left ${
                tone === option.id
                  ? "border-primary bg-primary/10"
                  : "border-input bg-muted/50 hover:bg-muted"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tone === option.id && (
                <motion.div
                  layoutId="selectedTone"
                  className="absolute inset-0 bg-primary/5 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10">
                <div className="font-medium text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">{option.label}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{option.description}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
