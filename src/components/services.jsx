import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ServicesSection = () => {
    const services = [
        {
            title: "Custom Homes",
            description: "Bringing your dream home to life with expert craftsmanship and attention to detail",
            icon: "🏠",
            features: ["Architectural Design", "Green Building", "Smart Home Integration"],
            accent: "bg-amber-500"
        },
        {
            title: "Renovations",
            description: "Transform your existing space into something extraordinary",
            icon: "🔨",
            features: ["Kitchen & Bath", "Additions", "Complete Remodels"],
            accent: "bg-amber-600"
        },
        {
            title: "Commercial",
            description: "Building spaces that help businesses thrive",
            icon: "🏢",
            features: ["Office Build-outs", "Retail Spaces", "Restaurants"],
            accent: "bg-amber-700"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-stone-900 to-stone-800">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
                    <div className="w-24 h-1 bg-amber-500 mx-auto"/>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <Card className="hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className={`${service.accent} w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl transform transition-transform group-hover:rotate-12`}>
                                        {service.icon}
                                    </div>
                                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                                    <CardDescription>{service.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {service.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2">
                                                <Badge variant="primary">{feature}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">Learn More</Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;