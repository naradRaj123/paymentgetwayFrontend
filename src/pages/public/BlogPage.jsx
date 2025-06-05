
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { usePayment } from '@/contexts/PaymentContext';
import { ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const { blogs } = usePayment();

  return (
    <div className="space-y-12 py-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
           Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, news, and articles on digital payments, fintech, and business growth.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <img  className="w-full h-56 object-cover" src={blog.image} alt={blog.title} />
              <CardHeader>
                <CardTitle className="text-xl">{blog.title}</CardTitle>
                <CardDescription>By {blog.author} on {blog.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">{blog.excerpt}</p>
              </CardContent>
              <CardFooter>
                <NavLink to={`/blog/${blog.slug}`} className="text-primary hover:underline flex items-center">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </NavLink>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};

export default BlogPage;
