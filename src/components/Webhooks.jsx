
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Webhook, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Copy, 
  CheckCircle2,
  Link,
  Globe,
  Key,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePayment } from '@/contexts/PaymentContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

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

  const handleAddWebhook = () => {
    if (!formData.url) {
      toast({
        title: "Validation Error",
        description: "Webhook URL is required",
        variant: "destructive"
      });
      return;
    }
    
    addWebhook(formData);
    setFormData({
      name: '',
      url: '',
      secret: '',
      events: ['all'],
      isActive: true
    });
  };

  const handleEdit = (webhook) => {
    setEditingWebhook(webhook.id);
    setFormData({ ...webhook });
  };

  const handleCancelEdit = () => {
    setEditingWebhook(null);
    setFormData({
      name: '',
      url: '',
      secret: '',
      events: ['all'],
      isActive: true
    });
  };

  const handleSaveEdit = () => {
    if (editingWebhook) {
      updateWebhook(editingWebhook, formData);
      setEditingWebhook(null);
      setFormData({
        name: '',
        url: '',
        secret: '',
        events: ['all'],
        isActive: true
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = (id, currentValue) => {
    updateWebhook(id, { isActive: !currentValue });
  };

  const handleDelete = (id) => {
    deleteWebhook(id);
  };

  const handleCopySecret = (secret) => {
    navigator.clipboard.writeText(secret);
    toast({
      title: "Copied to Clipboard",
      description: "Webhook secret has been copied to clipboard",
    });
  };

  const generateSecret = () => {
    const randomSecret = Array.from(window.crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    
    setFormData(prev => ({ ...prev, secret: randomSecret }));
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Webhook Management</h1>
          <p className="text-muted-foreground mt-1">
            Configure webhook endpoints for payment notifications
          </p>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Webhook
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[525px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Webhook</AlertDialogTitle>
              <AlertDialogDescription>
                Configure a new webhook endpoint to receive payment notifications
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Webhook Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="My Website Webhook"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">Webhook URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="pl-9"
                    placeholder="https://example.com/webhook"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="secret">Webhook Secret</Label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={generateSecret}
                    className="h-8 px-2 text-xs"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Generate
                  </Button>
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="secret"
                    name="secret"
                    value={formData.secret}
                    onChange={handleChange}
                    className="pl-9"
                    placeholder="Webhook secret for signature verification"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Used to verify webhook signatures. Keep this secret secure.
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Webhook Active</Label>
              </div>
            </div>
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddWebhook}>
                Add Webhook
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        {webhooks.length > 0 ? (
          webhooks.map((webhook) => (
            <motion.div key={webhook.id} variants={itemVariants}>
              <Card className="overflow-hidden">
                <div className={cn(
                  "h-1.5",
                  webhook.isActive ? "bg-green-500" : "bg-slate-300"
                )} />
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Webhook className="h-5 w-5 text-primary" />
                      <CardTitle>{webhook.name || 'Unnamed Webhook'}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`active-${webhook.id}`} className="text-sm mr-2">
                        {webhook.isActive ? "Active" : "Inactive"}
                      </Label>
                      <Switch
                        id={`active-${webhook.id}`}
                        checked={webhook.isActive}
                        onCheckedChange={() => handleToggleActive(webhook.id, webhook.isActive)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Created on {new Date(webhook.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {editingWebhook === webhook.id ? (
                    // Edit mode
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Webhook Name</Label>
                        <Input
                          id="edit-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="My Website Webhook"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-url">Webhook URL</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="edit-url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="pl-9"
                            placeholder="https://example.com/webhook"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="edit-secret">Webhook Secret</Label>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={generateSecret}
                            className="h-8 px-2 text-xs"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Generate New
                          </Button>
                        </div>
                        <div className="relative">
                          <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="edit-secret"
                            name="secret"
                            value={formData.secret}
                            onChange={handleChange}
                            className="pl-9"
                            placeholder="Webhook secret for signature verification"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Link className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Endpoint URL:</span>
                        <a 
                          href={webhook.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate max-w-md"
                        >
                          {webhook.url}
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Secret:</span>
                        <div className="flex items-center space-x-2">
                          <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">
                            {webhook.secret ? '••••••••••••••••' : 'No secret configured'}
                          </code>
                          {webhook.secret && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleCopySecret(webhook.secret)}
                              className="h-7 w-7 p-0"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Events:</span>
                        <span className="text-sm">
                          {webhook.events?.includes('all') ? 'All events' : webhook.events?.join(', ')}
                        </span>
                      </div>
                      
                      {!webhook.secret && (
                        <div className="flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-md">
                          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                              No webhook secret configured
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                              We recommend setting a secret to verify webhook signatures for enhanced security.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {editingWebhook === webhook.id ? (
                    <>
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleSaveEdit}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => handleEdit(webhook)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDelete(webhook.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants}>
            <Card className="border-dashed">
              <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center">
                <Webhook className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No webhooks configured</h3>
                <p className="text-muted-foreground mt-1 mb-4 max-w-md">
                  Webhooks allow your application to receive real-time notifications about payment events.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Webhook
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="sm:max-w-[525px]">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Add New Webhook</AlertDialogTitle>
                      <AlertDialogDescription>
                        Configure a new webhook endpoint to receive payment notifications
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Webhook Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="My Website Webhook"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="url">Webhook URL</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="pl-9"
                            placeholder="https://example.com/webhook"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="secret">Webhook Secret</Label>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={generateSecret}
                            className="h-8 px-2 text-xs"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Generate
                          </Button>
                        </div>
                        <div className="relative">
                          <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="secret"
                            name="secret"
                            value={formData.secret}
                            onChange={handleChange}
                            className="pl-9"
                            placeholder="Webhook secret for signature verification"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Used to verify webhook signatures. Keep this secret secure.
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isActive"
                          checked={formData.isActive}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                        />
                        <Label htmlFor="isActive">Webhook Active</Label>
                      </div>
                    </div>
                    
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleAddWebhook}>
                        Add Webhook
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
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
