
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Edit, CheckCircle, Info, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import GatewayForm from '@/components/admin/PaymentGateways/GatewayForm';
import GatewayDetails from '@/components/admin/PaymentGateways/GatewayDetails';
import GatewayStatus from '@/components/admin/PaymentGateways/GatewayStatus';
import GatewayWebhookInfo from '@/components/admin/PaymentGateways/GatewayWebhookInfo';

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

const GatewayCard = ({ 
  gateway, 
  editingGateway, 
  formData, 
  handleEdit, 
  handleCancel, 
  handleSave, 
  handleChange, 
  handleToggleActive, 
  handleTestConnection 
}) => {
  return (
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
            Configure your {gateway.name} payment gateway credentials. All transactions use INR.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {editingGateway === gateway.id ? (
            <GatewayForm gateway={gateway} formData={formData} handleChange={handleChange} />
          ) : (
            <GatewayDetails gateway={gateway} />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {editingGateway === gateway.id ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => handleEdit(gateway)}>
                <Edit className="h-4 w-4 mr-2" /> Edit Configuration
              </Button>
              <Button 
                onClick={() => handleTestConnection(gateway)}
                disabled={
                  (gateway.name === 'PayU' && (!gateway.apiKey || !gateway.merchantId || !gateway.salt)) ||
                  (gateway.name === 'Razorpay' && (!gateway.apiKey || !gateway.keySecret))
                }
              >
                <CheckCircle className="h-4 w-4 mr-2" /> Test Connection
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <motion.div variants={itemVariants} className="mt-8">
        <GatewayStatus gateway={gateway} />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-8">
       <GatewayWebhookInfo gatewayName={gateway.name} />
      </motion.div>
    </motion.div>
  );
};

export default GatewayCard;
