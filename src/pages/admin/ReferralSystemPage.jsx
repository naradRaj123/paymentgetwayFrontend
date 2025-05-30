
import React, { useState } from 'react';
import { usePayment } from '@/contexts/PaymentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Gift, Users, DollarSign, Search, CheckCircle, XCircle, Clock, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
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

const ReferralSystemPage = () => {
  const { referrals, addReferral, updateReferral, merchants } = usePayment();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReferral, setCurrentReferral] = useState(null);
  const [formData, setFormData] = useState({ referrerId: '', referredEmail: '', status: 'pending' });

  const [referralSettings, setReferralSettings] = useState({
    rewardAmount: 10,
    rewardType: 'fixed',
    minTransactionForReward: 50,
  });

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setReferralSettings(prev => ({ ...prev, [name]: name === 'rewardAmount' || name === 'minTransactionForReward' ? parseFloat(value) : value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (referral = null) => {
    setCurrentReferral(referral);
    if (referral) {
      setFormData({ 
        referrerId: referral.referrerId, 
        referredEmail: referral.referredEmail, 
        status: referral.status 
      });
    } else {
      setFormData({ referrerId: merchants.length > 0 ? merchants[0].id : '', referredEmail: '', status: 'pending' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReferral(null);
    setFormData({ referrerId: '', referredEmail: '', status: 'pending' });
  };

  const handleSubmit = () => {
    const referrer = merchants.find(m => m.id === formData.referrerId);
    const referralData = {
      ...formData,
      referrerName: referrer ? referrer.name : 'Unknown Referrer',
    };

    if (currentReferral) {
      updateReferral(currentReferral.id, referralData);
    } else {
      addReferral(referralData);
    }
    closeModal();
  };

  const filteredReferrals = referrals.filter(referral => 
    (referral.referrerName && referral.referrerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (referral.referredEmail && referral.referredEmail.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const getStatusClass = (status) => {
    if (status === 'completed') return 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300';
    if (status === 'rejected') return 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300';
    return 'bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300';
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (status === 'rejected') return <XCircle className="h-4 w-4 text-red-600" />;
    return <Clock className="h-4 w-4 text-amber-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Referral System</h1>
          <p className="text-muted-foreground">Manage merchant referrals and rewards.</p>
        </div>
        <Button onClick={() => openModal()}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Referral Manually
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Gift className="mr-2 h-5 w-5 text-primary" /> Referral Program Settings</CardTitle>
          <CardDescription>Configure the rewards for successful referrals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="rewardAmount">Reward Amount ({referralSettings.rewardType === 'fixed' ? '$' : '%'})</Label>
              <Input id="rewardAmount" name="rewardAmount" type="number" value={referralSettings.rewardAmount} onChange={handleSettingsChange} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rewardType">Reward Type</Label>
              <select id="rewardType" name="rewardType" value={referralSettings.rewardType} onChange={handleSettingsChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option value="fixed">Fixed Amount</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="minTransactionForReward">Min. Transaction for Reward ($)</Label>
              <Input id="minTransactionForReward" name="minTransactionForReward" type="number" value={referralSettings.minTransactionForReward} onChange={handleSettingsChange} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button>Save Referral Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-primary" /> Referral List</CardTitle>
          <CardDescription>Track all referrals and their statuses.</CardDescription>
           <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search referrals..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredReferrals.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No referrals found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Referrer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Referred Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {filteredReferrals.map(referral => (
                    <tr key={referral.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{referral.referrerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{referral.referredEmail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{new Date(referral.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusClass(referral.status))}>
                          {getStatusIcon(referral.status)}
                          <span className="ml-1.5">{referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                         <Button variant="ghost" size="sm" onClick={() => openModal(referral)}>Edit Status</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
       {isModalOpen && (
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{currentReferral ? 'Edit Referral Status' : 'Add New Referral'}</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="referrerId">Referrer (Merchant)</Label>
                 <select 
                    id="referrerId" 
                    name="referrerId" 
                    value={formData.referrerId} 
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    disabled={!!currentReferral} 
                 >
                    <option value="">Select Merchant</option>
                    {merchants.map(merchant => (
                        <option key={merchant.id} value={merchant.id}>{merchant.name} ({merchant.companyName})</option>
                    ))}
                 </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="referredEmail">Referred Email</Label>
                <Input id="referredEmail" name="referredEmail" type="email" value={formData.referredEmail} onChange={handleInputChange} disabled={!!currentReferral} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                 <select 
                    id="status" 
                    name="status" 
                    value={formData.status} 
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                 >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                 </select>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>{currentReferral ? 'Update Status' : 'Add Referral'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default ReferralSystemPage;
