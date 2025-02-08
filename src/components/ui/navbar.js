"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isPanelPage, setIsPanelPage] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollYRef = useRef(0);

    const menuItems = [
        { name: "Services", href: "#services" },
        { name: "Projects", href: "#projects" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "/contact" },
    ];

    // Listen to scroll events to hide navbar when scrolling down.
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Only hide/show navbar if the mobile menu is not open.
            if (!isOpen) {
                if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }

            // Set a background once the page is scrolled past 50px.
            setScrolled(currentScrollY > 50);
            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    // Ensure the navbar stays visible when the mobile menu is open.
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        }
    }, [isOpen]);

    // Hide navbar entirely on panel pages.
    useEffect(() => {
        if (typeof window !== "undefined" && window.location.toString().includes("/panel")) {
            setIsPanelPage(true);
        }
    }, []);

    if (isPanelPage) return null;

    // Nav animation variants with an added scale effect.
    const navVariants = {
        hidden: { y: -100, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
        },
        open: {
            opacity: 1,
            height: "100vh",
            transition: { duration: 0.3, ease: "easeInOut" },
        },
    };

    return (
        <motion.nav
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={navVariants}
            className={`fixed w-full z-40 transition-all duration-300 ${
                scrolled || isOpen ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
            }`}
        >
            {/* Main Navbar Content */}
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/" className="text-white font-bold text-xl">
              <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                Red Bridge
              </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: index * 0.1 }}
                                onHoverStart={() => setActiveItem(item.name)}
                                onHoverEnd={() => setActiveItem(null)}
                                className="relative"
                            >
                                <Link
                                    href={item.href}
                                    className="text-gray-300 hover:text-white transition-colors relative group"
                                >
                                    {item.name}
                                    <motion.div
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-purple-500"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: activeItem === item.name ? 1 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-300 hover:text-white p-2"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isOpen ? "close" : "menu"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu - Full Width */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={mobileMenuVariants}
                            className="md:hidden fixed left-0 right-0 bg-black/90 backdrop-blur-lg"
                            style={{ top: "80px" }}
                        >
                            <div className="px-4 py-3 space-y-1">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center justify-between text-gray-300 hover:text-white py-3 group"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span>{item.name}</span>
                                            <motion.div
                                                initial={{ x: -4, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: index * 0.1 + 0.2 }}
                                            >
                                                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
