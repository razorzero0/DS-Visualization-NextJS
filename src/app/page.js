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
      <div className="flex flex-col items-center justify-center gap-8 flex-wrap my-10 mx-48  align-middle md:flex-row ">
         {algorithm.map((v, i) => {
            return (
               <Link key={i} href={v.url} className="link-menu">
                  <div className="text-center ">
                     <motion.div
                        // initial={{ opacity: 0, y: -100 }}
                        // animate={{ opacity: 1, y: 0 }}
                        className="overflow-hidden menu bg-Cwhite md:h-48 md:w-72 ">
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
                     <h1 className="mt-4 font-mono text-2xl">{v.name}</h1>
                  </div>
               </Link>
            );
         })}
      </div>
   );
}
