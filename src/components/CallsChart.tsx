import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Calendar } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const generateDummyData = (startDate: Date, endDate: Date) => {
  const data = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    data.push({
      date: format(currentDate, 'MMM dd'),
      calls: Math.floor(Math.random() * 15) + 3, // Random between 3-18
      efficiency: Math.floor(Math.random() * 20) + 80, // Random between 80-100
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-navy-light/90 dark:bg-navy-dark/90 backdrop-blur-xl p-3 sm:p-4 rounded-lg border border-accent-blue/50 shadow-lg shadow-accent-blue/20"
      >
        <div className="text-white/80 text-xs sm:text-sm mb-2">
          {label}
        </div>
        <div className="space-y-2">
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-accent-blue animate-[pulse_1.5s_ease-in-out_infinite]" />
            <span className="text-white text-xs sm:text-sm font-medium">{payload[0].value} Calls</span>
          </motion.div>
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-accent-green animate-[pulse_1.5s_ease-in-out_infinite]" />
            <span className="text-white text-xs sm:text-sm font-medium">{payload[1]?.value}% Efficiency</span>
          </motion.div>
        </div>
      </motion.div>
    );
  }
  return null;
};

export const CallsChart = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 1, 12),
    to: new Date(2024, 1, 19)
  });

  type DateRange = {
    from: Date;
    to: Date;
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white/90 dark:bg-navy-light/90 backdrop-blur-2xl rounded-xl p-4 sm:p-6 shadow-2xl dark:shadow-accent-blue/20 border border-gray-200/50 dark:border-accent-blue/30 group"
    >
      {/* Ambient glow effects */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-accent-blue/20 via-accent-green/20 to-accent-blue/20 rounded-xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
              Calls Overview
            </h2>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-accent-green"
                />
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Live Updates</span>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white dark:bg-[#1a1f2e] border-gray-200 dark:border-none shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.05),inset_2px_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.1),inset_2px_2px_4px_rgba(0,0,0,0.3)] hover:shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.05),inset_1px_1px_2px_rgba(0,0,0,0.05)] dark:hover:shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.1),inset_1px_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg text-gray-700 dark:text-gray-300 h-auto min-h-0"
                  >
                    <CalendarIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-accent-blue" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "MM/dd")} - {format(date.to, "MM/dd")}
                        </>
                      ) : (
                        format(date.from, "MM/dd/yyyy")
                      )
                    ) : (
                      <span>Select dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-2 sm:p-4 bg-white dark:bg-[#1a1f2e] border border-gray-200 dark:border-none shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.5)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(255,255,255,0.1)] rounded-lg z-50" 
                  align="start">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={1}
                    className="bg-transparent border-none text-gray-300"
                    classNames={{
                      day_selected: "bg-accent-blue text-white hover:bg-accent-blue hover:text-white focus:bg-accent-blue focus:text-white",
                      day_today: "bg-accent-green text-white",
                      day: "h-7 w-7 p-0 font-normal text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 flex items-center justify-center",
                      day_range_middle: "bg-accent-blue/20 text-gray-700 dark:text-gray-300",
                      day_disabled: "text-gray-400 dark:text-gray-600",
                      head_cell: "text-gray-500 dark:text-gray-400 font-medium text-xs w-7 text-center",
                      caption: "text-gray-700 dark:text-gray-300 font-medium text-sm mb-1 px-2",
                      nav_button_previous: "absolute left-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 h-6 w-6",
                      nav_button_next: "absolute right-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 h-6 w-6",
                      cell: "text-center p-0 relative [&:has([aria-selected])]:bg-accent-blue/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 w-7",
                      months: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2",
                      month: "space-y-3 min-w-[224px]",
                      table: "w-full border-collapse space-y-1",
                      head_row: "grid grid-cols-7 gap-0",
                      row: "grid grid-cols-7 gap-0 mt-1",
                      selected: "bg-accent-blue text-white hover:bg-accent-blue hover:text-white focus:bg-accent-blue focus:text-white"
                    }}
                  />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-accent-blue/20 to-accent-green/20 hover:from-accent-blue/30 hover:to-accent-green/30 text-accent-blue rounded-lg transition-all duration-300 flex items-center gap-1 sm:gap-2 border border-accent-blue/30 shadow-lg shadow-accent-blue/5 text-xs sm:text-sm mt-1 sm:mt-0 w-fit"
          >
            <Download size={14} className="animate-bounce sm:h-4 sm:w-4" />
            <span>Download</span>
          </motion.button>
        </div>
        
        <div className="h-[250px] sm:h-[300px] relative">
          {/* Chart ambient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-accent-green/5 to-transparent rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={date?.from && date?.to ? generateDummyData(date.from, date.to) : []} 
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A8C6FA" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#A8C6FA" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                dy={10}
                tickFormatter={(value) => window.innerWidth < 640 && value.length > 5 ? value.substring(0, 3) : value}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                dx={-10}
                tickCount={5}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="#A8C6FA"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCalls)"
                activeDot={{ 
                  r: 5, 
                  fill: "#3B82F6",
                  filter: "url(#glow)"
                }}
              />
              <Area
                type="monotone"
                dataKey="efficiency"
                stroke="#4ADE80"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorEfficiency)"
                activeDot={{ 
                  r: 5, 
                  fill: "#10B981",
                  filter: "url(#glow)"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
