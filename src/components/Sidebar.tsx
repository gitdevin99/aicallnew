
import { Home, Zap, FileText, Users, Megaphone, Play, Phone, UserSquare2, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Zap, label: "Automation", href: "/automation" },
  { icon: FileText, label: "Templates", href: "/templates" },
  { icon: Users, label: "Agents", href: "/agents" },
  { icon: Megaphone, label: "Campaigns", href: "/campaigns" },
  { icon: Play, label: "Actions", href: "/actions" },
  { icon: Phone, label: "Calls", href: "/calls" },
  { icon: UserSquare2, label: "Leads", href: "/leads" },
  { icon: PhoneCall, label: "Phone Numbers", href: "/phone-numbers" },
];

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-navy-dark p-4 fixed left-0 top-0 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white px-4">Dashboard</h1>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`nav-link ${item.label === "Home" ? "active" : ""}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
