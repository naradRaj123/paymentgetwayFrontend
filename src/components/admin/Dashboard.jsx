
import React from 'react';
import { motion } from 'framer-motion';
import DashboardStats from '@/components/admin/Dashboard/DashboardStats';
import RecentTransactionsCard from '@/components/admin/Dashboard/RecentTransactionsCard';
import QuickActionsCard from '@/components/admin/Dashboard/QuickActionsCard';
import { Button } from '@/components/ui/button'; // Keep if used directly, remove if only in sub-components

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your payment gateway platform
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Process New Payment
        </Button>
      </div>

      <DashboardStats />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2"
      >
        <RecentTransactionsCard />
        <QuickActionsCard />
      </motion.div>
    </div>
  );
};

export default Dashboard;
