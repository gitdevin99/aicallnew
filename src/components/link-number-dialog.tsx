import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AE } from 'country-flag-icons/react/3x2';
import { Link } from "lucide-react";

export function LinkNumberDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <Link className="h-4 w-4" />
          Use your number
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Link className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            Link your own phone number
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Works only for outbound calls. Your AI will call customers and display your phone number as a caller ID.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Your phone number*</Label>
            <div className="relative">
              <div className="absolute left-3 top-2.5 flex items-center gap-2 text-gray-500">
                <AE className="h-4 w-4" />
                <span>+971</span>
              </div>
              <Input className="pl-20" placeholder="050 123 4567" />
            </div>
            <p className="text-sm text-muted-foreground">
              You will receive a call on this number and you will have to enter a code displayed on the screen after you submit this form.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Call me now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
