
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const PlaceholderPage = ({ pageTitle }) => {
  const title = pageTitle || "Information Page";
  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Info className="w-24 h-24 text-primary mb-8" />
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Welcome to the {title} page. More information about this service or feature will be available soon. We are working hard to provide you with comprehensive details.
      </p>
      <p className="text-md text-muted-foreground mb-8 max-w-lg">
        In the meantime, if you have any specific questions regarding {title.toLowerCase()}, please feel free to reach out to our support team or check our main services pages for related information.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <NavLink to="/contact">
            Contact Support
          </NavLink>
        </Button>
        <Button asChild variant="outline">
          <NavLink to="/home">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back to Homepage
          </NavLink>
        </Button>
      </div>
    </motion.div>
  );
};

export default PlaceholderPage;
