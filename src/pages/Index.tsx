
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import { LeadCard } from "@/components/LeadCard";
import { CallsChart } from "@/components/CallsChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-navy flex">
      <Sidebar />
      <main className="flex-1 pl-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Calls Handled Today"
              value={25}
              change={13.5}
            />
            <StatsCard
              title="Answer Rate"
              value="87%"
              change={3.7}
            />
            <StatsCard
              title="Missed Calls Today"
              value={2}
              change={-33.3}
            />
            <StatsCard
              title="Average Call Duration"
              value="3m 36s"
              change={20}
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Leads</h2>
              <button className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors">
                View All Leads
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LeadCard
                name="John Smith"
                phone="+1 (555) 123-4567"
                status="active"
                lastContact="2024-02-08"
                score={85}
              />
              <LeadCard
                name="Sarah Johnson"
                phone="+1 (555) 987-6543"
                status="new"
                lastContact="2024-02-08"
                score={92}
              />
            </div>
          </div>

          <CallsChart />
        </div>
      </main>
    </div>
  );
};

export default Index;
