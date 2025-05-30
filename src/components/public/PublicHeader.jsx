
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
    NavigationMenu, 
    NavigationMenuList, 
    NavigationMenuItem, 
    NavigationMenuTrigger, 
    NavigationMenuContent, 
    ListItem,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';

const PublicHeader = ({ menuItems }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const DesktopMenu = () => (
        <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
                {Object.entries(menuItems).slice(0, 6).map(([sectionTitle, items]) => (
                    <NavigationMenuItem key={sectionTitle}>
                        <NavigationMenuTrigger className="text-sm font-medium text-foreground/70 hover:text-primary">
                            {sectionTitle}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className={cn("grid gap-3 p-4", items.length > 10 ? "md:w-[600px] lg:grid-cols-3" : items.length > 5 ? "md:w-[400px] lg:grid-cols-2" : "md:w-[200px] lg:grid-cols-1")}>
                                {items.map((item) => (
                                    <ListItem key={item.title} title={item.title} href={item.href}>
                                        {item.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                    <NavLink to="/contact" className={cn(navigationMenuTriggerStyle(), "text-sm font-medium text-foreground/70 hover:text-primary")}>
                        Contact Sales
                    </NavLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
    
    const MobileMenu = () => (
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden absolute top-16 left-0 right-0 bg-background shadow-lg z-40 overflow-y-auto max-h-[calc(100vh-4rem)]"
                >
                    <div className="container mx-auto px-4 py-4 space-y-2">
                        {Object.entries(menuItems).map(([sectionTitle, items]) => (
                            <div key={sectionTitle}>
                                <h3 className="font-semibold text-primary mb-2 px-3">{sectionTitle}</h3>
                                {items.map((item) => (
                                    <NavLink
                                        key={item.title}
                                        to={item.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                         <NavLink 
                            to="/contact" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Contact Sales
                        </NavLink>
                        <div className="pt-4 mt-4 border-t border-border">
                            <NavLink to="/merchant/login" className="block w-full text-left mb-2">
                                <Button variant="outline" className="w-full">Merchant Login</Button>
                            </NavLink>
                            <NavLink to="/admin" className="block w-full text-left">
                                 <Button className="w-full">Platform Dashboard</Button>
                            </NavLink>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <header className="bg-background/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <NavLink to="/home" className="flex items-center gap-2">
                        <img  alt="PayGate Hub Logo" className="h-8 w-auto" src="https://images.unsplash.com/photo-1686140386811-099f53c0dd54" />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            PayGate Hub
                        </span>
                    </NavLink>
                    
                    <DesktopMenu />

                    <div className="hidden lg:flex items-center space-x-2">
                       <NavLink to="/merchant/login">
                         <Button variant="outline" size="sm">Merchant Login</Button>
                       </NavLink>
                       <NavLink to="/admin">
                         <Button size="sm">Platform Dashboard</Button>
                       </NavLink>
                    </div>

                    <div className="lg:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
                        </Button>
                    </div>
                </div>
            </div>
            <MobileMenu />
        </header>
    );
};

export default PublicHeader;
