import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonialData = [
    {
        id: 1,
        name: "John Anderson",
        role: "Homeowner",
        content: "Their attention to detail and commitment to quality is unmatched. They transformed our vision into reality and exceeded all expectations.",
        rating: 5,
        image: "/api/placeholder/80/80"
    },
    {
        id: 2,
        name: "Sarah Martinez",
        role: "Business Owner",
        content: "Professional, punctual, and precise. Our commercial space renovation was completed on time and within budget. Couldn't be happier!",
        rating: 5,
        image: "/api/placeholder/80/80"
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Property Developer",
        content: "Their expertise in construction and project management made our development project seamless. A trusted partner for any construction needs.",
        rating: 5,
        image: "/api/placeholder/80/80"
    }
];

const TestimonialCard = ({ testimonial }) => (
    <div className="min-w-[350px] bg-white rounded-lg shadow-lg p-6 mx-4 flex flex-col">
        <div className="flex items-center mb-4">
 
            <div className="ml-4">
                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
        </div>
        <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, index) => (
                <Star
                    key={index}
                    className="w-5 h-5 text-yellow-400 fill-current"
                />
            ))}
        </div>
        <p className="text-gray-700 flex-grow">{testimonial.content}</p>
    </div>
);

const TestimonialsSection = () => {
    // Double the testimonials array for seamless infinite scroll
    const duplicatedTestimonials = [...testimonialData, ...testimonialData];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Real feedback from our valued clients about their experience working with us
                    </p>
                </motion.div>

                {/* Container with overflow hidden */}
                <div className="relative w-full overflow-hidden">
                    {/* Scrolling content container */}
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{
                            x: [0, -1750], // Adjust based on your content width
                        }}
                        transition={{
                            x: {
                                duration: 40    ,
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div key={`${testimonial.id}-${index}`} className="inline-block whitespace-normal">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient overlays inside the overflow container */}
                    <div className="absolute pointer-events-none left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent" />
                    <div className="absolute pointer-events-none right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent" />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
