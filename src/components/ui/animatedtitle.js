import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreRenderEffect } from "@/lib/utils";

let words = ["Dreams", "Inspiration", "Vision"];

const AnimatedTitle = () => {
    const [currentWord, setCurrentWord] = useState(0);
    const largestWordLength = useRef(0);

    function sortByLength(words, n) {
        if (!Array.isArray(words) || words.length === 0) return null;

        for (let i = 1; i < n; i++) {
            let temp = words[i];
            let j = i - 1;
            while (j >= 0 && temp.length > words[j].length) {
                words[j + 1] = words[j];
                j--;
            }
            words[j + 1] = temp;
        }

        return words[0].length;
    }

    usePreRenderEffect(() => {
        largestWordLength.current = sortByLength(words, words.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-white w-full flex items-center justify-center h-[20em] md:h-[30em] lg:h-[30em]">
            <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl mx-auto px-4">
                <div className="text-4xl sm:text-5xl lg:text-7xl font-bold flex flex-col items-center text-center gap-4 md:gap-8 lg:gap-16">
                    {/* First line rendered as a flex row */}
                    <div className="flex flex-row items-center whitespace-nowrap mr-8">
                        <span>Let Your</span>
                        {/* The container maintains a fixed width based on the longest word */}
                        <div
                            className="ml-4 inline-block "
                            style={{ width: `${largestWordLength.current-5}ch` }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={words[currentWord]}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-block"
                                >
                                    {words[currentWord]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Second line remains unchanged */}
                    <div className="flex items-center gap-x-3 whitespace-nowrap">
                        <span>build</span>
                        <span className="underline">your</span>
                        <span>Future</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedTitle;
