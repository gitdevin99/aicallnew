import { 
  Home,
  Zap,
  FileText,
  Users,
  PenTool,
  Phone,
  Building2,
  DollarSign,
  PhoneCall,
  Settings,
  User
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 flex flex-col border-r">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <ThemeToggle />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-2">
        {/* Main Menu */}
        <ul className="space-y-1">
          <li>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <Home size={20} className="hover-glow" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/automation" className={`nav-link ${isActive('/automation') ? 'active' : ''}`}>
              <Zap size={20} className="hover-glow" />
              <span>Automation</span>
            </Link>
          </li>
          <li>
            <Link to="/templates" className={`nav-link ${isActive('/templates') ? 'active' : ''}`}>
              <FileText size={20} className="hover-glow" />
              <span>Templates</span>
            </Link>
          </li>
          <li>
            <Link to="/agents" className={`nav-link ${isActive('/agents') ? 'active' : ''}`}>
              <Users size={20} className="hover-glow" />
              <span>Agents</span>
            </Link>
          </li>
          <li>
            <Link to="/campaigns" className={`nav-link ${isActive('/campaigns') ? 'active' : ''}`}>
              <PenTool size={20} className="hover-glow" />
              <span>Campaigns</span>
            </Link>
          </li>
          <li>
            <Link to="/actions" className={`nav-link ${isActive('/actions') ? 'active' : ''}`}>
              <Building2 size={20} className="hover-glow" />
              <span>Actions</span>
            </Link>
          </li>
          <li>
            <Link to="/calls" className={`nav-link ${isActive('/calls') ? 'active' : ''}`}>
              <Phone size={20} className="hover-glow" />
              <span>Calls</span>
            </Link>
          </li>
          <li>
            <Link to="/crm" className={`nav-link ${isActive('/crm') ? 'active' : ''}`}>
              <Users size={20} className="hover-glow" />
              <span>CRM</span>
            </Link>
          </li>
        </ul>

        {/* Phone Numbers Section */}
        <div className="mt-6">
          <h2 className="text-sm font-medium text-gray-900 dark:text-white/70 px-2 mb-2">Phone numbers</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/buy-number" className={`nav-link ${isActive('/buy-number') ? 'active' : ''}`}>
                <DollarSign size={20} className="hover-glow" />
                <span>Buy Number</span>
              </Link>
            </li>
            <li>
              <Link to="/manage-numbers" className={`nav-link ${isActive('/manage-numbers') ? 'active' : ''}`}>
                <PhoneCall size={20} className="hover-glow" />
                <span>Manage</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-4">
        {/* Storage Section */}
        <div className="space-y-2">
          <p className="text-sm text-gray-900 dark:text-white">Storage Used</p>
          <div className="w-full h-1 bg-gray-200 dark:bg-navy-light/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-blue via-accent-green to-accent-blue rounded-full animate-pulse-glow"
              style={{ width: '78%' }}
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="glass flex items-center gap-3 p-3 rounded-lg">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-green flex items-center justify-center animate-border-glow">
              <User size={20} className="text-white hover-glow" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent-green border-2 border-white dark:border-navy animate-pulse-glow" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm text-gray-900 dark:text-white">John Doe</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Premium User</p>
          </div>
          <Link to="/settings" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light transition-colors">
            <Settings size={18} className="text-gray-400 hover:text-accent-blue transition-colors hover-glow" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
