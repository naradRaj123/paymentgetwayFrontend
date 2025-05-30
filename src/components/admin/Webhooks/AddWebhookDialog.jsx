
import React from 'react';
import { Plus, Globe, Key, RefreshCw } from 'lucide-react';
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

const AddWebhookDialog = ({ formData, handleChange, handleAddWebhook, generateSecret, setFormData }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Plus className="mr-2 h-4 w-4" /> Add New Webhook
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[525px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Webhook</AlertDialogTitle>
          <AlertDialogDescription>Configure a new webhook endpoint to receive payment notifications</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Webhook Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="My Website Webhook" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Webhook URL</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="url" name="url" value={formData.url} onChange={handleChange} className="pl-9" placeholder="https://example.com/webhook" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="secret">Webhook Secret</Label>
              <Button type="button" variant="ghost" size="sm" onClick={generateSecret} className="h-8 px-2 text-xs">
                <RefreshCw className="h-3 w-3 mr-1" /> Generate
              </Button>
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="secret" name="secret" value={formData.secret} onChange={handleChange} className="pl-9" placeholder="Webhook secret for signature verification" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Used to verify webhook signatures. Keep this secret secure.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="isActive" checked={formData.isActive} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))} />
            <Label htmlFor="isActive">Webhook Active</Label>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddWebhook}>Add Webhook</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddWebhookDialog;
