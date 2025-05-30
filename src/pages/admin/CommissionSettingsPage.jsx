
import React, { useState, useEffect } from 'react';
import { usePayment } from '@/contexts/PaymentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Percent, Save } from 'lucide-react';

const CommissionSettingsPage = () => {
  const { commissionSettings, updateCommissionSettings } = usePayment();
  const [settings, setSettings] = useState(commissionSettings);

  useEffect(() => {
    setSettings(commissionSettings);
  }, [commissionSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSave = () => {
    updateCommissionSettings(settings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Commission Settings</h1>
        <p className="text-muted-foreground">Configure deduction and commission charges for payment gateways.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center"><Percent className="mr-2 h-5 w-5 text-primary" /> Gateway Commissions</CardTitle>
          <CardDescription>Set the percentage-based and fixed fees for transactions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="payuPercentage">PayU Percentage (%)</Label>
              <Input 
                id="payuPercentage" 
                name="payuPercentage" 
                type="number" 
                step="0.01"
                value={settings.payuPercentage} 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="razorpayPercentage">Razorpay Percentage (%)</Label>
              <Input 
                id="razorpayPercentage" 
                name="razorpayPercentage" 
                type="number" 
                step="0.01"
                value={settings.razorpayPercentage} 
                onChange={handleChange} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fixedFee">Fixed Fee (per transaction)</Label>
            <Input 
              id="fixedFee" 
              name="fixedFee" 
              type="number" 
              step="0.01"
              value={settings.fixedFee} 
              onChange={handleChange} 
            />
             <p className="text-xs text-muted-foreground">This fee is applied in addition to the percentage fee.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Commission Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CommissionSettingsPage;
