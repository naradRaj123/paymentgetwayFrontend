
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { NavLink, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { FileText, UploadCloud, CheckCircle } from 'lucide-react';
import { usePayment } from '@/contexts/PaymentContext';

const MerchantKycPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { merchants, updateMerchantKyc } = usePayment(); 
  // Assuming the first merchant is the one to update KYC for demo
  const currentMerchant = merchants.length > 0 ? merchants[0] : null;

  const [formData, setFormData] = useState({
    panNumber: '',
    gstNumber: '',
    businessAddressProof: null,
    bankStatement: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    if (currentMerchant) {
        updateMerchantKyc(currentMerchant.id, formData);
    }
    
    setIsLoading(false);
    toast({
      title: "KYC Documents Submitted",
      description: "Your documents are under review. We'll notify you once verified.",
    });
    navigate('/merchant/login'); // Or to a KYC pending page
  };
  
  if (currentMerchant && currentMerchant.kycStatus === 'verified') {
      return (
          <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold mb-2">KYC Verified!</h1>
              <p className="text-muted-foreground mb-6">Your KYC documents have been successfully verified.</p>
              <Button asChild>
                  <NavLink to="/admin">Go to Merchant Dashboard</NavLink>
              </Button>
          </div>
      );
  }


  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 text-primary">
              <FileText size={40} />
            </div>
            <CardTitle className="text-3xl font-bold">Merchant KYC Verification</CardTitle>
            <CardDescription>Please provide the following documents to verify your business.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input id="panNumber" placeholder="Your Business PAN" value={formData.panNumber} onChange={handleChange} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                <Input id="gstNumber" placeholder="Your Business GSTIN" value={formData.gstNumber} onChange={handleChange} />
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="businessAddressProof">Business Address Proof</Label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="businessAddressProof" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 5MB)</p>
                        </div>
                        <Input id="businessAddressProof" type="file" className="hidden" onChange={handleChange} accept=".pdf,.png,.jpg,.jpeg" required />
                    </label>
                </div>
                {formData.businessAddressProof && <p className="text-xs text-green-600 mt-1">{formData.businessAddressProof.name} selected</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bankStatement">Bank Account Statement/Cancelled Cheque</Label>
                 <div className="flex items-center justify-center w-full">
                    <label htmlFor="bankStatement" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 5MB)</p>
                        </div>
                        <Input id="bankStatement" type="file" className="hidden" onChange={handleChange} accept=".pdf,.png,.jpg,.jpeg" required />
                    </label>
                </div>
                {formData.bankStatement && <p className="text-xs text-green-600 mt-1">{formData.bankStatement.name} selected</p>}
              </div>
              
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-background border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <UploadCloud className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Submitting Documents...' : 'Submit for Verification'}
              </Button>
            </form>
          </CardContent>
           <CardFooter className="text-center text-sm">
            <p className="text-muted-foreground">
             Verification may take up to 24-48 hours. We will notify you via email.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default MerchantKycPage;
