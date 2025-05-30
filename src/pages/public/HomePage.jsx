
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Zap, Globe, BookOpen, Users, TrendingUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePayment } from '@/contexts/PaymentContext';

const FeatureCard = ({ icon, title, description, link }) => (
  <motion.div 
    className="bg-card p-6 rounded-xl shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col"
    whileHover={{ y: -5, scale: 1.03 }}
  >
    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm flex-grow">{description}</p>
    {link && (
      <Button variant="link" asChild className="mt-4 p-0 self-start text-primary">
        <NavLink to={link}>
          Learn More <ArrowRight className="ml-1 h-4 w-4" />
        </NavLink>
      </Button>
    )}
  </motion.div>
);

const BlogPreviewCard = ({ blog }) => (
  <motion.div 
    className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-primary/10 transition-all duration-300"
    whileHover={{ y: -5, scale: 1.03 }}
  >
    <img  className="w-full h-48 object-cover" src={blog.image} alt={blog.title} />
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2 text-card-foreground">{blog.title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{blog.excerpt}</p>
      <Button variant="link" asChild className="p-0 text-primary">
        <NavLink to={`/blog/${blog.slug}`}>
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </NavLink>
      </Button>
    </div>
  </motion.div>
);

const HomePage = () => {
  const { blogs } = usePayment();
  const recentBlogs = blogs.slice(0, 3);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary/5 via-background to-background rounded-xl">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Empowering India with Seamless Payments
        </motion.h1>
        <motion.p 
          className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          PayGate Hub provides a comprehensive suite of payment solutions tailored for Indian businesses. From startups to large enterprises, simplify your financial operations with our robust and developer-friendly platform, supporting INR transactions and popular local payment methods.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-primary/40">
            <NavLink to="/merchant/register">
              Create Merchant Account <ArrowRight className="ml-2 h-5 w-5" />
            </NavLink>
          </Button>
          <Button asChild size="lg" variant="outline" className="shadow-sm hover:shadow-md">
            <NavLink to="/contact">
              Contact Sales
            </NavLink>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">All-in-One Payment Platform</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Accept, process, and disburse payments with ease. We offer a full stack of products to manage your entire money flow.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<ShieldCheck size={24} />} 
            title="Robust Security" 
            description="PCI DSS compliant, fraud detection, and 3D Secure authentication for safe INR transactions."
            link="/payment-gateway"
          />
          <FeatureCard 
            icon={<Zap size={24} />} 
            title="Quick Integration" 
            description="Developer-first APIs, SDKs, and plugins for effortless integration with your existing systems."
            link="/developer"
          />
          <FeatureCard 
            icon={<Globe size={24} />} 
            title="Wide Payment Coverage" 
            description="Support for UPI, Credit/Debit Cards, Netbanking, Wallets, EMI and PayLater options."
            link="/accept-payments"
          />
           <FeatureCard 
            icon={<TrendingUp size={24} />} 
            title="Business Growth Tools" 
            description="Payment Links, Pages, Subscriptions, and more to help you scale your operations."
            link="/payment-links"
          />
        </div>
      </section>
      
       {/* How It Works Section */}
      <section className="bg-muted dark:bg-slate-800/50 py-16 rounded-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Start Accepting Payments in Minutes</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Simple onboarding and powerful tools to get you up and running quickly.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">Create your merchant account and complete a quick KYC process.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Integrate</h3>
              <p className="text-muted-foreground">Use our SDKs, APIs, or plugins to connect PayGate Hub to your website or app.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Go Live</h3>
              <p className="text-muted-foreground">Start accepting payments and manage your transactions from our powerful dashboard.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      {recentBlogs.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Latest Insights from Our Blog</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Stay updated with the latest trends, tips, and news in the world of digital payments.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map(blog => (
              <BlogPreviewCard key={blog.id} blog={blog} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <NavLink to="/blog">View All Posts</NavLink>
            </Button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="text-center py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl text-white">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Transform Your Business Payments?</h2>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
          Join thousands of Indian businesses choosing PayGate Hub for reliable, secure, and innovative payment solutions.
        </p>
        <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100 shadow-xl">
          <NavLink to="/merchant/register">
            Get Started for Free
          </NavLink>
        </Button>
      </section>

      {/* Trusted By Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Powering Growth for Businesses Like Yours</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-75">
          <img  class="h-10" alt="Client Logo 1" src="https://images.unsplash.com/photo-1539278383962-a7774385fa02" />
          <img  class="h-10" alt="Client Logo 2" src="https://images.unsplash.com/photo-1642132652860-471b4228023e" />
          <img  class="h-10" alt="Client Logo 3" src="https://images.unsplash.com/photo-1685722624202-c84f60443677" />
          <img  class="h-12" alt="Client Logo 4" src="https://images.unsplash.com/photo-1642142785011-4a00c34c4a36" />
          <img  class="h-10" alt="Client Logo 5" src="https://images.unsplash.com/photo-1685906178166-4a9143b6343d" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
