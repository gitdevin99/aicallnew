
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "Jan", calls: 4 },
  { date: "Feb", calls: 3 },
  { date: "Mar", calls: 7 },
  { date: "Apr", calls: 5 },
  { date: "May", calls: 6 },
  { date: "Jun", calls: 4 },
  { date: "Jul", calls: 8 },
];

export const CallsChart = () => {
  return (
    <div className="card h-[300px] animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Calls Overview</h2>
        <button className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors">
          Download Report
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#4B5563"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#4B5563"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{ background: "#192A45", border: "none", borderRadius: "8px" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="calls"
            stroke="#A8C6FA"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
