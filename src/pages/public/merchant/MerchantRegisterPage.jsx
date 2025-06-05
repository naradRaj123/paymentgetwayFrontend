
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { NavLink, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, Building, Briefcase } from 'lucide-react';
import { usePayment } from '@/contexts/PaymentContext';

const MerchantRegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addMerchant } = usePayment();
  const [formData, setFormData] = useState({
    contactName: '',
    businessEmail: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessType: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Registration Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addMerchant({
      name: formData.contactName,
      email: formData.businessEmail,
      companyName: formData.companyName,
      businessType: formData.businessType,
      // password should be handled by a backend in real app
    });

    setIsLoading(false);
    toast({
      title: "Registration Successful",
      description: "Your merchant account has been created. Please complete KYC.",
    });
    navigate('/merchant/kyc'); 
  };

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-lg shadow-2xl">
          <CardHeader className="text-center">
             <div className="mx-auto mb-4 text-primary">
              <UserPlus size={40} />
            </div>
            <CardTitle className="text-3xl font-bold">Create Merchant Account</CardTitle>
            <CardDescription>Join  and start accepting payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="contactName">Contact Person Name</Label>
                   <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="contactName" placeholder="Your Name" value={formData.contactName} onChange={handleChange} required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="businessEmail" type="email" placeholder="business@example.com" value={formData.businessEmail} onChange={handleChange} required className="pl-10" />
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                   <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="companyName">Company Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="companyName" placeholder="Your Company Pvt. Ltd." value={formData.companyName} onChange={handleChange} required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="businessType">Type of Business</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="businessType" placeholder="e.g., E-commerce, SaaS" value={formData.businessType} onChange={handleChange} required className="pl-10" />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-background border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have a merchant account?{' '}
              <NavLink to="/merchant/login" className="font-medium text-primary hover:underline">
                Sign In
              </NavLink>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default MerchantRegisterPage;
