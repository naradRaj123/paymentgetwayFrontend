
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const GatewayWebhookInfo = ({ gatewayName }) => {
  const { toast } = useToast();
  const webhookUrl = `https://yourdomain.com/api/webhooks/${gatewayName.toLowerCase()}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "Copied to Clipboard",
      description: "Webhook URL has been copied.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhook Configuration</CardTitle>
        <CardDescription>
          Setup webhook endpoints for {gatewayName} payment notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-medium mb-2">Your Webhook URL for {gatewayName}</h3>
          <div className="flex">
            <Input 
              readOnly 
              value={webhookUrl} 
              className="bg-white dark:bg-slate-900"
            />
            <Button variant="outline" className="ml-2" onClick={handleCopyUrl}>
              Copy
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Add this URL to your {gatewayName} dashboard to receive payment notifications.
          </p>
        </div>
        
        <div className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
          <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p>
              Configure this webhook in your {gatewayName} dashboard to receive real-time payment notifications. This ensures your system stays updated on transaction statuses for INR payments.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GatewayWebhookInfo;
