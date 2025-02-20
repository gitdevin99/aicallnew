import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface AdvancedFiltersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyFilters: (filters: AdvancedFilters) => void
}

export interface AdvancedFilters {
  phoneNumber?: string
  fromDate?: Date
  toDate?: Date
  minDuration?: number
  maxDuration?: number
}

export function AdvancedFiltersDialog({
  open,
  onOpenChange,
  onApplyFilters,
}: AdvancedFiltersDialogProps) {
  const [filters, setFilters] = useState<AdvancedFilters>({
    phoneNumber: "",
    minDuration: 0,
    maxDuration: 3600,
  })

  const handleApplyFilters = () => {
    onApplyFilters(filters)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm font-medium text-muted-foreground">
              Phone Number
            </label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              value={filters.phoneNumber}
              onChange={(e) =>
                setFilters({ ...filters, phoneNumber: e.target.value })
              }
              className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">From Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !filters.fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.fromDate ? (
                      format(filters.fromDate, "PPP")
                    ) : (
                      <span>yyyy-mm-dd</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover border-border">
                  <Calendar
                    mode="single"
                    selected={filters.fromDate}
                    onSelect={(date) =>
                      setFilters({ ...filters, fromDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground">To Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !filters.toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.toDate ? (
                      format(filters.toDate, "PPP")
                    ) : (
                      <span>yyyy-mm-dd</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover border-border">
                  <Calendar
                    mode="single"
                    selected={filters.toDate}
                    onSelect={(date) =>
                      setFilters({ ...filters, toDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="minDuration" className="text-sm font-medium text-muted-foreground">
                Min Duration (s)
              </label>
              <Input
                id="minDuration"
                type="number"
                placeholder="0"
                value={filters.minDuration}
                className=""
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minDuration: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="maxDuration" className="text-sm font-medium text-muted-foreground">
                Max Duration (s)
              </label>
              <Input
                id="maxDuration"
                type="number"
                placeholder="3600"
                value={filters.maxDuration}
                className=""
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxDuration: parseInt(e.target.value) || 3600,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
