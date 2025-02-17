import { motion } from "framer-motion";

interface LeadCardProps {
  name: string;
  phone: string;
  status: 'active' | 'new';
  lastContact: string;
  score: number;
}

export const LeadCard = ({ name, phone, status, lastContact, score }: LeadCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphic p-5 rounded-xl group hover:-translate-y-1 transition-all duration-500"
    >
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white/90 group-hover:text-accent-blue transition-colors">
                {name}
              </h3>
              <span className={`text-sm px-2.5 py-1 rounded-full ${
                status === 'active' 
                  ? 'bg-accent-green/10 text-accent-green' 
                  : 'bg-accent-blue/10 text-accent-blue'
              }`}>
                {status}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">{phone}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last Contact: {lastContact}
          </div>
          <div className="text-sm font-medium">
            Score: <span className="text-accent-green">{score}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
