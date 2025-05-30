
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const GenericPage = ({ pageTitle }) => {
  const title = pageTitle || "Information Page";
  
  const sections = [
    {
      icon: <Info size={24} className="text-primary" />,
      title: `Understanding ${title}`,
      content: `Welcome to the ${title} page. Here you'll find detailed information about our ${title.toLowerCase()} services and how they can benefit your business. We strive to provide comprehensive solutions tailored to your needs.`
    },
    {
      icon: <Zap size={24} className="text-primary" />,
      title: `Key Features of ${title}`,
      content: `Our ${title.toLowerCase()} solution offers a range of powerful features, including seamless integration, robust security, real-time analytics, and dedicated support. Explore how these features can streamline your operations.`
    },
    {
      icon: <TrendingUp size={24} className="text-primary" />,
      title: `Benefits for Your Business`,
      content: `By leveraging our ${title.toLowerCase()} services, you can expect to see improvements in efficiency, customer satisfaction, and overall business growth. We focus on providing value that translates to tangible results.`
    },
    {
      icon: <ShieldCheck size={24} className="text-primary" />,
      title: `Security and Compliance`,
      content: `Security is paramount. Our ${title.toLowerCase()} platform is built with the highest security standards, ensuring data protection and compliance with industry regulations. Your trust is our top priority.`
    }
  ];

  return (
    <motion.div 
      className="max-w-4xl mx-auto py-8 space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover more about our {title.toLowerCase()} offerings and how we can help your business succeed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-md">
                  {section.icon}
                </div>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.content}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-6">
            For more specific details or to discuss your requirements, please don't hesitate to contact our team.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild>
                <NavLink to="/contact">
                    Contact Sales
                </NavLink>
            </Button>
            <Button asChild variant="outline">
                <NavLink to="/home">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go back to Homepage
                </NavLink>
            </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default GenericPage;
