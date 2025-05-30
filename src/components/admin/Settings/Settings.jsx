
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Save, 
  Shield, 
  Globe, 
  Bell, 
  Key,
  RefreshCw,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Your Company',
    supportEmail: 'support@example.com',
    defaultCurrency: 'USD',
    notificationsEnabled: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    ipWhitelist: '',
    webhookSigningEnabled: true,
    apiKeyRotationDays: 90,
    twoFactorRequired: false
  });
  
  const [webhookSettings, setWebhookSettings] = useState({
    retryFailedWebhooks: true,
    maxRetries: 3,
    retryInterval: 60,
    logWebhookEvents: true
  });

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleWebhookChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWebhookSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = (settingType) => {
    toast({
      title: "Settings Saved",
      description: `Your ${settingType} settings have been updated successfully.`,
    });
  };

  const generateApiKey = () => {
    const randomKey = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    
    toast({
      title: "API Key Generated",
      description: "A new API key has been generated. Make sure to save it securely.",
    });
    
    return randomKey;
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
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your payment gateway platform settings
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TabsContent value="general">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <SettingsIcon className="h-5 w-5 text-primary" />
                    <CardTitle>General Settings</CardTitle>
                  </div>
                  <CardDescription>
                    Configure basic settings for your payment platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={generalSettings.companyName}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input
                        id="supportEmail"
                        name="supportEmail"
                        type="email"
                        value={generalSettings.supportEmail}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="defaultCurrency">Default Currency</Label>
                      <Input
                        id="defaultCurrency"
                        name="defaultCurrency"
                        value={generalSettings.defaultCurrency}
                        onChange={handleGeneralChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Three-letter ISO currency code (e.g., USD, EUR, GBP)
                      </p>
                    </div>
                    
                    <div className="space-y-2 flex items-end pb-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="notificationsEnabled"
                          name="notificationsEnabled"
                          checked={generalSettings.notificationsEnabled}
                          onCheckedChange={(checked) => 
                            setGeneralSettings(prev => ({ ...prev, notificationsEnabled: checked }))
                          }
                        />
                        <Label htmlFor="notificationsEnabled">Email Notifications</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                    <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      <p className="font-medium">Platform Information</p>
                      <p className="mt-1">
                        These settings affect how your payment platform operates and communicates with users.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveSettings('general')}>
                    <Save className="h-4 w-4 mr-2" />
                    Save General Settings
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="security">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle>Security Settings</CardTitle>
                  </div>
                  <CardDescription>
                    Configure security settings for your payment platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ipWhitelist">IP Whitelist (Optional)</Label>
                    <Input
                      id="ipWhitelist"
                      name="ipWhitelist"
                      value={securitySettings.ipWhitelist}
                      onChange={handleSecurityChange}
                      placeholder="Comma-separated list of allowed IPs"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave empty to allow all IPs, or enter comma-separated IPs to restrict access
                    </p>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="apiKeyRotationDays">API Key Rotation (Days)</Label>
                      <Input
                        id="apiKeyRotationDays"
                        name="apiKeyRotationDays"
                        type="number"
                        value={securitySettings.apiKeyRotationDays}
                        onChange={handleSecurityChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Number of days before API keys should be rotated
                      </p>
                    </div>
                    
                    <div className="space-y-4 flex flex-col justify-end">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="webhookSigningEnabled"
                          name="webhookSigningEnabled"
                          checked={securitySettings.webhookSigningEnabled}
                          onCheckedChange={(checked) => 
                            setSecuritySettings(prev => ({ ...prev, webhookSigningEnabled: checked }))
                          }
                        />
                        <Label htmlFor="webhookSigningEnabled">Enable Webhook Signatures</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="twoFactorRequired"
                          name="twoFactorRequired"
                          checked={securitySettings.twoFactorRequired}
                          onCheckedChange={(checked) => 
                            setSecuritySettings(prev => ({ ...prev, twoFactorRequired: checked }))
                          }
                        />
                        <Label htmlFor="twoFactorRequired">Require Two-Factor Authentication</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>API Key Management</Label>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={generateApiKey}
                        className="flex-1"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Generate New API Key
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1"
                      >
                        <Key className="h-4 w-4 mr-2" />
                        View API Keys
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                    <Shield className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                    <div className="text-sm text-amber-700 dark:text-amber-300">
                      <p className="font-medium">Security Recommendation</p>
                      <p className="mt-1">
                        We recommend enabling webhook signatures and regular API key rotation for enhanced security.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveSettings('security')}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <CardTitle>Webhook Settings</CardTitle>
                  </div>
                  <CardDescription>
                    Configure how webhooks are processed and delivered
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="retryFailedWebhooks"
                      name="retryFailedWebhooks"
                      checked={webhookSettings.retryFailedWebhooks}
                      onCheckedChange={(checked) => 
                        setWebhookSettings(prev => ({ ...prev, retryFailedWebhooks: checked }))
                      }
                    />
                    <Label htmlFor="retryFailedWebhooks">Retry Failed Webhooks</Label>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="maxRetries">Maximum Retry Attempts</Label>
                      <Input
                        id="maxRetries"
                        name="maxRetries"
                        type="number"
                        value={webhookSettings.maxRetries}
                        onChange={handleWebhookChange}
                        disabled={!webhookSettings.retryFailedWebhooks}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="retryInterval">Retry Interval (seconds)</Label>
                      <Input
                        id="retryInterval"
                        name="retryInterval"
                        type="number"
                        value={webhookSettings.retryInterval}
                        onChange={handleWebhookChange}
                        disabled={!webhookSettings.retryFailedWebhooks}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="logWebhookEvents"
                      name="logWebhookEvents"
                      checked={webhookSettings.logWebhookEvents}
                      onCheckedChange={(checked) => 
                        setWebhookSettings(prev => ({ ...prev, logWebhookEvents: checked }))
                      }
                    />
                    <Label htmlFor="logWebhookEvents">Log Webhook Events</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Webhook Testing</Label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Bell className="h-4 w-4 mr-2" />
                        Send Test Webhook
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Send a test webhook to verify your endpoint configuration
                    </p>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                    <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      <p className="font-medium">Webhook Best Practices</p>
                      <p className="mt-1">
                        Ensure your webhook endpoints respond with a 2xx status code within 5 seconds to prevent retries.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveSettings('webhook')}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Webhook Settings
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
};

export default Settings;
