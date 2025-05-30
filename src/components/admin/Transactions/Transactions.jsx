
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePayment } from '@/contexts/PaymentContext';
import { cn } from '@/lib/utils';

const Transactions = () => {
  const { transactions } = usePayment();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gatewayFilter, setGatewayFilter] = useState('all');

  const uniqueGateways = [...new Set(transactions.map(t => t.gateway))].filter(Boolean);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.gatewayReference?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesGateway = gatewayFilter === 'all' || transaction.gateway === gatewayFilter;
    
    return matchesSearch && matchesStatus && matchesGateway;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all payment transactions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            A complete record of all payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer ID, description or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              
              {uniqueGateways.length > 0 && (
                <Select value={gatewayFilter} onValueChange={setGatewayFilter}>
                  <SelectTrigger className="w-[150px]">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Gateway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Gateways</SelectItem>
                    {uniqueGateways.map(gateway => (
                      <SelectItem key={gateway} value={gateway}>{gateway}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium">
              <div className="col-span-5">Transaction</div>
              <div className="col-span-2 text-center">Amount</div>
              <div className="col-span-2 text-center">Gateway</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-1 text-right">Date</div>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y"
            >
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <motion.div 
                    key={transaction.id} 
                    variants={itemVariants}
                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20 transition-colors"
                  >
                    <div className="col-span-5">
                      <div className="flex items-start space-x-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          transaction.status === 'completed' ? "bg-green-100 text-green-600" : 
                          transaction.status === 'pending' ? "bg-amber-100 text-amber-600" : 
                          "bg-red-100 text-red-600"
                        )}>
                          {transaction.status === 'completed' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownLeft className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.description || `Transaction ${transaction.id.substring(0, 8)}`}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center text-xs text-muted-foreground mt-1 space-y-1 sm:space-y-0 sm:space-x-2">
                            {transaction.customerId && (
                              <span>Customer: {transaction.customerId}</span>
                            )}
                            {transaction.gatewayReference && (
                              <span>Ref: {transaction.gatewayReference}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center font-medium">
                      {transaction.currency || '$'} {parseFloat(transaction.amount || 0).toFixed(2)}
                    </div>
                    
                    <div className="col-span-2 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300">
                        {transaction.gateway || 'Unknown'}
                      </span>
                    </div>
                    
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {getStatusIcon(transaction.status)}
                        <span className={cn(
                          "text-sm font-medium",
                          transaction.status === 'completed' ? "text-green-600" : 
                          transaction.status === 'pending' ? "text-amber-600" : 
                          "text-red-600"
                        )}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="col-span-1 text-right text-xs text-muted-foreground">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No transactions found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchTerm || statusFilter !== 'all' || gatewayFilter !== 'all'
                      ? "Try adjusting your search or filters" 
                      : "Process a payment to see transactions here"}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </CardContent>
        {filteredTransactions.length > 0 && (
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Transactions;
