
import { 
  Home, 
  Zap, 
  FileText, 
  Users, 
  Layers, 
  ClipboardList, 
  Phone, 
  TrendingUp,
  PhoneCall,
  DollarSign,
  Settings,
  BarChart
} from "lucide-react";
import { Link } from "react-router-dom";

const mainMenuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Zap, label: "Automation", href: "/automation" },
  { icon: FileText, label: "Templates", href: "/templates" },
  { icon: Users, label: "Agents", href: "/agents" },
  { icon: Layers, label: "Campaigns", href: "/campaigns" },
  { icon: ClipboardList, label: "Actions", href: "/actions" },
  { icon: Phone, label: "Calls", href: "/calls" },
  { icon: TrendingUp, label: "Leads", href: "/leads" },
];

const phoneNumberItems = [
  { icon: DollarSign, label: "Buy Number", href: "/buy-number" },
  { icon: PhoneCall, label: "Manage", href: "/manage-numbers" },
];

const bottomMenuItems = [
  { icon: BarChart, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-navy-dark p-4 fixed left-0 top-0 animate-fade-in flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white px-4">Dashboard</h1>
      </div>
      
      {/* Main Menu */}
      <nav className="space-y-1 flex-1">
        {mainMenuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`nav-link ${item.label === "Dashboard" ? "active" : ""}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Phone Numbers Section with Divider */}
        <div className="pt-4 mt-4 border-t border-white/10">
          <h2 className="text-gray-400 px-4 mb-2 text-sm">Phone Numbers</h2>
          {phoneNumberItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="nav-link"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Bottom Menu Items with Divider */}
        <div className="pt-4 mt-4 border-t border-white/10">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="nav-link"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Storage Indicator */}
      <div className="mt-4 px-4">
        <p className="text-gray-400 text-sm mb-2">Storage Used (78%)</p>
        <div className="w-full h-1.5 bg-navy-light rounded-full overflow-hidden">
          <div className="h-full w-[78%] bg-accent-blue rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
