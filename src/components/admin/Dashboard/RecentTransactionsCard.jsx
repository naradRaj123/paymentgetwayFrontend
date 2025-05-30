
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePayment } from '@/contexts/PaymentContext';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

const RecentTransactionsCard = () => {
  const { transactions } = usePayment();
  const recentTransactions = transactions.slice(0, 5);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="col-span-1 h-full">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest payment transactions</CardDescription>
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
                      {transaction.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> :
                       transaction.status === 'pending' ? <AlertCircle className="h-4 w-4" /> :
                       <XCircle className="h-4 w-4" />}
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
              <div className="text-center py-6 text-muted-foreground">No transactions yet</div>
            )}
            {transactions.length > 0 && (
              <Button variant="outline" className="w-full mt-2" asChild>
                <NavLink to="/transactions">
                  <span>View All Transactions</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentTransactionsCard;
