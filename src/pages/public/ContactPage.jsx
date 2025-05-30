
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form data submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="py-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're here to help. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
        </p>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-card-foreground">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Regarding your payment services" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message..." rows={5} value={formData.message} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Send Message
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-8"
        >
          <div className="bg-card p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Contact Information</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-primary" />
                <span>support@paygatehub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-primary" />
                <span>123 Payment Street, Suite 100, Tech City, TX 75001</span>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl shadow-lg">
             <h3 className="text-xl font-semibold mb-3 text-card-foreground">Office Hours</h3>
             <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM (CST)</p>
             <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
          </div>
           <div className="bg-card p-6 rounded-xl shadow-lg">
            <img  class="w-full h-48 object-cover rounded-md" alt="Map showing office location" src="https://images.unsplash.com/photo-1620257819748-e6d4a59f2ac3" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
