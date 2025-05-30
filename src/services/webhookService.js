
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveState } from '@/services/storageService';

export const addNewWebhook = (webhooks, webhookData, setWebhooks, toast) => {
  const newWebhook = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...webhookData
  };
  const updatedWebhooks = [...webhooks, newWebhook];
  setWebhooks(updatedWebhooks);
  saveState('webhooks', updatedWebhooks);
  toast({
    title: "Webhook Added",
    description: "New webhook endpoint has been added successfully.",
  });
  return newWebhook;
};

export const updateExistingWebhook = (webhooks, id, data, setWebhooks, toast) => {
  const updatedWebhooks = webhooks.map(webhook =>
    webhook.id === id ? { ...webhook, ...data } : webhook
  );
  setWebhooks(updatedWebhooks);
  saveState('webhooks', updatedWebhooks);
  toast({
    title: "Webhook Updated",
    description: "Webhook settings have been updated successfully.",
  });
};

export const removeWebhook = (webhooks, id, setWebhooks, toast) => {
  const updatedWebhooks = webhooks.filter(webhook => webhook.id !== id);
  setWebhooks(updatedWebhooks);
  saveState('webhooks', updatedWebhooks);
  toast({
    title: "Webhook Deleted",
    description: "Webhook has been removed successfully.",
  });
};

export const notifyWebhooksSimulated = (webhooks, eventData) => {
  const relevantWebhooks = webhooks.filter(webhook =>
    webhook.isActive &&
    (webhook.events.includes('all') || webhook.events.includes(eventData.event))
  );
  relevantWebhooks.forEach(webhook => {
    console.log(`Simulating notification to webhook ${webhook.url} about event ${eventData.event}`, eventData);
  });
};
