
import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';
import { menuItems } from '@/components/public/menuItems'; 

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader menuItems={menuItems} />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        >
          <Outlet />
        </motion.div>
      </main>
      <PublicFooter menuItems={menuItems} />
    </div>
  );
};

export default PublicLayout;
