
import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  BarChart3, 
  Webhook, 
  ArrowDownToLine, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { path: '/', icon: BarChart3, label: 'Dashboard' },
  { path: '/payment-gateways', icon: CreditCard, label: 'Payment Gateways' },
  { path: '/payouts', icon: ArrowDownToLine, label: 'Payouts' },
  { path: '/webhooks', icon: Webhook, label: 'Webhooks' },
  { path: '/transactions', icon: BarChart3, label: 'Transactions' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white md:hidden"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 shadow-lg transform md:translate-x-0 transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        initial={false}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PayGate Hub
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Payment Gateway Platform
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm rounded-md transition-colors group",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute right-4"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </motion.div>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <button className="flex items-center w-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 overflow-y-auto">
        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
