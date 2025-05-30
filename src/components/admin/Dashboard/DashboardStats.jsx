
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePayment } from '@/contexts/PaymentContext';

const DashboardStats = () => {
  const { transactions, payouts, webhooks, paymentGateways } = usePayment();
  const [stats, setStats] = useState({
    totalTransactions: 0,
    successfulTransactions: 0,
    totalAmount: '0.00',
    pendingPayouts: 0,
    activeWebhooks: 0,
    activeGateways: 0,
  });

  useEffect(() => {
    const successfulTransactions = transactions.filter(t => t.status === 'completed');
    const pendingPayouts = payouts.filter(p => p.status === 'pending');
    const activeWebhooks = webhooks.filter(w => w.isActive);
    const activeGateways = paymentGateways.filter(g => g.isActive);
    const totalAmount = successfulTransactions.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    setStats({
      totalTransactions: transactions.length,
      successfulTransactions: successfulTransactions.length,
      totalAmount: totalAmount.toFixed(2),
      pendingPayouts: pendingPayouts.length,
      activeWebhooks: activeWebhooks.length,
      activeGateways: activeGateways.length,
    });
  }, [transactions, payouts, webhooks, paymentGateways]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const statCards = [
    { title: 'Total Processed', value: `$${stats.totalAmount}`, subtext: `${stats.totalTransactions} transactions`, icon: <CreditCard className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Success Rate', value: `${stats.totalTransactions > 0 ? Math.round((stats.successfulTransactions / stats.totalTransactions) * 100) : 0}%`, subtext: `${stats.successfulTransactions} successful`, icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> },
    { title: 'Pending Payouts', value: stats.pendingPayouts, subtext: 'Awaiting processing', icon: <Wallet className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Active Integrations', value: stats.activeGateways + stats.activeWebhooks, subtext: `${stats.activeGateways} gateways, ${stats.activeWebhooks} webhooks`, icon: <ArrowUpRight className="h-4 w-4 text-muted-foreground" /> },
  ];

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statCards.map((card, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="payment-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.subtext}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStats;
