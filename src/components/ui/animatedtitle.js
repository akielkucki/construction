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

    const getXOffset = () => {
        const currentWordLength = words[currentWord].length;
        const diffInChars = largestWordLength.current - currentWordLength;
        // Convert character difference to pixels (assuming average char width)
        // You might need to adjust the multiplier based on your font
        return diffInChars * -0.2 + 'rem';
    };

    return (
        <div className="text-white w-full flex items-center justify-center min-h-[300px] py-8 sm:py-16">
            <div className="max-w-full mx-auto px-4 flex justify-center items-center flex-col">
                <div className="text-5xl sm:text-6xl lg:text-[5rem] font-bold flex flex-col text-center leading-none">
                    <div className="flex items-center flex-col">
                        <div className="relative w-full flex">
                            <span className="block">Let Your</span>
                            <div
                                className="transform"
                                style={{ width: `${largestWordLength.current}ch` }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[currentWord]}
                                        initial={{ y: 40, opacity: 0,       x: getXOffset() }}
                                        animate={{
                                            y: 0,
                                            opacity: 1,

                                        }}
                                        exit={{ y: -40, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="block whitespace-nowrap"
                                    >
                                        {words[currentWord]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="mt-16 flex space-x-3">
                            <span>build</span>
                            <b className="underline">your</b>
                            <span>Future</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedTitle;