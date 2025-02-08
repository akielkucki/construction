import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Red Bridge Construction</h3>
                        <p className="mb-4">Building excellence in Bucks County since 1996</p>
                        <div className="flex space-x-4">
                            <Facebook className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
                            <Instagram className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
                            <Linkedin className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Phone className="w-5 h-5 mr-3 text-yellow-400" />
                                <span>(215) 555-0123</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-5 h-5 mr-3 text-yellow-400" />
                                <span>info@redbridgeconstruction.com</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-3 text-yellow-400" />
                                <span>123 Main Street, Doylestown, PA 18901</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/services" className="hover:text-yellow-400">Services</a></li>
                            <li><a href="/projects" className="hover:text-yellow-400">Projects</a></li>
                            <li><a href="/about" className="hover:text-yellow-400">About Us</a></li>
                            <li><a href="/careers" className="hover:text-yellow-400">Careers</a></li>
                            <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
                        <ul className="space-y-2">
                            <li>Monday - Friday</li>
                            <li className="text-yellow-400">7:00 AM - 5:00 PM</li>
                            <li>Saturday</li>
                            <li className="text-yellow-400">8:00 AM - 2:00 PM</li>
                            <li>Sunday</li>
                            <li className="text-yellow-400">Closed</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
                    <p>© {new Date().getFullYear()} Red Bridge Construction. All rights reserved.</p>
                    <div className="mt-2 space-x-4">
                        <a href="/privacy" className="hover:text-yellow-400">Privacy Policy</a>
                        <span>|</span>
                        <a href="/terms" className="hover:text-yellow-400">Terms of Service</a>
                        <span>|</span>
                        <a href="/sitemap" className="hover:text-yellow-400">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;