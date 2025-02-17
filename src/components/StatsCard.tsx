
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  suffix?: string;
}

export const StatsCard = ({ title, value, change, suffix = "%" }: StatsCardProps) => {
  const isPositive = change > 0;

  return (
    <div className="stat-card animate-fade-up">
      <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold">
          {value}
        </p>
        <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span>{Math.abs(change)}{suffix}</span>
        </div>
      </div>
    </div>
  );
};
