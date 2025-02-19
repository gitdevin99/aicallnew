import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mic, Upload, ArrowRight } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";

interface VoiceCloneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVoiceRecorded: (audioBlob: Blob, name: string) => void;
}

export function VoiceCloneDialog({
  open,
  onOpenChange,
  onVoiceRecorded,
}: VoiceCloneDialogProps) {
  const [step, setStep] = useState<"initial" | "recording">("initial");
  const [voiceName, setVoiceName] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-xl transition-all duration-300
        dark:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.1),_0_0.25rem_0.5rem_rgba(0,0,0,0.1)]
        shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.1)]
        dark:bg-background/80
        border border-gray-200 dark:border-gray-800/50">
        <AnimatePresence mode="wait">
          {step === "initial" ? (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voice-name" className="text-foreground font-medium">
                    Voice Name
                  </Label>
                  <Input
                    id="voice-name"
                    value={voiceName}
                    onChange={(e) => setVoiceName(e.target.value)}
                    placeholder="Ex: Professional Male Voice"
                    className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  {!voiceName.trim() && (
                    <p className="text-red-500 dark:text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Voice name is required
                    </p>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Clone Your Voice</h2>
                <p className="text-foreground/80 dark:text-muted-foreground">
                  Choose how you'd like to provide your voice sample. You can either record directly or
                  upload an audio file.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-32 space-y-2 border border-primary/20 bg-primary/5 transition-all duration-300
                    dark:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.1)]
                    shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.05)]
                    hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.1)]
                    dark:hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)]
                    hover:scale-[1.02] hover:bg-primary/10 dark:bg-primary/10"
                  onClick={() => {
                    if (!voiceName.trim()) {
                      const nameInput = document.getElementById("voice-name");
                      nameInput?.focus();
                      return;
                    }
                    setStep("recording");
                  }}
                >
                  <Mic className="h-8 w-8 text-primary" />
                  <span className="font-medium text-primary">Record Your Voice</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-32 space-y-2 border border-secondary/20 bg-secondary/5 transition-all duration-300
                    dark:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.1)]
                    shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.05)]
                    hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.1)]
                    dark:hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)]
                    hover:scale-[1.02] hover:bg-secondary/10 dark:bg-secondary/10"
                >
                  <Upload className="h-8 w-8 text-secondary dark:text-secondary" />
                  <span className="font-medium text-foreground dark:text-secondary">Upload Audio File</span>
                </Button>
              </div>

              <div className="mt-4 rounded-lg bg-blue-50 dark:bg-primary/10 p-4 text-sm text-blue-700 dark:text-primary transition-all duration-300
                border border-blue-100 dark:border-primary/20
                shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.05)]
                dark:shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.1)]">
                <p className="flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  For best results, use a high-quality microphone in a quiet environment.
                </p>
              </div>
            </motion.div>
          ) : (
            <VoiceRecorder
              voiceName={voiceName}
              onBack={() => setStep("initial")}
              onFinish={(blob) => {
                onVoiceRecorded(blob, voiceName);
                onOpenChange(false);
              }}
            />
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
