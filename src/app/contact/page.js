"use client"
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';

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

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');
        setErrorMessage('');

        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.projectDetails) {
            setErrorMessage('Please fill in all required fields');
            setLoading(false);
            return;
        }

        // Discord webhook URL
        const webhookUrl = 'https://discord.com/api/webhooks/1345747524039999540/NIHmNL1lScWmZfJ9Ya8LMZV8220gVXC6p4DvzCWmh_TY8zOuoHGNYjKR2x0nPTz7WFF9';

        try {
            // Prepare the message for Discord webhook
            const discordMessage = {
                embeds: [
                    {
                        title: `New Construction Project Inquiry`,
                        color: 0xFFD700, // Yellow color to match branding
                        fields: [
                            {
                                name: 'Name',
                                value: `${formData.firstName} ${formData.lastName}`,
                                inline: true,
                            },
                            {
                                name: 'Email',
                                value: formData.email,
                                inline: true,
                            },
                            {
                                name: 'Phone',
                                value: formData.phone || 'Not provided',
                                inline: true,
                            },
                            {
                                name: 'Project Details',
                                value: formData.projectDetails || 'Not provided',
                                inline: false,
                            },
                        ],
                        timestamp: new Date().toISOString(),
                        footer: {
                            text: 'Sent from Red Bridge Construction website'
                        }
                    }
                ]
            };

            // Send the data to Discord webhook
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discordMessage),
            });

            if (response.ok) {
                setResponseMessage('Thank you for your inquiry! We will get back to you shortly.');
                // Reset form after successful submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    projectDetails: ''
                });
            } else {
                console.error('Discord webhook error:', response.status);
                setErrorMessage('There was an error sending your message. Please try again or contact us directly.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('There was an error sending your message. Please try again or contact us directly.');
        } finally {
            setLoading(false);
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
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                                <textarea
                                    rows="4"
                                    name="projectDetails"
                                    value={formData.projectDetails}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {responseMessage && (
                                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mt-4">
                                    <p>{responseMessage}</p>
                                </div>
                            )}

                            {errorMessage && (
                                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mt-4">
                                    <p>{errorMessage}</p>
                                </div>
                            )}
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
