"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function Home() {
    const algorithm = [
        {
            name: "ARRAY",
            url: "/array",
            img: "/array.png",
            gif: "/array-animate.gif",
        },
        {
            name: "Linked List",
            url: "/list",
            img: "/linkedlist.jpg",
            gif: "/linkedlis-animate.gif",
        },
        {
            name: "STACK",
            url: "/stack",
            img: "/stack.webp",
            gif: "/stack-animate.gif",
        },
        {
            name: "QUEUE",
            url: "/queue",
            img: "/queue.png",
            gif: "/queue-animate.gif",
        },
        {
            name: "TREE (Binary Search)",
            url: "/bst",
            img: "/bst.png",
            gif: "/bst-animate.gif",
        },
        {
            name: "Graph (Djikstra)",
            url: "/graph",
            img: "/graph.webp",
            gif: "/graph-animate.gif",
        },
    ];
    const [hoverStates, setHoverStates] = useState(algorithm.map(() => false));

    return (
        <>
            <h1 className="mt-6 text-2xl font-bold text-center">
                VISUALISASI ALGORITMA STRUKTUR DATA
            </h1>
            <div className="flex flex-col items-center justify-center gap-8 mx-48 my-5 align-middle md:flex-wrap md:flex-row ">
                {algorithm.map((v, i) => {
                    return (
                        <div key={i}>
                            {v.url !== "/bst" ? (
                                <Link href={v.url} className="link-menu">
                                    <div className="text-center ">
                                        <motion.div className="overflow-hidden h-44 menu bg-Cwhite w-72 ">
                                            <motion.img
                                                onMouseOver={() => {
                                                    const newHoverStates = [...hoverStates];
                                                    newHoverStates[i] = true;
                                                    setHoverStates(newHoverStates);
                                                }}
                                                onMouseLeave={() => {
                                                    const newHoverStates = [...hoverStates];
                                                    newHoverStates[i] = false;
                                                    setHoverStates(newHoverStates);
                                                }}
                                                className="w-full h-full "
                                                src={hoverStates[i] ? v.gif : v.img}
                                                alt="img"
                                            />
                                        </motion.div>
                                        <h1 className="mt-3 font-mono text-2xl">{v.name}</h1>
                                    </div>
                                </Link>
                            ) : (
                                <a href={v.url} className="link-menu">
                                    <div className="text-center ">
                                        <motion.div className="overflow-hidden h-44 menu bg-Cwhite w-72 ">
                                            <motion.img
                                                onMouseOver={() => {
                                                    const newHoverStates = [...hoverStates];
                                                    newHoverStates[i] = true;
                                                    setHoverStates(newHoverStates);
                                                }}
                                                onMouseLeave={() => {
                                                    const newHoverStates = [...hoverStates];
                                                    newHoverStates[i] = false;
                                                    setHoverStates(newHoverStates);
                                                }}
                                                className="w-full h-full "
                                                src={hoverStates[i] ? v.gif : v.img}
                                                alt="img"
                                            />
                                        </motion.div>
                                        <h1 className="mt-3 font-mono text-2xl">{v.name}</h1>
                                    </div>{" "}
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="text-center ">
                <h1>Created with 🧡 by Ainun</h1>
            </div>
        </>
    );
}
