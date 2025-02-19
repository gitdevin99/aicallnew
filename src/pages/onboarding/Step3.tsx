import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Mic, Upload, X, Play, Square } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const messages = [
  {
    id: 1,
    content: "Now, let's make your AI agent sound unique! 🎤",
    delay: 0,
  },
  {
    id: 2,
    content: "You can either record your voice or upload an audio file. I'll use this to clone the voice for your agent.",
    delay: 1,
  },
  {
    id: 3,
    content: "For best results, please provide at least 1 minute of clear speech.",
    delay: 2,
  },
];

export default function Step3() {
  const navigate = useNavigate();
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingInterval = useRef<number>();

  // Show messages one by one
  useState(() => {
    messages.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, message.id]);
        if (index === messages.length - 1) {
          setTimeout(() => setShowOptions(true), 500);
        }
      }, message.delay * 1000);
    });
  });

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    recordingInterval.current = window.setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const removeFile = () => {
    setAudioFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (!audioFile && !recordingDuration) return;
    
    setIsProcessing(true);
    // Simulate voice cloning process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProcessingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/app/onboarding/step/4");
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="space-y-8">
      {/* Chat Messages */}
      <div className="space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            visibleMessages.includes(message.id) && (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800 rounded-lg p-4 text-gray-100">
                    {message.content}
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Voice Cloning Options */}
      <AnimatePresence>
        {showOptions && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Recording Option */}
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-100">Record Voice</h3>
                {recordingDuration > 0 && !isRecording && (
                  <span className="text-sm text-gray-400">
                    Duration: {formatDuration(recordingDuration)}
                  </span>
                )}
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`rounded-full w-16 h-16 ${
                    isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isRecording ? (
                    <Square className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </Button>
              </div>
              {isRecording && (
                <div className="flex justify-center">
                  <div className="animate-pulse text-red-500">Recording...</div>
                </div>
              )}
            </div>

            {/* Upload Option */}
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-100">Upload Audio</h3>
              {!audioFile ? (
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-700 rounded-lg">
                  <div className="text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="audio/*"
                      className="hidden"
                    />
                    <Button
                      variant="ghost"
                      onClick={() => fileInputRef.current?.click()}
                      className="space-x-2"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload Audio File</span>
                    </Button>
                    <p className="text-sm text-gray-400 mt-2">
                      Supports MP3, WAV, M4A
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <Play className="w-5 h-5 text-gray-300" />
                    <span className="text-gray-100">{audioFile.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={!audioFile && !recordingDuration}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Clone Voice
              </Button>
            </div>
          </motion.div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-gray-100">Cloning Voice...</h3>
            <Progress value={processingProgress} className="h-2" />
            <p className="text-sm text-gray-400">
              This might take a minute. We're analyzing the audio and creating a unique voice for your agent.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
