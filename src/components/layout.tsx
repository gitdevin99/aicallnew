import { motion } from "framer-motion"
import { ThemeProvider } from "./theme-provider"
import { Sidebar } from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Automation from "@/pages/Automation";
import Templates from "@/pages/Templates";
import Agents from "@/pages/Agents";
import Campaigns from "@/pages/Campaigns";
import Actions from "@/pages/Actions";
import Calls from "@/pages/Calls";
import CRM from "@/pages/CRM";
import BuyNumber from "@/pages/BuyNumber";
import ManageNumbers from "@/pages/ManageNumbers";
import Settings from "@/pages/Settings";
import Billing from "@/pages/Billing";
import CreateAgent from "@/pages/CreateAgent";
import CreateCampaign from "@/pages/CreateCampaign";
import CampaignDetails from "@/pages/CampaignDetails";
import NewAction from "@/pages/NewAction";
import CallDetails from "@/pages/CallDetails";

interface LayoutProps {
}

export const Layout = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-white dark:bg-navy">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="min-h-screen bg-light-bg dark:bg-navy">
                <Sidebar />
                <main className="pl-[260px] pt-4 pr-4">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="automation" element={<Automation />} />
                    <Route path="templates" element={<Templates />} />
                    <Route path="agents" element={<Agents />} />
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="campaigns/create" element={<CreateCampaign />} />
                    <Route path="campaigns/:id" element={<CampaignDetails />} />
                    <Route path="actions" element={<Actions />} />
                    <Route path="actions/new" element={<NewAction />} />
                    <Route path="calls" element={<Calls />} />
                    <Route path="calls/:id" element={<CallDetails />} />
                    <Route path="crm" element={<CRM />} />
                    <Route path="buy-number" element={<BuyNumber />} />
                    <Route path="manage-numbers" element={<ManageNumbers />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="billing" element={<Billing />} />
                    <Route path="agents/create" element={<CreateAgent />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
};
