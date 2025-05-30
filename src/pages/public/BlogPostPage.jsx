
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePayment } from '@/contexts/PaymentContext';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { blogs } = usePayment();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested blog post could not be found.</p>
        <Button asChild variant="link" className="mt-4">
          <NavLink to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </NavLink>
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-3xl mx-auto py-8 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <article className="prose dark:prose-invert lg:prose-xl max-w-none">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="mb-6">
            <NavLink to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </NavLink>
          </Button>
          <h1 className="text-4xl font-extrabold tracking-tight !mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {blog.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-1.5 h-4 w-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1.5 h-4 w-4" />
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
        
        <img  className="w-full rounded-lg shadow-lg mb-8 object-cover aspect-video" src={blog.image} alt={blog.title} />
        
        <p className="lead">{blog.excerpt}</p>
        
        {/* Placeholder for full content - you'd typically use markdown rendering here */}
        <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') || '<p>Full blog content will appear here. This is a placeholder as the full content was not provided.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' }} />
      </article>
    </motion.div>
  );
};

export default BlogPostPage;
