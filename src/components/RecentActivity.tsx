
import { Activity } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'call',
    description: 'Call completed with John Smith',
    time: '10 minutes ago',
  },
  {
    id: 2,
    type: 'lead',
    description: 'New lead created: Sarah Johnson',
    time: '30 minutes ago',
  },
  {
    id: 3,
    type: 'status',
    description: 'Lead status updated to "Interested"',
    time: '1 hour ago',
  },
];

export const RecentActivity = () => {
  return (
    <div className="card animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Activity size={20} className="text-accent-blue" />
          Recent Activity
        </h2>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 rounded-lg glass hover:bg-white/10 transition-colors cursor-pointer"
          >
            <p className="font-medium">{activity.description}</p>
            <p className="text-sm text-gray-400 mt-1">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
