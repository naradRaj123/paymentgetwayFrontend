
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="space-y-12 py-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-center mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          About PayGate Hub
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
          We are dedicated to simplifying payment processing for businesses of all sizes, empowering them with robust tools and seamless integrations.
        </p>
      </motion.section>

      <motion.section
        className="grid md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <img  
            className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[400px]" 
            alt="Team working collaboratively in a modern office"
           src="https://images.unsplash.com/photo-1538688554366-621d446302aa" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to provide a comprehensive, secure, and developer-friendly payment platform that enables businesses to thrive in the digital economy. We aim to remove the complexities of payment integrations, allowing our clients to focus on their core operations and growth.
          </p>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center mt-1">
              <Target size={18} />
            </div>
            <p className="text-muted-foreground">
              To be the leading payment orchestration platform, known for reliability and innovation.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center mt-1">
              <Zap size={18} />
            </div>
            <p className="text-muted-foreground">
              To continuously enhance our platform with cutting-edge technology and features.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-muted dark:bg-slate-800/50 p-8 md:p-12 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Meet Our Team (Placeholder)</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="bg-card p-6 rounded-lg shadow-md text-center">
              <img  
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" 
                alt={`Team member ${i} placeholder`}
               src="https://images.unsplash.com/photo-1493882552576-fce827c6161e" />
              <h3 className="text-xl font-semibold text-card-foreground">Team Member {i}</h3>
              <p className="text-sm text-primary">Role / Title</p>
              <p className="text-xs text-muted-foreground mt-2">
                A brief bio or expertise description for team member {i}.
              </p>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-muted-foreground">
          Our team is composed of experienced professionals passionate about fintech and customer success.
        </p>
      </motion.section>
    </div>
  );
};

export default AboutPage;
