import { useState, useRef, useEffect } from "react";
import { TemplateBrowser } from "@/components/templates/TemplateBrowser";
import { greetingTemplates, promptTemplates } from "@/data/templates";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Flag from "react-world-flags";
import { Pencil, Check, X, Bot, Mic, Upload, Play, Square, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  type: 'bot' | 'input';
  content: string;
  inputType?: 'text' | 'voice' | 'radio' | 'textarea';
  options?: {
    id: string;
    name: string;
    description: string;
  }[];
}

const languages = [
  {
    id: "en",
    name: "English",
    description: "English (US/UK)",
    flag: "US"
  },
  {
    id: "es",
    name: "Spanish",
    description: "Español (Latin America/Spain)",
    flag: "ES"
  },
  {
    id: "fr",
    name: "French",
    description: "Français",
    flag: "FR"
  },
  {
    id: "de",
    name: "German",
    description: "Deutsch",
    flag: "DE"
  },
  {
    id: "it",
    name: "Italian",
    description: "Italiano",
    flag: "IT"
  },
  {
    id: "pt",
    name: "Portuguese",
    description: "Português (Brazil/Portugal)",
    flag: "PT"
  },
  {
    id: "nl",
    name: "Dutch",
    description: "Nederlands",
    flag: "NL"
  },
  {
    id: "pl",
    name: "Polish",
    description: "Polski",
    flag: "PL"
  },
  {
    id: "ru",
    name: "Russian",
    description: "Русский",
    flag: "RU"
  },
  {
    id: "ja",
    name: "Japanese",
    description: "日本語",
    flag: "JP"
  },
  {
    id: "ko",
    name: "Korean",
    description: "한국어",
    flag: "KR"
  },
  {
    id: "zh",
    name: "Chinese",
    description: "中文 (Simplified/Traditional)",
    flag: "CN"
  },
];

const voices = [
  {
    id: "voice-1",
    name: "James",
    description: "Professional male voice with a British accent",
  },
  {
    id: "voice-2",
    name: "Sarah",
    description: "Friendly female voice with an American accent",
  },
  {
    id: "voice-3",
    name: "Alex",
    description: "Neutral voice with a balanced tone",
  },
];

export default function AgentCreation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [editingMessage, setEditingMessage] = useState<number | null>(null);
  const [showGreetingTemplates, setShowGreetingTemplates] = useState(false);
  const [showPromptTemplates, setShowPromptTemplates] = useState(false);

  const [agentData, setAgentData] = useState({
    name: "",
    language: "",
    voice: "",
    greeting: "",
    prompt: "",
    knowledgeBase: {
      files: [] as File[],
      texts: [] as string[],
      urls: [] as string[]
    },
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isAgentCreated, setIsAgentCreated] = useState(false);
  const [isKnowledgeBaseSaved, setIsKnowledgeBaseSaved] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voiceName, setVoiceName] = useState('');
  const [showRecordingInterface, setShowRecordingInterface] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const knowledgeBaseSectionRef = useRef<HTMLDivElement>(null);
  const recordingInterval = useRef<number>();

  // Scroll to knowledge base section when prompt is saved
  useEffect(() => {
    if (agentData.prompt && knowledgeBaseSectionRef.current) {
      knowledgeBaseSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [agentData.prompt]);

  // Recording timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecordingStarted && recordingTime < 30) {
      timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (recordingTime >= 30) {
      setIsRecordingStarted(false);
      setRecordingTime(0);
    }
    return () => clearInterval(timer);
  }, [isRecordingStarted, recordingTime]);

  const messages: Message[] = [
    // Welcome message

    {
      id: 1,
      type: 'bot',
      content: "Welcome to CallBeast! 🎉 I'm excited to help you set up your first AI agent."
    },
    {
      id: 2,
      type: 'bot',
      content: "Let's get started! First, what would you like to name your AI agent?"
    },
    {
      id: 3,
      type: 'input',
      content: '',
      inputType: 'text'
    },
    {
      id: 4,
      type: 'bot',
      content: "Great! Now, let's select a primary language for your agent."
    },
    {
      id: 5,
      type: 'input',
      content: '',
      inputType: 'radio',
      options: languages
    },
    {
      id: 6,
      type: 'bot',
      content: "Perfect! Now, let's choose a voice for your agent."
    },
    {
      id: 7,
      type: 'input',
      content: '',
      inputType: 'radio',
      options: voices
    },
    {
      id: 8,
      type: 'bot',
      content: "Perfect! What greeting should your agent use when connecting with a caller?"
    },
    {
      id: 9,
      type: 'input',
      content: '',
      inputType: 'textarea',
      showTemplates: true,
      templateType: 'greeting'
    },
    {
      id: 10,
      type: 'bot',
      content: "Almost done! Finally, let's define your agent's behavior and tone. What should their primary role be?"
    },
    {
      id: 11,
      type: 'input',
      content: '',
      inputType: 'textarea',
      showTemplates: true,
      templateType: 'prompt'
    },
    {
      id: 12,
      type: 'bot',
      content: "Great! Now let's add some knowledge to your agent. You can upload files, add text, or provide URLs."
    },
    {
      id: 13,
      type: 'input',
      inputType: 'knowledge',
      content: ''
    },
    {
      id: 14,
      type: 'bot',
      content: "Perfect! I've saved your knowledge base. Are you ready to create your AI agent?"
    },
    {
      id: 15,
      type: 'input',
      content: '',
      inputType: 'radio',
      options: [
        {
          id: 'yes',
          name: 'Yes, create my AI agent',
          description: 'Proceed with creating your AI agent'
        },
        {
          id: 'no',
          name: 'No, I need to make changes',
          description: 'Go back to edit the knowledge base'
        }
      ]
    },
    {
      id: 15,
      type: 'input',
      content: '',
      inputType: 'radio',
      options: [
        {
          id: 'ready',
          name: "Yes, let's create my agent!",
          description: 'Create your AI agent with the current configuration'
        },
        {
          id: 'review',
          name: 'Review my settings first',
          description: 'Go back and review the knowledge base'
        }
      ]
    },
    {
      id: 16,
      type: 'bot',
      content: "🔨 Creating your AI agent..."
    },
    {
      id: 17,
      type: 'bot',
      content: "✨ Success! Your AI agent has been created and is ready to start handling calls!"
    },
    {
      id: 18,
      type: 'bot',
      content: "What would you like to do next?"
    },
    {
      id: 19,
      type: 'input',
      content: '',
      inputType: 'radio',
      options: [
        {
          id: 'test',
          name: 'Test Your Agent Now',
          description: 'Make a test call to try out your new AI agent'
        },
        {
          id: 'dashboard',
          name: 'Visit Dashboard',
          description: 'Go to dashboard for more advanced customization'
        }
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  useEffect(() => {
    // Show initial messages
    setTimeout(() => {
      setVisibleMessages([1]);
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, 2, 3]);
      }, 1000);
    }, 500);
  }, []);

  const showNextMessage = () => {
    if (currentStep < messages.length - 1) {
      // Show next bot message and its corresponding input
      const nextBotMessage = messages[currentStep];
      const nextInputMessage = messages[currentStep + 1];
      
      setVisibleMessages(prev => [...prev, nextBotMessage.id, nextInputMessage.id]);
      setCurrentStep(prev => prev + 2);
    } else {
      // All steps completed
      finishSetup();
    }
  };

  const handleTextInput = (value: string) => {
    if (!value.trim()) return;
    
    // Clear editing state
    setEditingMessage(null);
    
    // Find the current input message (the one without a negative ID)
    const currentMessage = messages.find(m => 
      m.type === 'input' && 
      visibleMessages.includes(m.id) && 
      !visibleMessages.includes(-m.id)
    );
    
    if (!currentMessage) return;
    
    if (currentMessage.id === 3) {
      setAgentData(prev => ({ ...prev, name: value }));
    } else if (currentMessage.id === 7) {
      setAgentData(prev => ({ ...prev, greeting: value }));
    } else if (currentMessage.id === 9) {
      setAgentData(prev => ({ ...prev, prompt: value }));
    }
    
    // Show user's response
    setVisibleMessages(prev => [...prev, -currentMessage.id]); // Negative ID for user messages
    
    // Show next bot message and input after a delay
    setTimeout(() => {
      const nextBotMessageId = currentMessage.id + 1;
      const nextInputId = currentMessage.id + 2;
      setVisibleMessages(prev => [...prev, nextBotMessageId, nextInputId]);
    }, 1000);
  };



  const handleVoiceSelection = (value: string) => {
    // Find the current input message
    const currentMessage = messages.find(m => 
      m.type === 'input' && 
      visibleMessages.includes(m.id) && 
      !visibleMessages.includes(-m.id)
    );
    
    if (!currentMessage) return;

    // Update state based on the current step
    if (currentMessage.id === 5) {
      setAgentData(prev => ({ ...prev, language: value }));
    } else if (currentMessage.id === 7) {
      setAgentData(prev => ({ ...prev, voice: value }));
    } else if (currentMessage.id === 15) {
      if (value === 'yes') {
        // Show user's choice and start creating
        setVisibleMessages(prev => [...prev, -currentMessage.id, 16]);
        setIsProcessing(true);
        // Simulate API call
        (async () => {
          for (let i = 0; i <= 100; i += 10) {
            setProcessingProgress(i);
            await new Promise(resolve => setTimeout(resolve, 200));
          }
          setIsProcessing(false);
          setIsAgentCreated(true);
          // Show success message and next steps
          setVisibleMessages(prev => [...prev, 17, 18, 19]);
        })();
        return;
      } else if (value === 'no') {
        // Go back to edit knowledge base
        setIsKnowledgeBaseSaved(false);
        setIsAgentCreated(false);
        setEditingMessage(13);
        // Remove the confirmation messages
        setVisibleMessages(prev => 
          prev.filter(id => id !== -15 && id !== 14)
        );
        return;
      }
    } else if (currentMessage.id === 19) {
      if (value === 'test') {
        navigate('/app/call');
      } else if (value === 'dashboard') {
        navigate('/app');
      }
      return;
    }
    
    // Show user's response
    setVisibleMessages(prev => [...prev, -currentMessage.id]);
    
    // Show next bot message and input after a delay
    setTimeout(() => {
      const nextBotMessageId = currentMessage.id + 1;
      const nextInputId = currentMessage.id + 2;
      setVisibleMessages(prev => [...prev, nextBotMessageId, nextInputId]);
    }, 1000);
  };

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
    showNextMessage();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      showNextMessage();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const finishSetup = () => {
    setIsProcessing(true);
    // Simulate processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProcessingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/app/campaigns");
        }, 500);
      }
    }, 200);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-8">
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
                  className={`flex items-start gap-3 ${message.type === 'input' ? 'justify-end' : ''}`}
                >
                {/* Bot Message */}
                {message.type === 'bot' && (
                  <>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-gray-900 dark:text-gray-100 inline-block">
                        {message.content}
                      </div>
                    </div>
                  </>
                )}

                {/* User Message */}
                {visibleMessages.includes(-message.id) && message.type === 'input' && (
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 max-w-[80%] text-right">
                      <div className="group relative bg-blue-500 dark:bg-blue-900 rounded-lg p-4 text-white inline-block">
                        <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            onClick={() => {
                              // Set the message as being edited
                              setEditingMessage(message.id);
                              // Remove the user response to show input again
                              setVisibleMessages(prev => prev.filter(id => id !== -message.id));
                              // Reset knowledge base saved state if editing knowledge base
                              if (message.id === 13) {
                                setIsKnowledgeBaseSaved(false);
                              }
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                        {message.id === 3 && agentData.name}
                        {message.id === 5 && (
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700/50 rounded-lg p-1">
                            <Flag code={languages.find(l => l.id === agentData.language)?.flag} className="w-full h-full object-cover rounded" />
                          </div>
                        )}
                        {message.id === 7 && voices.find(v => v.id === agentData.voice)?.name}
                        {message.id === 9 && agentData.greeting}
                        {message.id === 11 && agentData.prompt}
                        {message.id === 13 && (
                          <div className="space-y-3 text-left">
                            {agentData.knowledgeBase.files.length > 0 && (
                              <div>
                                <div className="font-medium mb-1">Files:</div>
                                <div className="text-sm bg-blue-100 dark:bg-gray-700/50 rounded-md p-2 text-gray-800 dark:text-gray-100">
                                  {agentData.knowledgeBase.files.map(file => file.name).join(", ")}
                                </div>
                              </div>
                            )}
                            {agentData.knowledgeBase.texts.map((text, index) => (
                              <div key={index}>
                                <div className="font-medium mb-1">Text:</div>
                                <div className="text-sm bg-blue-100 dark:bg-gray-700/50 rounded-md p-2 whitespace-pre-wrap text-gray-800 dark:text-gray-100">
                                  {text}
                                </div>
                              </div>
                            ))}
                            {agentData.knowledgeBase.urls.length > 0 && (
                              <div>
                                <div className="font-medium mb-1">URLs:</div>
                                <div className="text-sm bg-blue-100 dark:bg-gray-700/50 rounded-md p-2 text-gray-800 dark:text-gray-100">
                                  {agentData.knowledgeBase.urls.map((url, index) => (
                                    <div key={index}>{url}</div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {agentData.knowledgeBase.files.length === 0 && 
                             agentData.knowledgeBase.texts.length === 0 && 
                             agentData.knowledgeBase.urls.length === 0 && (
                              <div className="text-sm text-gray-600 dark:text-gray-300 italic">No knowledge base content added</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {message.type === 'input' && visibleMessages.includes(message.id) && !visibleMessages.includes(-message.id) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full pl-11"
                  >
                    {message.inputType === 'text' && (
                      <div className="flex gap-3 justify-end">
                        <Input
                          placeholder="Enter agent name..."
                          className="flex-1 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                          defaultValue={editingMessage === message.id ? agentData.name : ''}
                          onKeyDown={(e) => e.key === 'Enter' && handleTextInput(e.currentTarget.value)}
                          autoFocus
                        />
                        <Button 
                          onClick={(e) => handleTextInput((e.currentTarget.previousSibling as HTMLInputElement).value)}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          {editingMessage === message.id ? 'Update' : 'Continue'}
                        </Button>
                      </div>
                    )}

                    {message.inputType === 'radio' && message.options && (
                      <div className="space-y-4">
                        {message.id === 5 ? (
                          <div className="max-w-md mx-auto">
                            <Select onValueChange={handleVoiceSelection} value={agentData.language}>
                              <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 h-12">
                                <SelectValue placeholder="Select a language">
                                  {agentData.language && (
                                    <div className="flex items-center gap-2">
                                      <Flag code={languages.find(l => l.id === agentData.language)?.flag} className="w-5 h-5" />
                                      <span>{languages.find(l => l.id === agentData.language)?.name}</span>
                                    </div>
                                  )}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 max-h-[300px]">
                                {languages.map((lang) => (
                                  <SelectItem 
                                    key={lang.id} 
                                    value={lang.id}
                                    className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:text-gray-900 dark:focus:text-gray-100"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Flag code={lang.flag} className="w-5 h-5" />
                                      <span>{lang.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ) : message.id === 7 ? (
                          <div className="max-w-md mx-auto">
                            <Select onValueChange={handleVoiceSelection} value={agentData.voice}>
                              <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 h-12">
                                <SelectValue placeholder="Select voice" />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 max-h-[300px]">
                                {voices.map((voice) => (
                                  <SelectItem 
                                    key={voice.id} 
                                    value={voice.id}
                                    className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:text-gray-900 dark:focus:text-gray-100"
                                  >
                                    <div className="flex items-center justify-between w-full gap-4">
                                      <span className="font-medium">{voice.name}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-300"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          // Add preview functionality
                                        }}
                                      >
                                        <Play className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              className="w-full mt-3 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white h-12"
                              onClick={() => setShowVoiceModal(true)}
                            >
                              Clone Your Voice
                            </Button>
                          </div>
                        ) : (
                          <RadioGroup
                            onValueChange={handleVoiceSelection}
                            className="space-y-4"
                          >
                            {message.options.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 cursor-pointer"
                                onClick={() => handleVoiceSelection(option.id)}
                              >
                                <RadioGroupItem value={option.id} id={option.id} />
                                <div className="flex-1">
                                  <Label htmlFor={option.id} className="text-gray-900 dark:text-gray-100 font-medium">
                                    {option.name}
                                  </Label>
                                  <p className="text-sm text-gray-400 dark:text-gray-300">{option.description}</p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Add preview functionality here
                                  }}
                                >
                                  Preview
                                </Button>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      </div>
                    )}

                    {message.inputType === 'voice' && (
                      <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-transparent">
                          <div className="flex items-center justify-center h-24">
                            {isRecordingStarted ? (
                              <div className="text-center space-y-2">
                                <div className="text-red-500 text-lg font-medium animate-pulse">Recording...</div>
                                <div className="text-gray-500 dark:text-gray-300">{`${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')} / 0:30`}</div>
                              </div>
                            ) : (
                              <div className="text-center space-y-2">
                                <div className="text-gray-500 dark:text-gray-300">Click Start to begin recording</div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-center">
                          <span className="text-gray-400 dark:text-gray-300">or</span>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Upload Audio</h3>
                          {!audioFile ? (
                            <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
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
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                  Supports MP3, WAV, M4A
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-700/50 rounded-lg p-3">
                              <div className="flex-1 text-sm text-gray-700 dark:text-gray-100 truncate">{audioFile.name}</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-300 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                  setAudioFile(null);
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                  }
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end">
                          <Button
                            onClick={() => showNextMessage()}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Skip Voice Cloning
                          </Button>
                        </div>
                      </div>
                    )}

                    {message.inputType === 'textarea' && (
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="flex-1 space-y-2">
                            <Textarea
                              placeholder={message.id === 9 ? 
                                "Example: Hello! I'm [Agent Name], your AI assistant. How can I help you today?" :
                                "Example: A professional and friendly AI agent focused on scheduling appointments and answering common questions..."
                              }
                              value={message.id === 9 ? agentData.greeting : agentData.prompt}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (message.id === 9) {
                                  setAgentData(prev => ({ ...prev, greeting: value }));
                                } else if (message.id === 11) {
                                  setAgentData(prev => ({ ...prev, prompt: value }));
                                }
                              }}
                              className="min-h-[100px] bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 w-full"
                              autoFocus
                              rows={6}
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                                onClick={() => {
                                  if (message.id === 9) {
                                    setAgentData(prev => ({ ...prev, greeting: '' }));
                                  } else if (message.id === 11) {
                                    setAgentData(prev => ({ ...prev, prompt: '' }));
                                  }
                                }}
                              >
                                Clear
                              </Button>
                              <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => {
                                  const value = message.id === 9 ? agentData.greeting : agentData.prompt;
                                  if (!value.trim()) {
                                    return;
                                  }
                                  handleTextInput(value);
                                }}
                                disabled={message.id === 9 ? !agentData.greeting.trim() : !agentData.prompt.trim()}
                              >
                                Continue
                              </Button>
                            </div>
                          </div>
                          {message.showTemplates && (
                            <Button
                              variant="outline"
                              className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white h-auto"
                              onClick={() => {
                                if (message.id === 9) {
                                  setShowGreetingTemplates(true);
                                } else if (message.id === 11) {
                                  setShowPromptTemplates(true);
                                }
                                setEditingMessage(message.id);
                              }}
                            >
                              Browse templates
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {message.inputType === 'knowledge' && (
                      <div className="space-y-6 mt-8 mb-12">
                        {/* File Upload */}
                        <div className="bg-blue-100 dark:bg-gray-700/50 rounded-lg p-6 space-y-4 border border-blue-200 dark:border-blue-800/50">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Upload Files</h3>
                          <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                            <div className="text-center">
                              <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  setAgentData(prev => ({
                                    ...prev,
                                    knowledgeBase: {
                                      ...prev.knowledgeBase,
                                      files: [...prev.knowledgeBase.files, ...files]
                                    }
                                  }));
                                }}
                                className="hidden"
                                id="file-upload"
                              />
                              <label htmlFor="file-upload" className="cursor-pointer">
                                <Button variant="ghost" className="space-x-2">
                                  <Upload className="w-5 h-5" />
                                  <span>Upload Files</span>
                                </Button>
                              </label>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                PDF, DOC, TXT files accepted
                              </p>
                            </div>
                          </div>
                          {agentData.knowledgeBase.files.length > 0 && (
                            <div className="space-y-2">
                              {agentData.knowledgeBase.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-200 dark:bg-gray-700/50 rounded-lg p-3">
                                  <span className="text-gray-700 dark:text-gray-100">{file.name}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setAgentData(prev => ({
                                        ...prev,
                                        knowledgeBase: {
                                          ...prev.knowledgeBase,
                                          files: prev.knowledgeBase.files.filter((_, i) => i !== index)
                                        }
                                      }));
                                    }}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Text Input */}
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4 border border-gray-300 dark:border-gray-700">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add Text</h3>
                          <Textarea
                            placeholder="Enter any additional text knowledge..."
                            className="min-h-[100px] bg-gray-200 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                const text = e.currentTarget.value.trim();
                                if (text) {
                                  setAgentData(prev => ({
                                    ...prev,
                                    knowledgeBase: {
                                      ...prev.knowledgeBase,
                                      texts: [...prev.knowledgeBase.texts, text]
                                    }
                                  }));
                                  e.currentTarget.value = '';
                                }
                              }
                            }}
                          />
                        </div>

                        <motion.div
                          animate={isAgentCreated ? {
                            scale: 0.9,
                            opacity: 0.6,
                            height: 'auto',
                            transition: { duration: 0.3 }
                          } : {
                            scale: 1,
                            opacity: 1,
                            height: 'auto',
                            transition: { duration: 0.3 }
                          }}
                        >
                          {/* URL Input */}
                          <div ref={knowledgeBaseSectionRef} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4 border border-gray-300 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add URLs</h3>
                              {agentData.knowledgeBase.urls.length > 0 && (
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {agentData.knowledgeBase.urls.length} URL{agentData.knowledgeBase.urls.length !== 1 ? 's' : ''} added
                                </span>
                              )}
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Enter URL"
                                  className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                                  disabled={false}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      const value = e.currentTarget.value.trim();
                                      if (value) {
                                        setAgentData(prev => ({
                                          ...prev,
                                          knowledgeBase: {
                                            ...prev.knowledgeBase,
                                            urls: [...prev.knowledgeBase.urls, value]
                                          }
                                        }));
                                        e.currentTarget.value = '';
                                      }
                                    }
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                                  disabled={false}
                                  onClick={(e) => {
                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                    const value = input.value.trim();
                                    if (value) {
                                      setAgentData(prev => ({
                                        ...prev,
                                        knowledgeBase: {
                                          ...prev.knowledgeBase,
                                          urls: [...prev.knowledgeBase.urls, value]
                                        }
                                      }));
                                      input.value = '';
                                    }
                                  }}
                                >
                                  Add URL
                                </Button>
                              </div>

                              {agentData.knowledgeBase.urls.length > 0 && (
                                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                  {agentData.knowledgeBase.urls.map((url, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700/50 rounded-lg p-2 pr-3 group">
                                      <div className="flex-1 text-sm text-gray-700 dark:text-gray-100 truncate">{url}</div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={false}
                                        className="text-gray-400 dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-300 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => {
                                          setAgentData(prev => ({
                                            ...prev,
                                            knowledgeBase: {
                                              ...prev.knowledgeBase,
                                              urls: prev.knowledgeBase.urls.filter((_, i) => i !== index)
                                            }
                                          }));
                                        }}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                        <div className="space-y-6">
                          <div className="flex justify-end">
                            <Button
                              onClick={() => {
                                setIsKnowledgeBaseSaved(true);
                                setVisibleMessages(prev => [...prev, -message.id]);
                                setIsAgentCreated(true);
                                // Save the text content when saving knowledge base
                                const textArea = document.querySelector('textarea[placeholder="Enter any additional text knowledge..."]') as HTMLTextAreaElement;
                                if (textArea && textArea.value.trim()) {
                                  setAgentData(prev => ({
                                    ...prev,
                                    knowledgeBase: {
                                      ...prev.knowledgeBase,
                                      texts: [...prev.knowledgeBase.texts, textArea.value.trim()]
                                    }
                                  }));
                                }
                              }}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                              disabled={isKnowledgeBaseSaved}
                            >
                              {isKnowledgeBaseSaved ? (
                                <div className="flex items-center gap-2">
                                  <Check className="w-4 h-4" />
                                  <span>Knowledge Base Saved</span>
                                </div>
                              ) : (
                                <span>Save Knowledge Base and Create AI Agent</span>
                              )}
                            </Button>
                          </div>

                          {isKnowledgeBaseSaved && (
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:space-x-4 sm:space-y-0 space-y-4">
                              <Button
                                onClick={() => navigate('/app/call')}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 border border-white/10"
                              >
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                                <span>Test Your Agent Now</span>
                              </Button>
                              
                              <Button
                                onClick={() => navigate('/app')}
                                className="w-full sm:w-auto bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 text-gray-700 dark:text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 border border-gray-300 dark:border-white/10"
                              >
                                <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-300" />
                                <span>Go to Dashboard</span>
                              </Button>
                            </div>
                          )}

                          {isKnowledgeBaseSaved && (
                            <div className="flex justify-center space-x-4 mt-6">
                              <Button
                                onClick={() => navigate('/app/call')}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 sm:space-x-3 border border-white/10"
                              >
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                                <span>Test Your AI Agent</span>
                              </Button>
                              
                              <Button
                                onClick={() => navigate('/app')}                       className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 text-gray-700 dark:text-white px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 sm:space-x-3 border border-gray-300 dark:border-white/10"
                              >
                                <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-300" />
                                <div className="flex flex-col items-start">
                                  <span className="font-medium text-sm sm:text-base">Visit Dashboard</span>
                                  <span className="text-xs text-gray-500 dark:text-gray-300 font-normal">To make more customizations</span>
                                </div>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <AnimatePresence>
                      {isAgentCreated && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6 mt-8">

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:space-x-4 sm:space-y-0 space-y-4">
                          <Button
                            onClick={() => {
                              // Handle test call action
                              navigate('/app/call');
                            }}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 border border-white/10"
                          >
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                            <span>Test Your Agent Now</span>
                          </Button>
                          
                          <Button
                            onClick={() => navigate('/app')}
                            className="w-full sm:w-auto bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 text-gray-700 dark:text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 border border-gray-300 dark:border-white/10"
                          >
                            <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-300" />
                            <span>Go to Dashboard</span>
                          </Button>
                        </div>
                        
                        <div className="text-center text-gray-400 text-sm">
                          Your agent is ready to take calls and help your customers
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Processing State */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Creating Your AI Agent...</h3>
            <Progress value={processingProgress} className="h-2" />
            <p className="text-sm text-gray-400 dark:text-gray-300">
              Almost done! We're setting up your agent with all the specified configurations.
            </p>
          </motion.div>
        )}
      </div>
      
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Extra padding to prevent overlap with fixed buttons */}
      <div className="pb-24 md:pb-32"></div>

      {/* Action Buttons - Shown after knowledge base is saved */}
      {isKnowledgeBaseSaved && (
        <div className="fixed bottom-8 md:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row justify-center md:space-x-6 space-y-4 md:space-y-0 w-full max-w-4xl px-4 md:px-6 py-4 md:py-5 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-t-xl shadow-lg">
          <Button
            onClick={() => navigate('/app/call')}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-12 py-4 sm:py-6 text-base sm:text-xl font-medium rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex-1 flex items-center justify-center space-x-2 sm:space-x-4 border border-white/10"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-blue-200" />
            <span>Test Your AI Agent</span>
          </Button>
          
          <Button
            onClick={() => navigate('/app')}
            className="w-full sm:w-auto bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 text-gray-700 dark:text-white px-4 sm:px-12 py-4 sm:py-6 text-base sm:text-xl rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex-1 flex items-center justify-center space-x-2 sm:space-x-4 border border-gray-300 dark:border-white/10"
          >
            <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-300" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Visit Dashboard</span>
              <span className="text-sm text-gray-500 dark:text-gray-300 font-normal">To make more customizations</span>
            </div>
          </Button>
        </div>
      )}
      {/* Voice Cloning Modal */}
      {showVoiceModal && (
      <div className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 w-[560px] space-y-6 shadow-xl border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {showRecordingInterface ? 'Create Voice Clone' : 'Clone Your Voice'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-300"
              onClick={() => setShowVoiceModal(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {showRecordingInterface ? (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-transparent">
                  <div className="flex items-center justify-center h-24">
                    {isRecordingStarted ? (
                      <div className="text-center space-y-2">
                        <div className="text-red-500 text-lg font-medium animate-pulse">Recording...</div>
                        <div className="text-gray-500 dark:text-gray-300">{`${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')} / 0:30`}</div>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <div className="text-gray-500 dark:text-gray-300">Click Start to begin recording</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 space-y-2 border border-blue-200 dark:border-blue-800/50">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 text-yellow-500">💡</div>
                    <p className="text-gray-700 dark:text-gray-400">Read this script for best results:</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Hello! I'm excited to create my AI voice clone. This recording will help establish my unique voice pattern and characteristics.
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 gap-2"
                    onClick={() => setShowRecordingInterface(false)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Restart
                  </Button>

                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    onClick={() => setIsRecordingStarted(true)}
                  >
                    Start
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Ex: Professional Male Voice"
                      className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-lg py-6 px-4"
                      value={voiceName}
                      onChange={(e) => setVoiceName(e.target.value)}
                    />
                    {!voiceName && (
                      <p className="text-red-400 text-sm ml-1 font-medium">Voice name is required</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-900 dark:text-white text-lg font-medium">Choose how you'd like to provide your voice sample.</p>
                  <p className="text-gray-500 dark:text-gray-300 text-base">You can either record directly or upload an audio file.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center gap-3 py-6 px-4 text-base font-medium min-w-[220px]"
                    onClick={() => setShowRecordingInterface(true)}
                  >
                    <Mic className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">Record Your Voice</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center gap-3 py-6 px-4 text-base font-medium min-w-[220px]"
                    onClick={() => {
                      // Add upload functionality
                    }}
                  >
                    <Upload className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">Upload Audio File</span>
                  </Button>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 flex items-start gap-3 border border-blue-200 dark:border-blue-800/50">
                  <div className="text-blue-500 dark:text-blue-400 mt-1">
                    <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                      <span className="text-xs">i</span>
                    </div>
                  </div>
                  <p className="text-blue-700 dark:text-blue-200 text-base">For best results, use a high-quality microphone in a quiet environment.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
      <TemplateBrowser
        isOpen={showGreetingTemplates}
        onClose={() => setShowGreetingTemplates(false)}
        onSelect={(content) => {
          setAgentData(prev => ({ ...prev, greeting: content }));
          setShowGreetingTemplates(false);
        }}
        title="Greeting Templates"
        templates={greetingTemplates}
        type="greeting"
      />

      <TemplateBrowser
        isOpen={showPromptTemplates}
        onClose={() => setShowPromptTemplates(false)}
        onSelect={(content) => {
          setAgentData(prev => ({ ...prev, prompt: content }));
          setShowPromptTemplates(false);
        }}
        title="Agent Prompt Templates"
        templates={promptTemplates}
        type="prompt"
      />
    </>
  );
}
