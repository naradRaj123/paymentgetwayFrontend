
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  Wallet, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Webhook
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePayment } from '@/contexts/PaymentContext';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { transactions, payouts, webhooks, paymentGateways } = usePayment();
  const [stats, setStats] = useState({
    totalTransactions: 0,
    successfulTransactions: 0,
    failedTransactions: 0,
    totalAmount: 0,
    pendingPayouts: 0,
    activeWebhooks: 0,
    activeGateways: 0
  });

  useEffect(() => {
    // Calculate dashboard statistics
    const successfulTransactions = transactions.filter(t => t.status === 'completed');
    const failedTransactions = transactions.filter(t => t.status === 'failed' || t.status === 'error');
    const pendingPayouts = payouts.filter(p => p.status === 'pending');
    const activeWebhooks = webhooks.filter(w => w.isActive);
    const activeGateways = paymentGateways.filter(g => g.isActive);
    
    const totalAmount = successfulTransactions.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    
    setStats({
      totalTransactions: transactions.length,
      successfulTransactions: successfulTransactions.length,
      failedTransactions: failedTransactions.length,
      totalAmount: totalAmount.toFixed(2),
      pendingPayouts: pendingPayouts.length,
      activeWebhooks: activeWebhooks.length,
      activeGateways: activeGateways.length
    });
  }, [transactions, payouts, webhooks, paymentGateways]);

  const recentTransactions = transactions.slice(0, 5);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
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

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="payment-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Processed
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalAmount}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalTransactions} transactions
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="payment-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalTransactions > 0 
                  ? Math.round((stats.successfulTransactions / stats.totalTransactions) * 100) 
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.successfulTransactions} successful transactions
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="payment-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payouts
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPayouts}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting manual processing
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="payment-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Integrations
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeGateways + stats.activeWebhooks}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeGateways} gateways, {stats.activeWebhooks} webhooks
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2"
      >
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your latest payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          transaction.status === 'completed' ? "bg-green-100 text-green-600" : 
                          transaction.status === 'pending' ? "bg-yellow-100 text-yellow-600" : 
                          "bg-red-100 text-red-600"
                        )}>
                          {transaction.status === 'completed' ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : transaction.status === 'pending' ? (
                            <AlertCircle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {transaction.description || `Transaction ${transaction.id.substring(0, 8)}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ${parseFloat(transaction.amount || 0).toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No transactions yet
                  </div>
                )}
                
                {recentTransactions.length > 0 && (
                  <Button variant="outline" className="w-full mt-2">
                    <span>View All Transactions</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Process New Payment
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Wallet className="mr-2 h-4 w-4" />
                  Create Manual Payout
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Webhook className="mr-2 h-4 w-4" />
                  Configure Webhook
                </Button>
                
                <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Integration Status</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {stats.activeGateways > 0 
                      ? `You have ${stats.activeGateways} active payment gateway${stats.activeGateways > 1 ? 's' : ''}.` 
                      : "No active payment gateways. Configure one to start accepting payments."}
                  </p>
                  {stats.activeGateways === 0 && (
                    <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                      Setup Gateway
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
