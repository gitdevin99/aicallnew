import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import * as Flags from 'country-flag-icons/react/3x2'

interface CountryCode {
  code: string
  dialCode: string
  flag: keyof typeof Flags
}

const countryCodes: CountryCode[] = [
  { code: 'US', dialCode: '+1', flag: 'US' },
  { code: 'GB', dialCode: '+44', flag: 'GB' },
  { code: 'AU', dialCode: '+61', flag: 'AU' },
  { code: 'DE', dialCode: '+49', flag: 'DE' },
  { code: 'FR', dialCode: '+33', flag: 'FR' },
  { code: 'IT', dialCode: '+39', flag: 'IT' },
  { code: 'ES', dialCode: '+34', flag: 'ES' },
  { code: 'CA', dialCode: '+1', flag: 'CA' },
]

export function PhoneNumberDialog() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState<CountryCode>(countryCodes[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getCountryFlag = (code: string) => {
    const country = countryCodes.find(c => c.code === code)
    if (!country) return null
    const FlagComponent = Flags[country.flag]
    return <FlagComponent className="w-4 h-3 mr-2" />
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Add your API call logic here
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Use your number</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Use your number</DialogTitle>
          <DialogDescription>
            Works only for outbound calls. Your AI will call customers and display your phone number as a caller ID.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Your phone number*</p>
            <div className="flex gap-2">
              <Select
                value={countryCode.code}
                onValueChange={(value) => {
                  const newCountry = countryCodes.find(c => c.code === value)
                  if (newCountry) setCountryCode(newCountry)
                }}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue>
                    <div className="flex items-center">
                      {getCountryFlag(countryCode.code)}
                      {countryCode.dialCode}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem
                      key={country.code}
                      value={country.code}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center">
                        {getCountryFlag(country.code)}
                        <span className="mr-2">{country.dialCode}</span>
                        <span className="text-muted-foreground">{country.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              You will receive a call on this number and you will have to enter a code displayed on the screen after you submit this form.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" className="mr-2">
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!phoneNumber.trim() || isSubmitting}
          >
            {isSubmitting ? "Calling..." : "Call me now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
