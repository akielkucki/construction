import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Shield, Lightbulb, Users, Trophy } from 'lucide-react';

const ValueCard = ({ icon: Icon, title, description, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <div className="flex items-center mb-4">
                <div className="p-3 bg-yellow-400 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    );
};

const TeamSection = () => {
    const values = [
        {
            icon: Clock,
            title: "Time Efficiency",
            description: "Every second counts. Our team operates with precision timing and streamlined processes to deliver projects ahead of schedule."
        },
        {
            icon: Target,
            title: "Precision Focus",
            description: "Meticulous attention to detail combined with unwavering dedication to achieving project goals and exceeding expectations."
        },
        {
            icon: Shield,
            title: "Quality Assurance",
            description: "Rigorous quality control standards ensure every aspect of your project meets our exceptional benchmarks for excellence."
        },
        {
            icon: Lightbulb,
            title: "Innovative Solutions",
            description: "Creative problem-solving and cutting-edge techniques keep us ahead of industry trends and challenges."
        },
        {
            icon: Users,
            title: "Expert Team",
            description: "A seasoned team of professionals bringing decades of combined experience to every project we undertake."
        },
        {
            icon: Trophy,
            title: "Proven Success",
            description: "Track record of delivering outstanding results, with a portfolio of successful projects and satisfied clients."
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Choose Excellence
                        </h2>
                        <div className="flex justify-center items-center space-x-4 mb-6">
                            <div className="h-px w-12 bg-yellow-400"></div>
                            <p className="text-xl font-semibold text-gray-600">Our Team Doesn't Waste a Second</p>
                            <div className="h-px w-12 bg-yellow-400"></div>
                        </div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            When you choose us, you're selecting a team that values every moment
                            and delivers excellence without compromise. Our approach combines
                            efficiency with precision, ensuring your vision becomes reality.
                        </p>
                    </motion.div>
                </div>

                {/* Time Efficiency Banner */}
                <div className="overflow-hidden mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                        className="bg-yellow-400 p-6 rounded-lg relative"
                    >
                        <motion.div
                            className="flex items-center justify-center space-x-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.3
                            }}
                        >
                            <Clock className="w-8 h-8 text-gray-900" />
                            <p className="text-xl font-bold text-gray-900">
                                Every Minute Counts | Every Detail Matters | Every Project Excels
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Value Propositions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <ValueCard
                            key={value.title}
                            icon={value.icon}
                            title={value.title}
                            description={value.description}
                            index={index}
                        />
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-gray-600 mb-8">
                        Experience the difference of working with a team that values
                        your time as much as you do.
                    </p>
                    <button
                        className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                        onClick={() => {window.location = "/contact"}}
                    >
                        Start Your Project
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default TeamSection;