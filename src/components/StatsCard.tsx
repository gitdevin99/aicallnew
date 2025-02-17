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
        <div className="relative glassmorphic p-5 rounded-xl bg-white dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent-blue/60 transition-colors duration-300"
              >
                {title}
              </motion.span>
              
              <div className="space-y-1">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green hover:from-accent-green hover:to-accent-blue transition-all duration-500"
                >
                  {value}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`flex items-center gap-1 text-sm ${
                    isPositive ? "text-accent-green" : "text-red-500"
                  }`}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -2, 0],
                      rotate: isPositive ? [0, -10, 0] : [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </motion.div>
                  <span>{Math.abs(change)}%</span>
                </motion.div>
              </div>
            </div>

            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.4 
              }}
              className="p-3 bg-gradient-to-br from-accent-blue/10 to-accent-green/10 rounded-lg hover:from-accent-blue/20 hover:to-accent-green/20 transition-colors duration-300"
            >
              <div className="text-gray-600 dark:text-gray-400 hover:text-accent-blue transition-colors duration-300">
                {icon}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
