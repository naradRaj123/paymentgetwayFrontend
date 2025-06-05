
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const FooterLinkColumn = ({ title, items }) => (
    <div>
        <h4 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">{title}</h4>
        <ul className="space-y-2">
            {items.map(item => (
                <li key={item.title}>
                    <NavLink 
                        to={item.href} 
                        className="text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                        {item.title} {item.isNew && <span className="ml-1 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>}
                    </NavLink>
                </li>
            ))}
        </ul>
    </div>
);

const PublicFooter = ({ menuItems }) => {
    const socialLinks = [
        { name: "Facebook", icon: <Facebook size={20} />, href: "#" },
        { name: "Twitter", icon: <Twitter size={20} />, href: "#" },
        { name: "LinkedIn", icon: <Linkedin size={20} />, href: "#" },
        { name: "Instagram", icon: <Instagram size={20} />, href: "#" },
    ];
    
    return (
        <footer className="bg-slate-100 dark:bg-slate-900 border-t border-border text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
                    {Object.entries(menuItems).map(([sectionTitle, items]) => (
                         <FooterLinkColumn 
                            key={sectionTitle} 
                            title={sectionTitle} 
                            items={items.map(i => ({...i, isNew: i.title === "POS Solutions"}))} 
                         />
                    ))}
                </div>

                <div className="border-t border-border pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <img  alt=" Logo" className="h-8 w-auto" src="https://digitaloasisindia.in/kk.jpg" />
                            <span className="text-lg font-semibold"></span>
                        </div>
                        <div className="flex space-x-4 mb-4 md:mb-0">
                            {socialLinks.map(link => (
                                <a key={link.name} href={link.href} aria-label={link.name} className="text-muted-foreground hover:text-primary transition-colors">
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} . All rights reserved.
                        </p>
                    </div>
                    <div className="mt-4 text-center md:text-right">
                        <NavLink to="/merchant/register" className="text-sm text-primary hover:underline">
                            Merchant Sign Up
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;
