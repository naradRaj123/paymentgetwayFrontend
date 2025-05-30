
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Webhook as WebhookIconMain, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePayment } from '@/contexts/PaymentContext';
import { useToast } from '@/components/ui/use-toast';
import WebhookCard from '@/components/admin/Webhooks/WebhookCard';
import AddWebhookDialog from '@/components/admin/Webhooks/AddWebhookDialog';
import { 
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const Webhooks = () => {
  const { webhooks, addWebhook, updateWebhook, deleteWebhook } = usePayment();
  const { toast } = useToast();
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    secret: '',
    events: ['all'],
    isActive: true
  });

  const resetFormData = () => {
    setFormData({ name: '', url: '', secret: '', events: ['all'], isActive: true });
  };

  const handleAddWebhook = () => {
    if (!formData.url) {
      toast({ title: "Validation Error", description: "Webhook URL is required", variant: "destructive" });
      return;
    }
    addWebhook(formData);
    resetFormData();
  };

  const handleEdit = (webhook) => {
    setEditingWebhook(webhook.id);
    setFormData({ ...webhook });
  };

  const handleCancelEdit = () => {
    setEditingWebhook(null);
    resetFormData();
  };

  const handleSaveEdit = () => {
    if (editingWebhook) {
      updateWebhook(editingWebhook, formData);
      setEditingWebhook(null);
      resetFormData();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = (id, currentValue) => {
    const webhook = webhooks.find(w => w.id === id);
    updateWebhook(id, { isActive: !currentValue });
    toast({
      title: `Webhook ${!currentValue ? 'Activated' : 'Deactivated'}`,
      description: `${webhook.name || 'Webhook'} has been ${!currentValue ? 'activated' : 'deactivated'}.`,
    });
  };

  const handleDelete = (id) => {
    deleteWebhook(id);
  };

  const handleCopySecret = (secret) => {
    navigator.clipboard.writeText(secret);
    toast({ title: "Copied to Clipboard", description: "Webhook secret has been copied to clipboard" });
  };

  const generateSecret = () => {
    const randomSecret = Array.from(window.crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    setFormData(prev => ({ ...prev, secret: randomSecret }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Webhook Management</h1>
          <p className="text-muted-foreground mt-1">Configure webhook endpoints for payment notifications</p>
        </div>
        <AddWebhookDialog
          formData={formData}
          handleChange={handleChange}
          handleAddWebhook={handleAddWebhook}
          generateSecret={generateSecret}
          setFormData={setFormData}
        />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-6">
        {webhooks.length > 0 ? (
          webhooks.map((webhook) => (
            <WebhookCard
              key={webhook.id}
              webhook={webhook}
              editingWebhook={editingWebhook}
              formData={editingWebhook === webhook.id ? formData : webhook} 
              handleEdit={handleEdit}
              handleCancelEdit={handleCancelEdit}
              handleSaveEdit={handleSaveEdit}
              handleChange={handleChange}
              handleToggleActive={handleToggleActive}
              handleDelete={handleDelete}
              handleCopySecret={handleCopySecret}
              generateSecret={generateSecret}
            />
          ))
        ) : (
          <motion.div variants={itemVariants}>
            <Card className="border-dashed">
              <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center">
                <WebhookIconMain className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No webhooks configured</h3>
                <p className="text-muted-foreground mt-1 mb-4 max-w-md">Webhooks allow your application to receive real-time notifications about payment events.</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button><Plus className="mr-2 h-4 w-4" />Add Your First Webhook</Button>
                  </AlertDialogTrigger>
                   <AddWebhookDialog /* This will open the same dialog but initiated from here */
                      formData={formData} 
                      handleChange={handleChange}
                      handleAddWebhook={handleAddWebhook}
                      generateSecret={generateSecret}
                      setFormData={setFormData}
                    />
                </AlertDialog>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Webhooks;
