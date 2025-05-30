
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveState } from '@/services/storageService';

export const addReferral = (referrals, referralData, setReferrals, toast) => {
  const newReferral = { id: uuidv4(), ...referralData, createdAt: new Date().toISOString(), status: 'pending' };
  const updatedReferrals = [...referrals, newReferral];
  setReferrals(updatedReferrals);
  saveState('referrals', updatedReferrals);
  toast({ title: "Referral Added", description: "New referral has been recorded." });
  return newReferral;
};

export const updateReferral = (referrals, referralId, referralData, setReferrals, toast) => {
  const updatedReferrals = referrals.map(r => r.id === referralId ? { ...r, ...referralData } : r);
  setReferrals(updatedReferrals);
  saveState('referrals', updatedReferrals);
  toast({ title: "Referral Updated", description: "Referral status has been updated." });
};
