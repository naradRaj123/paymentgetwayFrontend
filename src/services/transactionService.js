
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveState } from '@/services/storageService';
import { notifyWebhooksSimulated } from '@/services/webhookService';

export const addNewTransaction = (transactions, transactionData, setTransactions) => {
  const newTransaction = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    status: 'pending',
    ...transactionData
  };
  const updatedTransactions = [newTransaction, ...transactions];
  setTransactions(updatedTransactions);
  saveState('transactions', updatedTransactions);
  return newTransaction;
};

export const updateExistingTransaction = (transactions, id, data, setTransactions) => {
  const updatedTransactions = transactions.map(transaction =>
    transaction.id === id ? { ...transaction, ...data } : transaction
  );
  setTransactions(updatedTransactions);
  saveState('transactions', updatedTransactions);
};

export const processPaymentSimulated = async (paymentData, transactions, setTransactions, webhooks, toast) => {
  const transaction = addNewTransaction(transactions, {
    amount: paymentData.amount,
    currency: paymentData.currency,
    gateway: paymentData.gateway,
    customerId: paymentData.customerId,
    description: paymentData.description
  }, setTransactions);

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (Math.random() < 0.9) {
      updateExistingTransaction(transactions, transaction.id, {
        status: 'completed',
        gatewayReference: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        completedAt: new Date().toISOString()
      }, setTransactions);
      
      notifyWebhooksSimulated(webhooks, {
        event: 'payment.success',
        data: {
          transactionId: transaction.id,
          amount: paymentData.amount,
          currency: paymentData.currency,
          timestamp: new Date().toISOString()
        }
      });
      toast({
        title: "Payment Successful",
        description: `Payment of ${paymentData.amount} ${paymentData.currency} was processed successfully.`,
      });
      return { success: true, transactionId: transaction.id };
    } else {
      updateExistingTransaction(transactions, transaction.id, {
        status: 'failed',
        error: 'Payment declined by issuing bank',
        completedAt: new Date().toISOString()
      }, setTransactions);
      notifyWebhooksSimulated(webhooks, {
        event: 'payment.failed',
        data: {
          transactionId: transaction.id,
          amount: paymentData.amount,
          currency: paymentData.currency,
          error: 'Payment declined by issuing bank',
          timestamp: new Date().toISOString()
        }
      });
      toast({
        title: "Payment Failed",
        description: "Payment was declined by the issuing bank.",
        variant: "destructive"
      });
      return { success: false, error: 'Payment declined by issuing bank' };
    }
  } catch (error) {
    updateExistingTransaction(transactions, transaction.id, {
      status: 'error',
      error: error.message || 'Unknown error occurred',
      completedAt: new Date().toISOString()
    }, setTransactions);
    toast({
      title: "Payment Error",
      description: error.message || "An unknown error occurred while processing payment.",
      variant: "destructive"
    });
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
};
