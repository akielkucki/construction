import React from 'react';

const ProcessSection = () => {
    return (
        <section className="py-16 bg-white">
            {/* Our Process Section */}
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">Our Process</h2>

                {/* Process Step 1 - Image Left */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div className="w-full md:w-1/2">
                        <img
                            src="/discussion.webp"
                            alt="Discovery Phase"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900">1. Discovery Phase</h3>
                        <p className="text-gray-600">
                            We start by understanding your vision, goals, and requirements. Our team conducts thorough research
                            and analysis to identify the best approach for your project. This phase includes stakeholder
                            interviews, market research, and competitive analysis.
                        </p>
                    </div>
                </div>

                {/* Process Step 2 - Image Right */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900">2. Strategy & Planning</h3>
                        <p className="text-gray-600">
                            Based on our findings, we develop a comprehensive strategy tailored to your needs. Our team creates
                            detailed project roadmaps, timelines, and deliverables. We ensure every aspect aligns with your
                            business objectives and user requirements.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img
                            src="/api/placeholder/600/400"
                            alt="Strategy Phase"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                </div>

                {/* How We Work Section */}
                <div className="mt-32">
                    <h2 className="text-4xl font-bold text-center mb-16">How We Work</h2>

                    {/* Image Left */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                        <div className="w-full md:w-1/2">
                            <img
                                src="/api/placeholder/600/400"
                                alt="Collaborative Approach"
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">Collaborative Approach</h3>
                            <p className="text-gray-600">
                                We believe in transparent communication and close collaboration with our clients. Our agile
                                methodology ensures regular updates, feedback sessions, and quick iterations. This approach
                                allows us to adapt quickly to changes and deliver optimal results.
                            </p>
                        </div>
                    </div>

                    {/* Image Right */}
                    <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/2 space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">Quality-Driven Development</h3>
                            <p className="text-gray-600">
                                Our dedicated team follows industry best practices and maintains high quality standards
                                throughout the development process. We implement rigorous testing procedures and quality
                                assurance measures to ensure exceptional results.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img
                                src="/api/placeholder/600/400"
                                alt="Quality Development"
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;