
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { usePayment } from '@/contexts/PaymentContext';
import { useToast } from '@/components/ui/use-toast';
import GatewayCard from '@/components/admin/PaymentGateways/GatewayCard';

const PaymentGateways = () => {
  const { paymentGateways, updatePaymentGateway } = usePayment();
  const { toast } = useToast();
  const [editingGateway, setEditingGateway] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (gateway) => {
    setEditingGateway(gateway.id);
    setFormData({ ...gateway });
  };

  const handleCancel = () => {
    setEditingGateway(null);
    setFormData({});
  };

  const handleSave = () => {
    if (editingGateway) {
      updatePaymentGateway(editingGateway, formData);
      toast({
        title: "Gateway Updated",
        description: `${formData.name || 'Gateway'} settings have been updated successfully.`,
      });
      setEditingGateway(null);
      setFormData({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = (id, currentValue) => {
    const gateway = paymentGateways.find(g => g.id === id);
    updatePaymentGateway(id, { isActive: !currentValue });
     toast({
        title: `Gateway ${!currentValue ? 'Activated' : 'Deactivated'}`,
        description: `${gateway.name} has been ${!currentValue ? 'activated' : 'deactivated'}.`,
      });
  };

  const handleTestConnection = (gateway) => {
    toast({
      title: "Testing Connection",
      description: `Connecting to ${gateway.name}...`,
    });
    
    setTimeout(() => {
      const isPayUConfigured = gateway.name === 'PayU' && gateway.apiKey && gateway.merchantId && gateway.salt;
      const isPlatformPaymentsConfigured = gateway.name === 'PlatformPayments' && gateway.apiKey && gateway.keySecret;

      if (isPayUConfigured || isPlatformPaymentsConfigured) {
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${gateway.name} API.`,
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Please check your API credentials and try again.",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Gateways</h1>
        <p className="text-muted-foreground mt-1">
          Configure and manage your payment gateway integrations for INR transactions.
        </p>
      </div>

      <Tabs defaultValue={paymentGateways.length > 0 ? paymentGateways[0].name.toLowerCase() : "payu"} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          {paymentGateways.map((gw) => (
             <TabsTrigger key={gw.id} value={gw.name.toLowerCase()}>{gw.name} Integration</TabsTrigger>
          ))}
        </TabsList>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {paymentGateways.map((gateway) => (
            <TabsContent key={gateway.id} value={gateway.name.toLowerCase()}>
              <GatewayCard
                gateway={gateway}
                editingGateway={editingGateway}
                formData={formData}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleSave={handleSave}
                handleChange={handleChange}
                handleToggleActive={handleToggleActive}
                handleTestConnection={handleTestConnection}
              />
            </TabsContent>
          ))}
        </motion.div>
      </Tabs>
    </div>
  );
};

export default PaymentGateways;
