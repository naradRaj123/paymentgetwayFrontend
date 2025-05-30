
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { loadState, saveState } from '@/services/storageService';
import * as GatewayService from '@/services/gatewayService';
import * as WebhookService from '@/services/webhookService';
import * as TransactionService from '@/services/transactionService';
import *  as PayoutService from '@/services/payoutService';
import * as UserService from '@/services/userService';
import * as CommissionService from '@/services/commissionService';
import * as ReferralService from '@/services/referralService';

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const { toast } = useToast();

  const [paymentGateways, setPaymentGateways] = useState(() => loadState('paymentGateways', [
    { id: '1', name: 'PayU', isActive: true, apiKey: '', merchantId: '', salt: '', currency: 'INR' },
    { id: '2', name: 'PlatformPayments', isActive: false, apiKey: '', keySecret: '', currency: 'INR' } // Renamed Razorpay
  ]));
  const [webhooks, setWebhooks] = useState(() => loadState('webhooks', []));
  const [transactions, setTransactions] = useState(() => loadState('transactions', []));
  const [payouts, setPayouts] = useState(() => loadState('payouts', []));
  
  const [users, setUsers] = useState(() => loadState('users', [])); 
  const [managers, setManagers] = useState(() => loadState('managers', [])); 
  const [merchants, setMerchants] = useState(() => loadState('merchants', [])); 
  const [commissionSettings, setCommissionSettings] = useState(() => loadState('commissionSettings', {
    payuPercentage: 2.0,
    platformPaymentsPercentage: 2.5, // Renamed Razorpay
    fixedFee: 0.30, 
    defaultCurrency: 'INR',
  }));
  const [referrals, setReferrals] = useState(() => loadState('referrals', []));
  const [isAdmin, setIsAdmin] = useState(true); 
  const [blogs, setBlogs] = useState(() => loadState('blogs', [
    { id: '1', slug: 'understanding-payment-gateways', title: 'Understanding Payment Gateways', author: 'Admin', date: '2025-04-10', excerpt: 'Learn the basics of payment gateways and how they work...', content: 'Full content here...', image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1' },
    { id: '2', slug: 'secure-online-transactions', title: 'Tips for Secure Online Transactions', author: 'Admin', date: '2025-04-15', excerpt: 'Discover best practices for ensuring your online payments are secure...', content: 'Full content here...', image: 'https://images.unsplash.com/photo-1604580864964-3c9e5d0a9f59' },
    { id: '3', slug: 'future-of-digital-payments', title: 'The Future of Digital Payments in India', author: 'Admin', date: '2025-04-20', excerpt: 'Exploring upcoming trends in the Indian digital payment landscape...', content: 'Full content here...', image: 'https://images.unsplash.com/photo-1580048915913-4f5830310136' },
  ]));

  useEffect(() => saveState('paymentGateways', paymentGateways), [paymentGateways]);
  useEffect(() => saveState('webhooks', webhooks), [webhooks]);
  useEffect(() => saveState('transactions', transactions), [transactions]);
  useEffect(() => saveState('payouts', payouts), [payouts]);
  useEffect(() => saveState('users', users), [users]);
  useEffect(() => saveState('managers', managers), [managers]);
  useEffect(() => saveState('merchants', merchants), [merchants]);
  useEffect(() => saveState('commissionSettings', commissionSettings), [commissionSettings]);
  useEffect(() => saveState('referrals', referrals), [referrals]);
  useEffect(() => saveState('blogs', blogs), [blogs]);


  const contextValue = {
    paymentGateways,
    updatePaymentGateway: (id, data) => GatewayService.updateGateway(paymentGateways, id, data, setPaymentGateways, toast),
    webhooks,
    addWebhook: (data) => WebhookService.addNewWebhook(webhooks, data, setWebhooks, toast),
    updateWebhook: (id, data) => WebhookService.updateExistingWebhook(webhooks, id, data, setWebhooks, toast),
    deleteWebhook: (id) => WebhookService.removeWebhook(webhooks, id, setWebhooks, toast),
    transactions,
    addTransaction: (data) => TransactionService.addNewTransaction(transactions, data, setTransactions),
    updateTransaction: (id, data) => TransactionService.updateExistingTransaction(transactions, id, data, setTransactions),
    processPayment: (data) => TransactionService.processPaymentSimulated(data, transactions, setTransactions, webhooks, toast),
    payouts,
    createPayout: (data) => PayoutService.createNewPayout(payouts, data, setPayouts, toast),
    updatePayout: (id, data) => PayoutService.updateExistingPayout(payouts, id, data, setPayouts, toast),
    
    users,
    addUser: (data) => UserService.addUser(users, data, setUsers, toast),
    updateUser: (id, data) => UserService.updateUser(users, id, data, setUsers, toast),
    deleteUser: (id) => UserService.deleteUser(users, id, setUsers, toast),
    
    managers, 
    addManager: (data) => UserService.addUser(managers, data, setManagers, toast), 
    updateManager: (id, data) => UserService.updateUser(managers, id, data, setManagers, toast),
    deleteManager: (id) => UserService.deleteUser(managers, id, setManagers, toast),

    merchants, 
    addMerchant: (data) => {
      const newMerchant = UserService.addUser(merchants, { ...data, kycStatus: 'pending' }, setMerchants, toast);
      return newMerchant;
    },
    updateMerchant: (id, data) => UserService.updateUser(merchants, id, data, setMerchants, toast),
    deleteMerchant: (id) => UserService.deleteUser(merchants, id, setMerchants, toast),
    updateMerchantKyc: (id, kycData) => {
        const updatedMerchants = merchants.map(m => m.id === id ? {...m, kycData, kycStatus: 'submitted'} : m);
        setMerchants(updatedMerchants);
        saveState('merchants', updatedMerchants);
        toast({ title: "KYC Submitted", description: "KYC documents have been submitted for review." });
    },


    commissionSettings,
    updateCommissionSettings: (data) => CommissionService.updateCommissionSettings(data, setCommissionSettings, toast),
    
    referrals,
    addReferral: (data) => ReferralService.addReferral(referrals, data, setReferrals, toast),
    updateReferral: (id, data) => ReferralService.updateReferral(referrals, id, data, setReferrals, toast),

    isAdmin, 
    setIsAdmin, 
    blogs,
    setBlogs,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};
