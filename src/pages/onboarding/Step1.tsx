import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot } from "lucide-react";

const messages = [
  {
    id: 1,
    content: "Welcome to CallBeast! 🎉 I'm excited to help you set up your first AI agent.",
    delay: 0,
  },
  {
    id: 2,
    content: "Thanks for signing up! Let's get started by creating your first AI agent together.",
    delay: 1,
  },
  {
    id: 3,
    content: "What would you like to name your AI agent? Choose something that reflects its purpose.",
    delay: 2,
  },
];

export default function Step1() {
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState("");
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show messages one by one
  useState(() => {
    messages.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, message.id]);
        if (index === messages.length - 1) {
          setTimeout(() => setShowInput(true), 500);
        }
      }, message.delay * 1000);
    });
  });

  const handleSubmit = () => {
    if (!agentName.trim()) return;
    
    setIsSubmitting(true);
    // Here you would typically save the agent name to your state management solution
    setTimeout(() => {
      navigate("/app/onboarding/step/2");
    }, 1000);
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

      {/* Input Area */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex gap-3">
              <Input
                placeholder="Enter agent name..."
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-gray-100"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button 
                onClick={handleSubmit}
                disabled={!agentName.trim() || isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isSubmitting ? "Saving..." : "Continue"}
              </Button>
            </div>
            
            <p className="text-sm text-gray-400">
              Press Enter to continue
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
