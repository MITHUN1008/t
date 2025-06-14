
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Payment Settings</h2>
        <p className="text-gray-400">Configure payment processing and billing</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-400" />
            Payment Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <p className="text-gray-400">Payment settings and integration</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSettings;
