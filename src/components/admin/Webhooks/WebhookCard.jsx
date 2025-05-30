
import React from 'react';
import { motion } from 'framer-motion';
import { Webhook, Edit, Save, X, Trash2, Copy, Link, Key, CheckCircle2, Globe, AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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

const WebhookCard = ({ 
    webhook, 
    editingWebhook, 
    formData, 
    handleEdit, 
    handleCancelEdit, 
    handleSaveEdit, 
    handleChange, 
    handleToggleActive, 
    handleDelete, 
    handleCopySecret,
    generateSecret
}) => {
  return (
    <motion.div variants={itemVariants}>
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Webhook Name</Label>
                <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} placeholder="My Website Webhook" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-url">Webhook URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="edit-url" name="url" value={formData.url} onChange={handleChange} className="pl-9" placeholder="https://example.com/webhook" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="edit-secret">Webhook Secret</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={generateSecret} className="h-8 px-2 text-xs">
                    <RefreshCw className="h-3 w-3 mr-1" /> Generate New
                  </Button>
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="edit-secret" name="secret" value={formData.secret} onChange={handleChange} className="pl-9" placeholder="Webhook secret for signature verification" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Link className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Endpoint URL:</span>
                <a href={webhook.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-md">
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
                    <Button variant="ghost" size="sm" onClick={() => handleCopySecret(webhook.secret)} className="h-7 w-7 p-0">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Events:</span>
                <span className="text-sm">{webhook.events?.includes('all') ? 'All events' : webhook.events?.join(', ')}</span>
              </div>
              {!webhook.secret && (
                <div className="flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">No webhook secret configured</p>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">We recommend setting a secret to verify webhook signatures for enhanced security.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {editingWebhook === webhook.id ? (
            <>
              <Button variant="outline" onClick={handleCancelEdit}><X className="h-4 w-4 mr-2" />Cancel</Button>
              <Button onClick={handleSaveEdit}><Save className="h-4 w-4 mr-2" />Save Changes</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => handleEdit(webhook)}><Edit className="h-4 w-4 mr-2" />Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(webhook.id)}><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default WebhookCard;
