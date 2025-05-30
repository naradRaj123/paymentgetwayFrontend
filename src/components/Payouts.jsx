
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowDownToLine, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  Plus,
  User,
  DollarSign,
  Building,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePayment } from '@/contexts/PaymentContext';
import { cn } from '@/lib/utils';

const Payouts = () => {
  const { payouts, createPayout, updatePayout } = usePayment();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newPayout, setNewPayout] = useState({
    beneficiaryName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    amount: '',
    currency: 'USD',
    description: ''
  });

  const handleCreatePayout = () => {
    createPayout(newPayout);
    setNewPayout({
      beneficiaryName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      amount: '',
      currency: 'USD',
      description: ''
    });
  };

  const handleUpdateStatus = (id, status) => {
    updatePayout(id, { 
      status,
      processedAt: status !== 'pending' ? new Date().toISOString() : null
    });
  };

  const handleNewPayoutChange = (e) => {
    const { name, value } = e.target;
    setNewPayout(prev => ({ ...prev, [name]: value }));
  };

  // Filter payouts based on search term and status filter
  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = 
      payout.beneficiaryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.accountNumber?.includes(searchTerm) ||
      payout.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payout.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-3xl font-bold tracking-tight">Manual Payouts</h1>
          <p className="text-muted-foreground mt-1">
            Process and manage manual payout requests
          </p>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="mr-2 h-4 w-4" />
              Create New Payout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[525px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Create New Payout</AlertDialogTitle>
              <AlertDialogDescription>
                Enter the beneficiary details and amount to create a new manual payout request.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="beneficiaryName"
                      name="beneficiaryName"
                      value={newPayout.beneficiaryName}
                      onChange={handleNewPayoutChange}
                      className="pl-9"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={newPayout.amount}
                      onChange={handleNewPayoutChange}
                      className="pl-9"
                      placeholder="100.00"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={newPayout.accountNumber}
                    onChange={handleNewPayoutChange}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    name="currency" 
                    value={newPayout.currency} 
                    onValueChange={(value) => setNewPayout(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC/SWIFT Code</Label>
                  <Input
                    id="ifscCode"
                    name="ifscCode"
                    value={newPayout.ifscCode}
                    onChange={handleNewPayoutChange}
                    placeholder="ABCD0123456"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="bankName"
                      name="bankName"
                      value={newPayout.bankName}
                      onChange={handleNewPayoutChange}
                      className="pl-9"
                      placeholder="Bank Name"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="description"
                    name="description"
                    value={newPayout.description}
                    onChange={handleNewPayoutChange}
                    className="pl-9"
                    placeholder="Payment for services"
                  />
                </div>
              </div>
            </div>
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCreatePayout}
                disabled={!newPayout.beneficiaryName || !newPayout.accountNumber || !newPayout.amount}
              >
                Create Payout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout Requests</CardTitle>
          <CardDescription>
            View and manage all manual payout requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, account number or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="w-full md:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredPayouts.length > 0 ? (
              filteredPayouts.map((payout) => (
                <motion.div key={payout.id} variants={itemVariants}>
                  <Card className="overflow-hidden">
                    <div className={cn(
                      "h-1.5",
                      payout.status === 'completed' ? "bg-green-500" : 
                      payout.status === 'pending' ? "bg-amber-500" : 
                      "bg-red-500"
                    )} />
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <h3 className="font-semibold text-lg">{payout.beneficiaryName}</h3>
                            <div className={cn(
                              "ml-3 px-2 py-0.5 rounded-full text-xs font-medium",
                              payout.status === 'completed' ? "bg-green-100 text-green-800" : 
                              payout.status === 'pending' ? "bg-amber-100 text-amber-800" : 
                              "bg-red-100 text-red-800"
                            )}>
                              {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {payout.accountNumber} • {payout.bankName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            IFSC: {payout.ifscCode}
                          </p>
                          {payout.description && (
                            <p className="text-sm mt-2">{payout.description}</p>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end justify-between">
                          <div className="text-right">
                            <div className="text-xl font-bold">
                              {payout.currency} {parseFloat(payout.amount).toFixed(2)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Created: {new Date(payout.createdAt).toLocaleString()}
                            </p>
                            {payout.processedAt && (
                              <p className="text-xs text-muted-foreground">
                                Processed: {new Date(payout.processedAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                          
                          {payout.status === 'pending' && (
                            <div className="flex space-x-2 mt-4 md:mt-0">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-red-200 text-red-700 hover:bg-red-50"
                                onClick={() => handleUpdateStatus(payout.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button 
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleUpdateStatus(payout.id, 'completed')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <ArrowDownToLine className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No payout requests found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Try adjusting your search or filters" 
                    : "Create a new payout request to get started"}
                </p>
              </div>
            )}
          </motion.div>
        </CardContent>
        {filteredPayouts.length > 0 && (
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPayouts.length} of {payouts.length} payouts
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

export default Payouts;
