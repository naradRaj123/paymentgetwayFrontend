
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { PaymentProvider } from '@/contexts/PaymentContext';

import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/components/admin/Dashboard';
import PaymentGatewaysPage from '@/pages/admin/PaymentGatewaysPage';
import PayoutsPage from '@/pages/admin/PayoutsPage';
import WebhooksPage from '@/pages/admin/WebhooksPage';
import TransactionsPage from '@/pages/admin/TransactionsPage';
import SettingsPage from '@/pages/admin/SettingsPage';
import ManageUsersPage from '@/pages/admin/ManageUsersPage';
import ManageManagersPage from '@/pages/admin/ManageManagersPage';
import ManageMerchantsPage from '@/pages/admin/ManageMerchantsPage';
import CommissionSettingsPage from '@/pages/admin/CommissionSettingsPage';
import ReferralSystemPage from '@/pages/admin/ReferralSystemPage';

import PublicLayout from '@/components/public/PublicLayout';
import HomePage from '@/pages/public/HomePage';
import AboutPage from '@/pages/public/AboutPage';
import ContactPage from '@/pages/public/ContactPage';
import LoginPage from '@/pages/public/LoginPage'; 
import MerchantLoginPage from '@/pages/public/merchant/MerchantLoginPage';
import MerchantRegisterPage from '@/pages/public/merchant/MerchantRegisterPage';
import MerchantKycPage from '@/pages/public/merchant/MerchantKycPage';
import PrivacyPolicyPage from '@/pages/public/PrivacyPolicyPage';
import TermsPage from '@/pages/public/TermsPage';
import DeveloperPortalPage from '@/pages/developer/DeveloperPortalPage';
import BlogPage from '@/pages/public/BlogPage';
import BlogPostPage from '@/pages/public/BlogPostPage';
import GenericPage from '@/pages/public/GenericPage'; 

const routeMappings = [
  { path: "payment-aggregator", title: "Payment Aggregator" },
  { path: "payment-gateway", title: "Payment Gateway" },
  { path: "payment-pages", title: "Payment Pages" },
  { path: "payment-links", title: "Payment Links" },
  { path: "pos-solutions", title: "POS Solutions" }, 
  { path: "qr-codes", title: "QR Codes" },
  { path: "subscriptions", title: "Subscriptions" },
  { path: "smart-collect", title: "Smart Collect" },
  { path: "optimizer", title: "Optimizer" },
  { path: "instant-settlements", title: "Instant Settlements" },
  { path: "payroll-solutions", title: "Payroll Solutions" }, 
  { path: "refer-and-earn", title: "Refer and Earn" },
  { path: "onboarding-apis", title: "Onboarding APIs" },
  { path: "route", title: "Route" },
  { path: "invoices", title: "Invoices" },
  { path: "freelancer-payments", title: "Freelancer Payments" },
  { path: "international-payments", title: "International Payments" },
  { path: "flash-checkout", title: "Flash Checkout" },
  { path: "upi", title: "UPI Payments" },
  { path: "epos", title: "ePOS Solutions" },
  { path: "checkout-demo", title: "Checkout Demo" },
  { path: "banking-plus", title: "Banking Plus" },
  { path: "source-to-pay", title: "Source to Pay" },
  { path: "current-accounts", title: "Current Accounts" },
  { path: "payouts-product", title: "Payouts Product" },
  { path: "payout-links-product", title: "Payout Links Product" },
  { path: "corporate-credit-card", title: "Corporate Credit Card" },
  { path: "docs", title: "Developer Docs" },
  { path: "integrations", title: "Integrations" },
  { path: "api-reference", title: "API Reference" },
  { path: "learn", title: "Learn Center" },
  { path: "customer-stories", title: "Customer Stories" },
  { path: "events", title: "Events" },
  { path: "chargeback-guide", title: "Chargeback Guide" },
  { path: "settlement-guide", title: "Settlement Guide" },
  { path: "education", title: "Solutions for Education" },
  { path: "e-commerce", title: "Solutions for E-commerce" },
  { path: "saas", title: "Solutions for SaaS" },
  { path: "bfsi", title: "Solutions for BFSI" },
  { path: "gst-calculator", title: "GST Calculator" },
  { path: "gst-number-search", title: "GST Number Search" },
  { path: "gst-search-by-pan", title: "GST Search by PAN" },
  { path: "roi-calculator", title: "ROI Calculator" },
  { path: "cagr-calculator", title: "CAGR Calculator" },
  { path: "ebitda-calculator", title: "EBITDA Calculator" },
  { path: "careers", title: "Careers" },
  { path: "grievance-redressal", title: "Grievance Redressal" },
  { path: "responsible-disclosure", title: "Responsible Disclosure" },
  { path: "partners", title: "Partners" },
  { path: "white-papers", title: "White Papers" },
  { path: "corporate-information", title: "Corporate Information" },
  { path: "support", title: "Support Center" },
  { path: "knowledge-base", title: "Knowledge Base" }
];


function App() {
  return (
    <PaymentProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} /> 
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} /> 
              <Route path="/merchant/login" element={<MerchantLoginPage />} />
              <Route path="/merchant/register" element={<MerchantRegisterPage />} />
              <Route path="/merchant/kyc" element={<MerchantKycPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/developer" element={<DeveloperPortalPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {routeMappings.map(({ path, title }) => (
                <Route key={path} path={`/${path}`} element={<GenericPage pageTitle={title} />} />
              ))}
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="payment-gateways" element={<PaymentGatewaysPage />} />
              <Route path="payouts" element={<PayoutsPage />} />
              <Route path="webhooks" element={<WebhooksPage />} />
              <Route path="transactions" element={<TransactionsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="users" element={<ManageUsersPage />} />
              <Route path="managers" element={<ManageManagersPage />} />
              <Route path="merchants" element={<ManageMerchantsPage />} />
              <Route path="commissions" element={<CommissionSettingsPage />} />
              <Route path="referrals" element={<ReferralSystemPage />} />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </Router>
    </PaymentProvider>
  );
}

export default App;
