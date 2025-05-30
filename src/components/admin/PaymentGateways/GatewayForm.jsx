
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const GatewayForm = ({ gateway, formData, handleChange }) => {
  return (
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
        ) : ( // PlatformPayments or other
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
  );
};

export default GatewayForm;
