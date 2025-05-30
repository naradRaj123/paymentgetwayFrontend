
import React from 'react';
import { saveState } from '@/services/storageService';

export const updateCommissionSettings = (settings, setSettings, toast) => {
  saveState('commissionSettings', settings);
  setSettings(settings);
  toast({ title: "Commissions Updated", description: "Commission settings have been updated." });
};
