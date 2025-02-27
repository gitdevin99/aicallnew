import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export const StatsCard = ({ title, value, change, icon }: StatsCardProps) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="relative"
    >
      <div className="relative p-[1px] rounded-xl overflow-hidden hover:before:opacity-100 before:opacity-0 before:transition-opacity before:duration-500 before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-accent-blue/40 before:via-accent-green/40 before:to-accent-blue/40 before:animate-gradient-x before:blur-sm">
        {/* Animated gradient border */}
        <div 
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue via-accent-green to-accent-blue opacity-0 hover:opacity-100 transition-opacity duration-500 animate-gradient-x"
          style={{ maskImage: 'linear-gradient(black, black)' }}
        />
        
        {/* Card content */}
        <div className="relative glassmorphic p-3 sm:p-5 rounded-xl bg-white dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div className="space-y-2 sm:space-y-3">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-accent-blue/60 transition-colors duration-300"
              >
                {title}
              </motion.span>
              
              <div className="space-y-1">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green hover:from-accent-green hover:to-accent-blue transition-all duration-500"
                >
                  {value}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-1"
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                  )}
                  <span className={`text-xs sm:text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(change)}%
                  </span>
                </motion.div>
              </div>
            </div>
            
            <div 
              className="relative p-2 sm:p-3 rounded-full bg-gradient-to-br from-white/70 to-white/20 dark:from-gray-800/70 dark:to-gray-800/20 shadow-inner"
            >
              <div className="relative z-10">
                {icon}
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue/20 via-accent-green/20 to-accent-blue/20 animate-gradient-x blur-sm opacity-80"></div>
            </div>
          </div>
          
          {/* Background elements for visual flair */}
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-r from-accent-blue/5 to-accent-green/5 rounded-full blur-xl transform translate-x-5 translate-y-5"></div>
          <div className="absolute top-0 left-0 w-10 h-10 bg-gradient-to-r from-accent-green/5 to-accent-blue/5 rounded-full blur-xl transform -translate-x-2 -translate-y-2"></div>
        </div>
      </div>
    </motion.div>
  );
};
