
interface LeadCardProps {
  name: string;
  phone: string;
  status: "active" | "new";
  lastContact: string;
  score: number;
}

export const LeadCard = ({ name, phone, status, lastContact, score }: LeadCardProps) => {
  return (
    <div className="card glass animate-fade-up">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-gray-400">{phone}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          status === "active" ? "bg-accent-green/20 text-accent-green" : "bg-accent-blue/20 text-accent-blue"
        }`}>
          {status}
        </span>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-sm text-gray-400">Last Contact: {lastContact}</p>
        <p className="text-accent-blue">Score: {score}%</p>
      </div>
    </div>
  );
};
