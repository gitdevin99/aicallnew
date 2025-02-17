import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

const data = [
  { date: "Mon", calls: 4, efficiency: 85 },
  { date: "Tue", calls: 7, efficiency: 92 },
  { date: "Wed", calls: 5, efficiency: 88 },
  { date: "Thu", calls: 8, efficiency: 95 },
  { date: "Fri", calls: 12, efficiency: 97 },
  { date: "Sat", calls: 6, efficiency: 89 },
  { date: "Sun", calls: 9, efficiency: 93 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-navy-light/90 dark:bg-navy-dark/90 backdrop-blur-xl p-4 rounded-lg border border-accent-blue/50 shadow-lg shadow-accent-blue/20"
      >
        <div className="text-white/80 text-sm mb-2">
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
            <span className="text-white font-medium">{payload[0].value} Calls</span>
          </motion.div>
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-accent-green animate-[pulse_1.5s_ease-in-out_infinite]" />
            <span className="text-white font-medium">{payload[1].value}% Efficiency</span>
          </motion.div>
        </div>
      </motion.div>
    );
  }
  return null;
};

export const CallsChart = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white/90 dark:bg-navy-light/90 backdrop-blur-2xl rounded-xl p-6 shadow-2xl dark:shadow-accent-blue/20 border border-gray-200/50 dark:border-accent-blue/30 group"
    >
      {/* Ambient glow effects */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-accent-blue/20 via-accent-green/20 to-accent-blue/20 rounded-xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
              Calls Overview
            </h2>
            <div className="flex items-center gap-2 mt-1">
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
              <span className="text-sm text-gray-500 dark:text-gray-400">Live Updates</span>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-accent-blue/20 to-accent-green/20 hover:from-accent-blue/30 hover:to-accent-green/30 text-accent-blue rounded-lg transition-all duration-300 flex items-center gap-2 border border-accent-blue/30 shadow-lg shadow-accent-blue/5"
          >
            <Download size={16} className="animate-bounce" />
            <span>Download</span>
          </motion.button>
        </div>
        
        <div className="h-[300px] relative">
          {/* Chart ambient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-accent-green/5 to-transparent rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                tick={{ fill: 'currentColor' }}
                className="text-gray-500 dark:text-gray-400"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor' }}
                className="text-gray-500 dark:text-gray-400"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="#A8C6FA"
                strokeWidth={2}
                fill="url(#colorCalls)"
                dot={false}
                activeDot={{ 
                  r: 8, 
                  fill: "#A8C6FA",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                  filter: "url(#glow)",
                  className: "animate-[pulse_2s_ease-in-out_infinite]"
                }}
              />
              <Area
                type="monotone"
                dataKey="efficiency"
                stroke="#4ADE80"
                strokeWidth={2}
                fill="url(#colorEfficiency)"
                dot={false}
                activeDot={{ 
                  r: 8, 
                  fill: "#4ADE80",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                  filter: "url(#glow)",
                  className: "animate-[pulse_2s_ease-in-out_infinite]"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
