
import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard,
  CreditCard, 
  BarChart3, 
  Webhook as WebhookIcon, 
  ArrowDownToLine, 
  Settings as SettingsIcon, 
  Menu, 
  X, 
  LogOut,
  ChevronRight,
  Users,
  Briefcase,
  UserCheck,
  Percent,
  Gift,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', adminOnly: false },
  { path: '/payment-gateways', icon: CreditCard, label: 'Payment Gateways', adminOnly: false },
  { path: '/payouts', icon: ArrowDownToLine, label: 'Payouts', adminOnly: false },
  { path: '/webhooks', icon: WebhookIcon, label: 'Webhooks', adminOnly: false },
  { path: '/transactions', icon: BarChart3, label: 'Transactions', adminOnly: false },
  { path: '/admin/users', icon: Users, label: 'Manage Users', adminOnly: true },
  { path: '/admin/managers', icon: Briefcase, label: 'Manage Managers', adminOnly: true },
  { path: '/admin/merchants', icon: UserCheck, label: 'Manage Merchants', adminOnly: true },
  { path: '/admin/commissions', icon: Percent, label: 'Commissions', adminOnly: true },
  { path: '/admin/referrals', icon: Gift, label: 'Referral System', adminOnly: true },
  { path: '/developer', icon: Code, label: 'Developer Portal', adminOnly: false },
  { path: '/settings', icon: SettingsIcon, label: 'Settings', adminOnly: false },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  // In a real app, isAdmin would come from auth context
  const isAdmin = true; 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredSidebarItems = sidebarItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <div className="flex h-screen overflow-hidden">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground md:hidden"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card dark:bg-slate-900 shadow-lg transform md:translate-x-0 transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        initial={false}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border dark:border-slate-700">
            <NavLink to="/" className="flex items-center gap-2">
              <img  alt="PayGate Hub Logo" class="h-8 w-auto" src="https://images.unsplash.com/photo-1686140386811-099f53c0dd54" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PayGate Hub
              </h1>
            </NavLink>
            <p className="text-xs text-muted-foreground mt-1">
              Admin Panel
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredSidebarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2.5 text-sm rounded-md transition-colors group relative",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-800"
                  )
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    layoutId="activeAdminIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </motion.div>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-border dark:border-slate-700">
            <NavLink to="/login" className="flex items-center w-full px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 rounded-md hover:bg-muted dark:hover:bg-slate-800 transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </NavLink>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 md:ml-64 overflow-y-auto">
        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
