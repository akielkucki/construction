'use client';
// components/AboutSection.tsx
import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import {motion} from 'framer-motion';
import Image from "next/image";

export default function AboutSection() {
    const aboutSectionRef = useRef(null);
    const [aboutVisible, setAboutVisible] = useState(false);
    const [aboutCounts, setAboutCounts] = useState([
        { title: 'Projects Completed', amount: 500, unit: '+', current: 0 },
        { title: 'Years of Experience', amount: 25, unit: '+', current: 0 },
        { title: 'Team Members', amount: 10, unit: '+', current: 0 },
        { title: 'Client Satisfaction', amount: 98, unit: '%', current: 0 }
    ]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAboutVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (aboutSectionRef.current) {
            observer.observe(aboutSectionRef.current);
        }

        return () => {
            if (aboutSectionRef.current) {
                observer.unobserve(aboutSectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (aboutVisible) {
            let startTime;
            const duration = 4000;
            const startCounts = aboutCounts.map(item => ({ ...item, current: 0 }));

            const animate = (time) => {
                if (!startTime) startTime = time;
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const newCounts = startCounts.map(item => ({
                    ...item,
                    current: Math.floor(item.amount * progress)
                }));

                setAboutCounts(newCounts);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [aboutVisible]);

    return (
        <section id="about" className="py-20 bg-gray-50" ref={aboutSectionRef}>
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 mx-auto flex justify-center items-center">About Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        <Image
                            src="/about.jpg"
                            alt="Red Bridge Construction Project"
                            className="rounded-lg w-full drop-shadow-[--imageshadow]"
                            width={1200}
                            height={800}
                        />


                    <div>
                        <h3 className="text-2xl font-bold mb-4">Building Excellence Since 1995</h3>
                        <p className="text-gray-700 mb-6">At Red Bridge Construction LLC, our mission is simple: to
                            deliver unparalleled quality and craftsmanship on every project. With over 25 years of
                            experience in the construction industry, you can rest assured that every project is
                            completed with precision and care.</p>
                        <p className="text-gray-700 mb-6">Specializing in new construction, additions, and home
                            renovations, Red Bridge Construction brings a wealth of expertise to every job. As a proud
                            resident of Bucks County, our owner is passionate about serving the local community,
                            ensuring that each project reflects the highest standards of excellence and attention to
                            detail.</p>
                        <p className="text-gray-700 mb-6">Navigating the municipal regulations and intricacies specific
                            to Bucks County is one of our key strengths. We understand the unique requirements involving
                            on-site septic systems and wells, allowing us to manage these aspects efficiently and
                            effectively.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            {aboutCounts.map((item, index) => (
                                <p key={index} className="text-gray-900 font-semibold flex flex-col">
                                    <span
                                        className="text-3xl text-yellow-500 font-bold">{item.current}{item.unit}</span>
                                    <span>{item.title}</span>
                                </p>
                            ))}
                        </div>
                        <a href="#contact"
                           className="inline-flex items-center bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                            Start Your Project
                            <ArrowRight className="ml-2" size={16}/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}