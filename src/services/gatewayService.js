
import React from 'react';
import { saveState } from '@/services/storageService';

export const updateGateway = (gateways, id, data, setGateways, toast) => {
  const updatedGateways = gateways.map(gateway =>
    gateway.id === id ? { ...gateway, ...data } : gateway
  );
  setGateways(updatedGateways);
  saveState('paymentGateways', updatedGateways);
  toast({
    title: "Gateway Updated",
    description: "Payment gateway settings have been updated successfully.",
  });
};
