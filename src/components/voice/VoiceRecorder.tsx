import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  voiceName: string;
  onBack: () => void;
  onFinish: (blob: Blob) => void;
}

const sampleScript = `Hello! I'm excited to create my AI voice clone. This recording will help establish my unique voice pattern and characteristics.`;

export function VoiceRecorder({ voiceName, onBack, onFinish }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let startTime: number;
    
    const updateDuration = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      setDuration(Math.min(elapsed / 1000, 30));
      
      if (elapsed < 30000 && isRecording) {
        animationFrameRef.current = requestAnimationFrame(updateDuration);
      } else if (isRecording) {
        handleStopRecording();
      }
    };

    if (isRecording) {
      startTime = performance.now();
      animationFrameRef.current = requestAnimationFrame(updateDuration);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRestart = () => {
    setAudioBlob(null);
    setDuration(0);
    handleStartRecording();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Create Voice Clone</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Waveform Visualization */}
      <div className="relative h-24 rounded-lg bg-gray-50 dark:bg-muted/50 overflow-hidden transition-all duration-300
        border border-gray-100 dark:border-gray-800/50
        shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.05)]
        dark:shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.1)]">
        <div className="absolute inset-0 flex items-center justify-center">
          {isRecording && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex gap-1"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-primary"
                  animate={{
                    height: [20, 40, 20],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Recording Timer and Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: isRecording ? 1 : 0.5 }}
              className="h-2 w-2 rounded-full bg-red-500"
            />
            <span className="text-muted-foreground">
              {Math.floor(duration)}:
              {String(Math.floor((duration % 1) * 100)).padStart(2, "0")} / 0:30
            </span>
          </div>
        </div>
        <div className="h-1 rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{
              width: `${(duration / 30) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Script */}
      <div className="rounded-lg bg-gray-50 dark:bg-muted/50 p-4 transition-all duration-300
        border border-gray-100 dark:border-gray-800/50
        shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.05)]
        dark:shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2 text-sm text-primary mb-2">
          <span>💡</span>
          <span>Read this script for best results</span>
        </div>
        <p className="text-muted-foreground">{sampleScript}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={handleRestart}
          className="gap-2 border border-green-500/20 bg-green-50 dark:bg-green-500/5 text-green-500 transition-all duration-300
            shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.05)]
            dark:shadow-[0_0.25rem_0.5rem_rgba(0,0,0,0.1)]
            hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.1)]
            dark:hover:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)]
            hover:scale-[1.02] hover:bg-green-100 dark:hover:bg-green-500/10"
          disabled={isRecording}
        >
          <RefreshCcw className="h-4 w-4" />
          Restart
        </Button>

        <Button
          size="lg"
          onClick={() => {
            if (isRecording) {
              handleStopRecording();
            } else if (audioBlob) {
              onFinish(audioBlob);
            } else {
              handleStartRecording();
            }
          }}
          className={cn(
            "gap-2 min-w-[120px]",
            isRecording
              ? "bg-destructive hover:bg-destructive/90"
              : audioBlob
              ? "bg-green-500 hover:bg-green-600"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          {isRecording ? "Stop" : audioBlob ? "Finish" : "Start"}
        </Button>
      </div>
    </motion.div>
  );
}
