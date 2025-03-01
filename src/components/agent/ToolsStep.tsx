import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Calendar, PhoneOff } from "lucide-react";

type CalendarIntegration = "cal.com" | "google" | "calendly";

interface CalendarOption {
  id: CalendarIntegration;
  title: string;
  description: string;
  logo: string;
}

const calendarOptions: CalendarOption[] = [
  {
    id: "cal.com",
    title: "Cal.com",
    description: "Cal.com Integration",
    logo: "/images/calendars/cal.svg"
  },
  {
    id: "google",
    title: "Google Calendar",
    description: "Google Calendar Integration",
    logo: "/images/calendars/google.svg"
  },
  {
    id: "calendly",
    title: "Calendly",
    description: "Calendly Integration",
    logo: "/images/calendars/calendly.svg"
  }
];

export function ToolsStep() {
  const [callTransfer, setCallTransfer] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transferCondition, setTransferCondition] = useState("");
  
  const [appointmentScheduling, setAppointmentScheduling] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<CalendarIntegration>("cal.com");
  const [apiKey, setApiKey] = useState("");
  const [eventId, setEventId] = useState("");
  
  const [endCall, setEndCall] = useState(false);
  const [endCallCondition, setEndCallCondition] = useState("");

  return (
    <div className="space-y-8">
      {/* Call Transfer */}
      <div className="space-y-4 p-6 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-medium">Call Transfer</h3>
              <p className="text-sm text-muted-foreground">
                Transfers the call to a real assistant
              </p>
            </div>
          </div>
          <Switch
            checked={callTransfer}
            onCheckedChange={setCallTransfer}
          />
        </div>

        {callTransfer && (
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Phone number</Label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Ex: +123456789"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label>When to transfer</Label>
              <Textarea
                value={transferCondition}
                onChange={(e) => setTransferCondition(e.target.value)}
                placeholder="Transfer the call when the customer asks for a real assistant."
                className="bg-background resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Appointment Scheduling */}
      <div className="space-y-4 p-6 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-medium">Appointment scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Real-time booking scheduling
              </p>
            </div>
          </div>
          <Switch
            checked={appointmentScheduling}
            onCheckedChange={setAppointmentScheduling}
          />
        </div>

        {appointmentScheduling && (
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Calendar Integration</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {calendarOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedCalendar(option.id)}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                      selectedCalendar === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-background"
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <img
                        src={option.logo}
                        alt={`${option.title} logo`}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{option.title}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {option.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>API key</Label>
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">
                API key from {selectedCalendar}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Event Id</Label>
              <Input
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                placeholder="Ex: 833866"
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">
                Event ID to check availabilities and book meetings
              </p>
            </div>
          </div>
        )}
      </div>

      {/* End Call */}
      <div className="space-y-4 p-6 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PhoneOff className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-medium">End Call</h3>
              <p className="text-sm text-muted-foreground">
                Ends the call
              </p>
            </div>
          </div>
          <Switch
            checked={endCall}
            onCheckedChange={setEndCall}
          />
        </div>

        {endCall && (
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>When to End</Label>
              <Textarea
                value={endCallCondition}
                onChange={(e) => setEndCallCondition(e.target.value)}
                placeholder="End the call if the user says 'goodbye'."
                className="bg-background resize-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
