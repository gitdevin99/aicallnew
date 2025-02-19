import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const messages = [
  {
    id: 1,
    content: "Great! Now let's choose a voice for your AI agent. 🎙️",
    delay: 0,
  },
  {
    id: 2,
    content: "I have several voice options available. You can preview each one before making your choice.",
    delay: 1,
  },
];

const voices = [
  {
    id: "voice-1",
    name: "James",
    description: "Professional male voice with a British accent",
    preview: "/audio/james-preview.mp3",
  },
  {
    id: "voice-2",
    name: "Sarah",
    description: "Friendly female voice with an American accent",
    preview: "/audio/sarah-preview.mp3",
  },
  {
    id: "voice-3",
    name: "Alex",
    description: "Neutral voice with a balanced tone",
    preview: "/audio/alex-preview.mp3",
  },
];

export default function Step2() {
  const navigate = useNavigate();
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = () => {
    if (!selectedVoice) return;
    
    setIsSubmitting(true);
    // Here you would typically save the voice selection to your state management solution
    setTimeout(() => {
      navigate("/app/onboarding/step/3");
    }, 1000);
  };

  const playPreview = (voiceId: string) => {
    // Here you would implement voice preview functionality
    console.log("Playing preview for voice:", voiceId);
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

      {/* Voice Selection */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <RadioGroup
              value={selectedVoice}
              onValueChange={setSelectedVoice}
              className="space-y-4"
            >
              {voices.map((voice) => (
                <div
                  key={voice.id}
                  className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4"
                >
                  <RadioGroupItem value={voice.id} id={voice.id} />
                  <div className="flex-1">
                    <Label htmlFor={voice.id} className="text-gray-100 font-medium">
                      {voice.name}
                    </Label>
                    <p className="text-sm text-gray-400">{voice.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => playPreview(voice.id)}
                    className="border-gray-700 hover:bg-gray-700"
                  >
                    Preview
                  </Button>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={!selectedVoice || isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isSubmitting ? "Saving..." : "Continue"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
