import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function SipTrunkDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto justify-center">
          Integrate SIP trunk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Integrate SIP trunk</DialogTitle>
          <div className="text-sm text-muted-foreground">
            📚 Read the docs
          </div>
        </DialogHeader>

        <div className="space-y-8 pb-6">
          <div className="space-y-3">
            <Label>Inbound SIP address</Label>
            <div className="text-sm text-muted-foreground">
              The SIP address that will be used to receive calls from your SIP trunk.
            </div>
            <div className="bg-muted p-3 rounded-md">
              autocalls.sip.twilio.com
            </div>
          </div>

          <div className="space-y-3">
            <Label>SIP trunk type*</Label>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" className="justify-start space-x-2">
                <div className="grid grid-cols-3 gap-1 h-4 w-4">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-current rounded-sm" />
                  ))}
                </div>
                <span>SIP Extension</span>
              </Button>
              <Button variant="outline" className="justify-start space-x-2">
                <div className="h-4 w-4">📞</div>
                <span>Phone number</span>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Your SIP extension*</Label>
            <Input placeholder="1000" />
          </div>

          <div className="space-y-3">
            <Label>SIP address*</Label>
            <Input placeholder="sip.example.com" />
            <div className="text-sm text-muted-foreground">
              The address of the SIP trunk, without the port
            </div>
          </div>

          <div className="space-y-6">
            <Label>Authentication</Label>
            <div className="text-sm text-muted-foreground">
              Credentials for SIP authentication
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Username*</Label>
                <Input placeholder="1000" />
                <div className="text-sm text-muted-foreground">
                  The username for SIP authentication
                </div>
              </div>
              <div className="space-y-3">
                <Label>Password*</Label>
                <Input type="password" placeholder="Enter a strong password" />
                <div className="text-sm text-muted-foreground">
                  Must be at least 12 characters, contain a number, and mixed case letters
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Label>Outbound calling number format*</Label>
            <RadioGroup defaultValue="international-plus">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="international-plus" id="international-plus" />
                  <Label htmlFor="international-plus" className="space-y-1">
                    <div>International (with + in front)</div>
                    <div className="text-sm text-muted-foreground">Eg. +1 202 555 0123</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="international" id="international" />
                  <Label htmlFor="international" className="space-y-1">
                    <div>International (without + in front)</div>
                    <div className="text-sm text-muted-foreground">Eg. 1 202 555 0123</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="national" id="national" />
                  <Label htmlFor="national" className="space-y-1">
                    <div>National (without country and area code)</div>
                    <div className="text-sm text-muted-foreground">Eg. 0741926265</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
            <div className="text-sm text-muted-foreground">
              Select how you want the calling number to be formatted when calling customers
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button variant="outline">Cancel</Button>
            <Button>Add SIP number</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
