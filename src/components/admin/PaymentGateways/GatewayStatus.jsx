
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

const GatewayStatus = ({ gateway }) => {
  const isConfigured = 
    (gateway.name === 'PayU' && gateway.apiKey && gateway.merchantId && gateway.salt) ||
    (gateway.name === 'PlatformPayments' && gateway.apiKey && gateway.keySecret);
  const isActiveAndConfigured = gateway.isActive && isConfigured;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Status</CardTitle>
        <CardDescription>
          Current status of your {gateway.name} integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          {isActiveAndConfigured ? (
            <>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Integration Active</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your {gateway.name} integration is properly configured and active for INR transactions.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Configuration Incomplete or Inactive</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {!gateway.isActive 
                    ? `Your ${gateway.name} integration is currently inactive.` 
                    : `Please complete the ${gateway.name} configuration to activate this gateway for INR transactions.`}
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GatewayStatus;
