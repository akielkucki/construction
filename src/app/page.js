"use client";
import React, {useState, useEffect, useRef} from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {Building2, HardHat, Menu, PaintBucket, Warehouse, Wrench, X, HouseIcon, ArrowBigRight} from 'lucide-react';
import AnimatedTitle from "@/components/ui/animatedtitle";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/footer";
import Projects from "@/components/ui/projects";
import Navbar from "@/components/ui/navbar";
import Testimonials from "@/components/testimonials";
import TeamSection from "@/components/team";

// Smooth scroll utility function
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

// Hero Data Configuration
const heroData = {
    src: `/IMG32.jpg`,
    alt: `Construction site hero image`,
    caption: "Detail-driven construction experts proudly serving Bucks County, PA",
    styles: {
        height: "100vh",
        objectFit: "cover",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "-1",
    },
    initialState: {
        container: {
            opacity: 0,
            y: 20
        },
        title: {
            opacity: 0,
            y: 30
        },
        subtitle: {
            opacity: 0,
            y: 20
        },
        buttons: {
            opacity: 0,
            y: 20
        }
    },
    finalState: {
        container: {
            opacity: 1,
            y: 0
        },
        title: {
            opacity: 1,
            y: 0
        },
        subtitle: {
            opacity: 1,
            y: 0
        },
        buttons: {
            opacity: 1,
            y: 0
        }
    }
};

// Action Button Component
const ActionButton = ({ delay, children, bgclass = "bg-yellow-400", textColor = "text-gray-900", targetSection }) => {
    return (
        <motion.button
            initial={heroData.initialState.buttons}
            animate={heroData.finalState.buttons}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
            className={`relative px-8 py-3 text-lg sm:text-2xl font-medium ${textColor} bg-transparent group mx-2.5 overflow-hidden`}
            onClick={() => scrollToSection(targetSection)}
        >
            <span className="relative z-10 font-semibold">{children}</span>

            {/* Borders */}
            <div className={`absolute h-0.5 w-0 top-0 left-0 ${bgclass} group-hover:w-full transition-all duration-300`}></div>
            <div className={`absolute h-0 w-0.5 right-0 top-0 ${bgclass} group-hover:h-full transition-all duration-300 delay-100`}></div>
            <div className={`absolute h-0.5 w-0 right-0 bottom-0 ${bgclass} group-hover:w-full transition-all duration-300 delay-200`}></div>
            <div className={`absolute h-0 w-0.5 left-0 bottom-0 ${bgclass} group-hover:h-full transition-all duration-300 delay-100`}></div>
        </motion.button>
    );
};

const ServiceCard = ({ title, description, Icon, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <div className="flex items-center mb-4">
                <div className="p-2 bg-yellow-400 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    );
};

const ServicesSection = () => {
    const services = [
        {
            title: "Custom Home Building",
            description: "Crafting your dream home with meticulous attention to detail and premium materials.",
            Icon: HouseIcon,
        },
        {
            title: "Commercial Construction",
            description: "Creating efficient, modern spaces for businesses with focus on functionality and style.",
            Icon: Building2
        },
        {
            title: "Renovations",
            description: "Transforming existing spaces with innovative designs and quality craftsmanship.",
            Icon: Wrench
        },
        {
            title: "Interior Finishing",
            description: "Expert interior work that brings warmth and character to your space.",
            Icon: PaintBucket
        },
        {
            title: "Project Management",
            description: "Comprehensive oversight ensuring projects finish on time and within budget.",
            Icon: HardHat
        }
    ];

    return (
        <section id="services" className="py-24 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive construction solutions tailored to your needs, delivered with excellence
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.title}
                            title={service.title}
                            description={service.description}
                            Icon={service.Icon}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const LoadingScreen = ({ isLoading }) => {
    return (
        <motion.div
            className="fixed inset-0 bg-black z-50"
            initial={{ y: "100%" }}
            animate={{ y: isLoading ? "0%" : "-100%" }}
            transition={{ duration: 0, ease: "easeInOut" }}
        >
            <div className="h-full w-full flex items-center justify-center">
                <motion.div
                    className="w-16 h-16 border-4 border-yellow-400 rounded"
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity }
                    }}
                />
            </div>
        </motion.div>
    );
};

function ActionButton2({children}) {
    const ctaButton = useRef(null);
    const [buttonSize, setButtonSize] = useState({ height: 0, width: 0 });

    useEffect(() => {
        if (ctaButton.current) {
            const { clientHeight, clientWidth } = ctaButton.current;
            setButtonSize({ height: clientHeight, width: clientWidth });
        }
    }, [ctaButton.current, children]);

    return (
        <motion.button
            ref={ctaButton}
            className={`text-2xl bg-black text-white flex py-2 px-4 drop-shadow-[--button] cursor-pointer`}
            onClick={() => {window.location = "/contact"}}
        >
            <b className={"text-white"}>{children}</b>
        </motion.button>
    );
}

const GeometricSection = () => {
    const {scrollY} = useScroll();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
    const y3 = useTransform(scrollY, [0, 1000], [0, -50]);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-white">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-6 gap-4 h-full">
                    {Array(24).fill(null).map((_, i) => (
                        <div key={i} className="border-r border-t border-gray-400/20"/>
                    ))}
                </div>
            </div>

            {/* Floating geometric elements */}
            {isMounted && (
                <>
                    <motion.div
                        style={{y: y1}}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="grid grid-cols-3 gap-8">
                            {Array(9).fill(null).map((_, i) => (
                                <div
                                    key={`hex-${i}`}
                                    className="w-24 h-24 border-2 border-yellow-400/25 transform rotate-45"
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        style={{y: y2}}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="relative w-96 h-96">
                            {Array(4).fill(null).map((_, i) => (
                                <div
                                    key={`line-${i}`}
                                    className="absolute w-full h-0.5 bg-yellow-500/5 origin-center"
                                    style={{
                                        transform: `rotate(${i * 45}deg)`,
                                        top: '50%'
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        style={{y: y3}}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="grid grid-cols-2 gap-16">
                            {Array(4).fill(null).map((_, i) => (
                                <div
                                    key={`triangle-${i}`}
                                    className="w-32 h-32 border-t-2 border-r-2 border-yellow-500/15 transform rotate-45"
                                />
                            ))}
                        </div>
                    </motion.div>
                </>
            )}

            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-black mb-6">
                        <motion.span
                            initial={{opacity: 0, x: -20}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            Meticulous
                        </motion.span>
                        &nbsp;
                        <motion.span
                            initial={{opacity: 0, x: 20}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5, delay: 0.2}}
                        >
                            Design
                        </motion.span>
                    </h2>
                    <motion.p
                        className="text-lg text-black max-w-2xl mx-auto px-4"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.4}}
                    >
                        Where precision meets innovation in every project we undertake.
                        Our geometric approach to construction ensures structural integrity
                        and architectural beauty.
                    </motion.p>
                    <div className="mt-16 flex justify-center items-center flex-col">
                        <ActionButton2>Craft your ideas<br/><br/></ActionButton2>
                        <motion.span
                            animate={{translateX: `8px`}}
                            transition={{duration: 0.7, repeat: Infinity, repeatType: "reverse", ease: "linear"}}
                            className="relative bottom-[2rem]"
                        >
                            <ArrowBigRight className="text-2xl text-white" />
                        </motion.span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const ctaButton = useRef(null);

    return (
        <>
            <div className="relative">
                <section className="relative h-screen flex items-center justify-center">
                    <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0"></div>

                    <Image
                        src={heroData.src}
                        style={heroData.styles}
                        width={2560}
                        height={1440}
                        alt={heroData.alt}
                    />

                    <motion.div
                        initial={heroData.initialState.container}
                        animate={heroData.finalState.container}
                        transition={{duration: 0.8, ease: "easeOut"}}
                        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex items-center justify-center flex-col"
                    >
                        <AnimatedTitle/>

                        <motion.div
                            initial={heroData.initialState.buttons}
                            animate={heroData.finalState.buttons}
                            transition={{duration: 0.8, ease: "easeOut", delay: 0.6}}
                            className="flex flex-col sm:flex-row justify-center items-center gap-4"
                        >
                            <ActionButton
                                delay={0.7}
                                bgclass="bg-yellow-400"
                                textColor="text-white"
                                targetSection="about"
                            >
                                Get Started
                            </ActionButton>
                            <ActionButton
                                delay={0.8}
                                bgclass="bg-white"
                                textColor="text-white"
                                targetSection="projects"

                            >
                                Our Projects
                            </ActionButton>
                        </motion.div>
                    </motion.div>
                </section>

                <div className="relative">
                    <ServicesSection/>
                    <TeamSection/>
                    <Projects/>
                    <AboutSection/>
                    <Testimonials/>
                    <GeometricSection/>
                    <Footer/>
                </div>
            </div>
        </>
    );
}
