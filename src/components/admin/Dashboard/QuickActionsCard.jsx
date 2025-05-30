
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Webhook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePayment } from '@/contexts/PaymentContext';
import { NavLink } from 'react-router-dom';

const QuickActionsCard = () => {
  const { paymentGateways } = usePayment();
  const activeGatewaysCount = paymentGateways.filter(g => g.isActive).length;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="col-span-1 h-full">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <CreditCard className="mr-2 h-4 w-4" /> Process New Payment
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <NavLink to="/payouts"><Wallet className="mr-2 h-4 w-4" /> Create Manual Payout</NavLink>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <NavLink to="/webhooks"><Webhook className="mr-2 h-4 w-4" /> Configure Webhook</NavLink>
            </Button>
            <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Integration Status</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {activeGatewaysCount > 0
                  ? `You have ${activeGatewaysCount} active payment gateway${activeGatewaysCount > 1 ? 's' : ''}.`
                  : "No active payment gateways. Configure one to start accepting payments."}
              </p>
              {activeGatewaysCount === 0 && (
                <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700" asChild>
                  <NavLink to="/payment-gateways">Setup Gateway</NavLink>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickActionsCard;
