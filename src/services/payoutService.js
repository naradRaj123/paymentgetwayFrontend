
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveState } from '@/services/storageService';

export const createNewPayout = (payouts, payoutData, setPayouts, toast) => {
  const newPayout = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...payoutData
  };
  const updatedPayouts = [newPayout, ...payouts];
  setPayouts(updatedPayouts);
  saveState('payouts', updatedPayouts);
  toast({
    title: "Payout Created",
    description: "New payout request has been created successfully.",
  });
  return newPayout;
};

export const updateExistingPayout = (payouts, id, data, setPayouts, toast) => {
  const updatedPayouts = payouts.map(payout =>
    payout.id === id ? { ...payout, ...data } : payout
  );
  setPayouts(updatedPayouts);
  saveState('payouts', updatedPayouts);
  toast({
    title: "Payout Updated",
    description: "Payout status has been updated successfully.",
  });
};
