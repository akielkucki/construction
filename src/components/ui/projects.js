import { Marquee } from "@/components/ui/marquee";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const ReviewCard = ({ src, name, description, onClick }) => {
    return (
        <motion.figure
            className="relative cursor-pointer overflow-hidden group"
            onClick={onClick}
        >
            <div className="relative">
                <Image
                    width={500}
                    height={500}
                    src={src}
                    alt={name}
                    className="object-cover w-full"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent w-full">


                </div>
            </div>
        </motion.figure>
    );
};

const ProjectDetails = ({ project, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeImageView = () => {
        setSelectedImage(null);
    };

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full md:w-1/3 w-full bg-white shadow-lg p-6 z-50"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
                ×
            </button>

            <div className="mt-8 h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
                <Image
                    src={project.main_image}
                    alt={project.project_title}
                    width={500}
                    height={300}
                    className="w-full rounded-lg mb-6 object-cover h-60"
                />
                <p className="text-gray-600 mb-4">{project.description}</p>
                {/*<span className="text-gray-500">{new Date(Date.parse(project.CreatedAt)).toLocaleDateString()}</span>*/}

                <div className="space-y-4 mt-4">
                    <h3 className="font-semibold text-lg">Images</h3>
                    <div className="max-h-96 overflow-y-auto p-2 relative">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                            {project.related_images?.split(',').map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="aspect-square cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                    layoutId={`image-${index}`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${project.name} - Image ${index + 1}`}
                                        width={500}
                                        height={500}
                                        className="w-full h-full rounded-lg object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.split(',').map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {tag}
                        </span>
                        ))}

                    </div>
                </div>
            </div>

            <AnimatePresence>
            {selectedImage && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 z-50"
                            onClick={closeImageView}
                        />
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
                                <button
                                    onClick={closeImageView}
                                    className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-50"
                                >
                                    ×
                                </button>
                                <Image
                                    src={selectedImage}
                                    alt="Enlarged view"
                                    width={1200}
                                    height={800}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    // Fetch the projects data from the API when the component mounts
    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch("https://api.redbridgeconstructionllc.com/api/images", {
                    method: "GET",
                    headers: { Accept: "application/json" },
                });
                const data = await res.json();
                console.log(data);
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        }

        fetchProjects();
    }, []);

    // Map JSON fields to the fields expected by ReviewCard
    const mappedProjects = projects.map((project) => ({
        ...project,
        src: project.main_image,
        name: project.project_title,
    }));

    // Divide projects into three rows (3 projects per row)
    const firstRow = mappedProjects.slice(0, 3);
    const secondRow = mappedProjects.slice(3, 6);
    const thirdRow = mappedProjects.slice(6, 9);

    return (
        <section className="w-full bg-white py-16 md:mx-auto 2xl:w-4/5 md:px-16">
            <div className="mx-auto mb-12 px-6 md:px-0">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Explore our projects
                </h2>
                <p className="text-[#7b7b7b] text-lg">
                    Our projects showcase the best visuals and storytelling techniques.
                </p>
            </div>

            <div className="w-full h-[800px] flex items-center justify-center overflow-hidden py-8">
                <Marquee
                    vertical
                    pauseOnHover
                    className="[--duration:60s]"
                    paused={selectedProject !== null}
                >
                    {firstRow.map((review, index) => (
                        <ReviewCard
                            key={index}
                            {...review}
                            onClick={() => setSelectedProject(review)}
                        />
                    ))}
                </Marquee>
                <Marquee
                    vertical
                    pauseOnHover
                    className="[--duration:60s]"
                    paused={selectedProject !== null}
                >
                    {secondRow.map((review, index) => (
                        <ReviewCard
                            key={index}
                            {...review}
                            onClick={() => setSelectedProject(review)}
                        />
                    ))}
                </Marquee>
                <Marquee
                    vertical
                    pauseOnHover
                    className="[--duration:60s] hidden md:flex"
                    paused={selectedProject !== null}
                >
                    {thirdRow.map((review, index) => (
                        <ReviewCard
                            key={index}
                            {...review}
                            onClick={() => setSelectedProject(review)}
                        />
                    ))}
                </Marquee>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setSelectedProject(null)}
                        />
                        <ProjectDetails
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
