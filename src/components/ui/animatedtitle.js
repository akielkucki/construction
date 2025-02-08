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
    }, [currentWord]);

    return (
        <div className="text-white w-full flex items-center justify-center min-h-[300px] py-8 sm:py-16">
            <div className="w-full max-w-4xl mx-auto px-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold flex flex-col items-center gap-8">
                    {/* First line with animated word */}
                    <div className="flex flex-wrap justify-center items-center">
                        <span>Let Your</span>
                        <div className="relative inline-flex ml-4" style={{ width: `${largestWordLength.current}ch` }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={words[currentWord]}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{
                                        y: -30,
                                        opacity: 1,
                                    }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute left-0 whitespace-nowrap"
                                >
                                    {words[currentWord]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Second line */}
                    <div className="flex items-center gap-x-3">
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
