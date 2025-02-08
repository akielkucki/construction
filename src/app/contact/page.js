"use client"
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactInfo = ({ icon: Icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="p-3 bg-yellow-400 rounded-lg">
            <Icon className="w-6 h-6 text-gray-900" />
        </div>
        <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <div className="text-gray-600">{children}</div>
        </div>
    </div>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        projectDetails: ''
    });
    
    const [status, setStatus] = useState({
        message: '',
        isError: false,
        isSubmitting: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: '', isError: false, isSubmitting: true });

        try {
            const response = await fetch('https://api.redbridgeconstructionllc.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setStatus({
                message: 'Thank you for your message. We will get back to you soon!',
                isError: false,
                isSubmitting: false
            });
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                projectDetails: ''
            });
        } catch (error) {
            setStatus({
                message: 'There was an error submitting the form. Please try again.',
                isError: true,
                isSubmitting: false
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[40vh] bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/construction-bg.jpg')] bg-cover bg-center opacity-30" />
                <div className="relative h-full flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white">Let's Build Together</h1>
                </div>
            </div>

            {/* Contact Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                        {status.message && (
                            <div className={`p-4 mb-6 rounded-lg ${status.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {status.message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
                                <textarea
                                    name="projectDetails"
                                    value={formData.projectDetails}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status.isSubmitting}
                                className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>{status.isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

                        <ContactInfo icon={Phone} title="Phone">
                            <p>(215) 534-1008</p>
                            <p>Mon-Fri: 7:00 AM - 5:00 PM</p>
                        </ContactInfo>

                        <ContactInfo icon={Mail} title="Email">
                            <p>redbridgeconstructionllc@gmail.com</p>
                        </ContactInfo>

                        <ContactInfo icon={MapPin} title="Office Location">
                            <p>225 Red Bridge Rd</p>
                            <p>Kintnersville, PA 18930</p>
                        </ContactInfo>

                        <ContactInfo icon={Clock} title="Business Hours">
                            <p>Monday - Friday: 7:00 AM - 5:00 PM</p>
                            <p>Saturday: Closed</p>
                            <p>Sunday: Closed</p>
                        </ContactInfo>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="h-[400px] bg-gray-200 mt-16">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.7874467731405!2d-75.21310075318719!3d40.587374756526145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c413b64270ab63%3A0xd3872d2038312c55!2s225%20Red%20Bridge%20Rd%2C%20Kintnersville%2C%20PA%2018930!5e0!3m2!1sen!2sus!4v1738806924863!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
