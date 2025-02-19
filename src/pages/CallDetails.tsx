import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw, Phone } from "lucide-react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CallDetails = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const callData = {
    type: "Outbound",
    status: "Completed",
    cost: "$0.93",
    duration: "1m 21s",
    phoneNumber: "+1 (555) 123-4567",
    answeredBy: "Human",
    assistant: {
      name: "Sarah Wilson",
      phoneNumber: "+1 (555) 867-6543",
      campaign: "Summer Outreach 2023",
      leadId: "LEAD-123456",
      timestamp: "2025-02-10 13:45:23",
    },
    inputVariables: [
      { name: "city", value: "New York" },
      { name: "customer_name", value: "John Doe" },
      { name: "product_interest", value: "Health Insurance" },
    ],
    extractedVariables: [
      { name: "status", value: "Completed" },
      { name: "summary", value: "Scheduled a meeting with an expert agent" },
      { name: "follow_up_required", value: "Yes" },
    ],
    transcript: [
      {
        speaker: "assistant",
        text: "Hello! This is Sarah from ABC Insurance. How are you today?",
        timestamp: "00:00.5",
      },
      {
        speaker: "human",
        text: "Hi Sarah, I'm doing well, thank you. I received your email about the new insurance plans.",
        timestamp: "00:34.2",
      },
      {
        speaker: "assistant",
        text: "That's great! I'll be happy to walk you through our new coverage options. What type of insurance are you most interested in?",
        timestamp: "00:56.8",
      },
    ],
    webhook: {
      status: "success",
      timestamp: "2025-02-10 13:45:23",
      url: "webhook-123",
      status_code: 200,
      message: "Successfully processed call data",
      data: {
        call_id: "call-xyz",
        processed_at: "2025-02-10T13:45:23Z",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/calls")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            View Call
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Detailed view of the call between the client and the assistant.
          </p>
        </div>
      </div>

      {/* Audio Player */}
      <AudioPlayer
        audioUrl="/mock-call-recording.mp3" // Replace with actual audio URL
        className="bg-card"
      />

      {/* Call Details and Assistant Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Call Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Type</div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{callData.type}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <Badge variant="success" className="bg-green-500/10 text-green-500">
                  {callData.status}
                </Badge>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Cost</div>
                <div>{callData.cost}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Duration</div>
                <div>{callData.duration}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Phone</div>
                <div>{callData.phoneNumber}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Answered By</div>
                <div>{callData.answeredBy}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assistant Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Assistant Name</div>
                <div>{callData.assistant.name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Assistant Phone</div>
                <div>{callData.assistant.phoneNumber}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Campaign</div>
                <div>{callData.assistant.campaign}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Lead ID</div>
                <div>{callData.assistant.leadId}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Time</div>
                <div>{callData.assistant.timestamp}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Input and Extracted Variables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {callData.inputVariables.map((variable) => (
                <div key={variable.name}>
                  <div className="text-sm font-medium text-primary">
                    {variable.name}
                  </div>
                  <div>{variable.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Extracted Variables</CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Re-evaluate
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {callData.extractedVariables.map((variable) => (
                <div key={variable.name}>
                  <div className="text-sm font-medium text-primary">
                    {variable.name}
                  </div>
                  <div>{variable.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transcript */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transcript</CardTitle>
            <Button variant="outline">Live Chat</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {callData.transcript.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  message.speaker === "human" ? "justify-end" : ""
                }`}
              >
                <div
                  className={`flex flex-col gap-1 max-w-[80%] ${
                    message.speaker === "human"
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 ${
                      message.speaker === "human"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Webhook Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Webhook Details</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="success" className="bg-green-500/10 text-green-500">
                Webhook Sent
              </Badge>
              <Button variant="outline" size="sm">
                Resend Webhook
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(callData.webhook, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CallDetails;
