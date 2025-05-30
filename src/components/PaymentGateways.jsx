
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Edit, 
  Save, 
  X,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePayment } from '@/contexts/PaymentContext';
import { useToast } from '@/components/ui/use-toast';

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
      setEditingGateway(null);
      setFormData({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = (id, currentValue) => {
    updatePaymentGateway(id, { isActive: !currentValue });
  };

  const handleTestConnection = (gateway) => {
    // Simulate API connection test
    toast({
      title: "Testing Connection",
      description: `Connecting to ${gateway.name}...`,
    });
    
    setTimeout(() => {
      if (gateway.name === 'PayU' && gateway.apiKey && gateway.merchantId && gateway.salt) {
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${gateway.name} API.`,
        });
      } else if (gateway.name === 'Razorpay' && gateway.apiKey && gateway.keySecret) {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Gateways</h1>
        <p className="text-muted-foreground mt-1">
          Configure and manage your payment gateway integrations
        </p>
      </div>

      <Tabs defaultValue="payu" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="payu">PayU Integration</TabsTrigger>
          <TabsTrigger value="razorpay">Razorpay Integration</TabsTrigger>
        </TabsList>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {paymentGateways.map((gateway) => (
            <TabsContent key={gateway.id} value={gateway.name.toLowerCase()}>
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <CardTitle>{gateway.name} Integration</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`active-${gateway.id}`} className="text-sm mr-2">
                          {gateway.isActive ? "Active" : "Inactive"}
                        </Label>
                        <Switch
                          id={`active-${gateway.id}`}
                          checked={gateway.isActive}
                          onCheckedChange={() => handleToggleActive(gateway.id, gateway.isActive)}
                        />
                      </div>
                    </div>
                    <CardDescription>
                      Configure your {gateway.name} payment gateway credentials
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {editingGateway === gateway.id ? (
                      // Edit mode
                      <div className="space-y-4">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="apiKey">API Key</Label>
                            <Input
                              id="apiKey"
                              name="apiKey"
                              value={formData.apiKey || ''}
                              onChange={handleChange}
                              placeholder={`Your ${gateway.name} API Key`}
                            />
                          </div>
                          
                          {gateway.name === 'PayU' ? (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="merchantId">Merchant ID</Label>
                                <Input
                                  id="merchantId"
                                  name="merchantId"
                                  value={formData.merchantId || ''}
                                  onChange={handleChange}
                                  placeholder="Your Merchant ID"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="salt">Salt</Label>
                                <Input
                                  id="salt"
                                  name="salt"
                                  value={formData.salt || ''}
                                  onChange={handleChange}
                                  placeholder="Your Salt Key"
                                  type="password"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="space-y-2">
                              <Label htmlFor="keySecret">Key Secret</Label>
                              <Input
                                id="keySecret"
                                name="keySecret"
                                value={formData.keySecret || ''}
                                onChange={handleChange}
                                placeholder="Your Key Secret"
                                type="password"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // View mode
                      <div className="space-y-4">
                        <div className="grid gap-4">
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">API Key</span>
                            <span className="text-sm">
                              {gateway.apiKey ? 
                                `${gateway.apiKey.substring(0, 4)}...${gateway.apiKey.substring(gateway.apiKey.length - 4)}` : 
                                "Not configured"}
                            </span>
                          </div>
                          
                          {gateway.name === 'PayU' ? (
                            <>
                              <div className="flex justify-between items-center py-2 border-b">
                                <span className="font-medium">Merchant ID</span>
                                <span className="text-sm">
                                  {gateway.merchantId || "Not configured"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b">
                                <span className="font-medium">Salt</span>
                                <span className="text-sm">
                                  {gateway.salt ? "••••••••" : "Not configured"}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="font-medium">Key Secret</span>
                              <span className="text-sm">
                                {gateway.keySecret ? "••••••••" : "Not configured"}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                          <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            <p className="font-medium">Integration Guide</p>
                            <p className="mt-1">
                              {gateway.name === 'PayU' 
                                ? "You'll need your Merchant ID, API Key, and Salt from your PayU dashboard."
                                : "You'll need your API Key and Key Secret from your Razorpay dashboard."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {editingGateway === gateway.id ? (
                      <>
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => handleEdit(gateway)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Configuration
                        </Button>
                        <Button 
                          onClick={() => handleTestConnection(gateway)}
                          disabled={
                            (gateway.name === 'PayU' && (!gateway.apiKey || !gateway.merchantId || !gateway.salt)) ||
                            (gateway.name === 'Razorpay' && (!gateway.apiKey || !gateway.keySecret))
                          }
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Test Connection
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Status</CardTitle>
                    <CardDescription>
                      Current status of your {gateway.name} integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      {gateway.isActive && 
                       ((gateway.name === 'PayU' && gateway.apiKey && gateway.merchantId && gateway.salt) ||
                        (gateway.name === 'Razorpay' && gateway.apiKey && gateway.keySecret)) ? (
                        <>
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Integration Active</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your {gateway.name} integration is properly configured and active.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                            <AlertCircle className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Configuration Incomplete</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {!gateway.isActive 
                                ? `Your ${gateway.name} integration is currently inactive.` 
                                : `Please complete the ${gateway.name} configuration to activate this gateway.`}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Configuration</CardTitle>
                    <CardDescription>
                      Setup webhook endpoints for {gateway.name} payment notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-800/50">
                      <h3 className="font-medium mb-2">Your Webhook URL</h3>
                      <div className="flex">
                        <Input 
                          readOnly 
                          value={`https://yourdomain.com/api/webhooks/${gateway.name.toLowerCase()}`} 
                          className="bg-white dark:bg-slate-900"
                        />
                        <Button variant="outline" className="ml-2">
                          Copy
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Add this URL to your {gateway.name} dashboard to receive payment notifications.
                      </p>
                    </div>
                    
                    <div className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                      <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        <p>
                          Configure this webhook in your {gateway.name} dashboard to receive real-time payment notifications.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </motion.div>
      </Tabs>
    </div>
  );
};

export default PaymentGateways;
