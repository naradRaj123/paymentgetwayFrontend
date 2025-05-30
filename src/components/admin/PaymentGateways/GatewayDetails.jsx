
import React from 'react';
import { Info } from 'lucide-react';

const GatewayDetails = ({ gateway }) => {
  return (
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
        ) : ( // PlatformPayments or other
          <div className="flex justify-between items-center py-2 border-b">
            <span className="font-medium">Key Secret</span>
            <span className="text-sm">
              {gateway.keySecret ? "••••••••" : "Not configured"}
            </span>
          </div>
        )}
         <div className="flex justify-between items-center py-2 border-b">
          <span className="font-medium">Currency</span>
          <span className="text-sm font-semibold text-green-600">
            {gateway.currency || "INR"}
          </span>
        </div>
      </div>
      
      <div className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
        <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <p className="font-medium">Integration Guide</p>
          <p className="mt-1">
            {gateway.name === 'PayU' 
              ? "You'll need your Merchant ID, API Key, and Salt from your PayU dashboard."
              : `You'll need your API Key and Key Secret from your ${gateway.name} dashboard.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GatewayDetails;
