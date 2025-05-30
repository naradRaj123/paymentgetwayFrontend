
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, BookOpen, Zap, Download } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Placeholder for WebhookIcon if not already imported
const WebhookIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 10c-2.5 0-4.5 2-4.5 4.5S15.5 19 18 19s4.5-2 4.5-4.5S20.5 10 18 10Z"/><path d="M12 14.5V19"/><path d="M12 5v3.5"/><path d="M12 10a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 5 0Z"/><path d="M7 10a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 5 0Z"/><path d="M7 14.5V19"/><path d="M7 5v3.5"/><path d="M18 5v3.5"/></svg>;

const DeveloperPortalPage = () => {
  const apiDocs = [
    { title: "Getting Started", description: "Overview of PayGate Hub API and authentication.", icon: <BookOpen/>, link: "#" },
    { title: "Payment APIs", description: "Integrate PayU and Razorpay for processing payments.", icon: <Zap/>, link: "#" },
    { title: "Webhook Guide", description: "Setup and manage webhooks for real-time notifications.", icon: <WebhookIcon/>, link: "#" },
    { title: "SDKs & Libraries", description: "Download our official SDKs for popular languages.", icon: <Download/>, link: "#" },
  ];

  return (
    <div className="space-y-12 py-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-lg mb-4">
          <Code size={48} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Developer Portal
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Integrate PayGate Hub seamlessly into your applications with our comprehensive APIs, SDKs, and developer tools.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-8">
          {apiDocs.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-md">
                    {React.cloneElement(doc.icon, { size: 24 })}
                  </div>
                  <div>
                    <CardTitle>{doc.title}</CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <a href={doc.link}>Read Documentation</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-muted dark:bg-slate-800/50 p-8 md:p-12 rounded-xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Build?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Access your API keys, manage your integrations, and explore sandbox environments from your admin dashboard.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <NavLink to="/settings">Manage API Keys</NavLink>
        </Button>
      </motion.section>
    </div>
  );
};

export default DeveloperPortalPage;
