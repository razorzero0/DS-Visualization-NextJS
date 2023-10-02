"use client";
import "../globals.css";
import "./styles.css";
import { motion } from "framer-motion";
// @ts-ignore
import { Stack } from "js_dsal";
import { useState } from "react";

export default function DsStack() {
   const [action, setAction] = useState("");
   const [top, setTop] = useState(false);
   const [data, setData] = useState({
      name: "Stack",
      size: 0,
      elements: [],
   });
   const [stack, setStack] = useState(new Stack());

   const handler = (event) => {
      event.preventDefault();
      let name = event.target.name.value;
      if (name) {
         setAction("push : " + `'${name}'`);
         stack.push(name);
         // Mengambil semua elemen dalam tumpukan
         const stackElements = stack._elements;
         // Memperbarui objek data dengan nilai yang sesuai
         setData({
            name: "Stack",
            size: stack.size(),
            elements: stackElements,
         });
      } else {
         alert("masukkan data");
      }
   };
   const pop = (e) => {
      e.preventDefault();
      if (stack.top()) {
         setAction("pop : " + `"${stack.top()}"`);
         stack.pop();
         const stackElements = stack._elements;
         setData({
            name: "Stack",
            size: stack.size(),
            elements: stackElements,
         });
      }
   };

   const isTop = () => {
      setTop(true);
      setTimeout(() => {
         setTop(false);
      }, 2000);
   };
   return (
      <div className="m-10">
         <form onSubmit={handler}>
            <input className="h-10 pl-2 rounded-md text-md" type="text" name="name" />
            <button className="btn" type="submit">
               PUSH
            </button>
            <button className="btn" onClick={pop}>
               POP
            </button>
         </form>

         <div>
            <h1 className={"font-serif text-sm mt-4 "}>
               action ={">"} {action && action}
            </h1>
            <h1 className="flex items-center justify-center gap-5 my-4">
               Top :{" "}
               <li onClick={isTop} className={top ? "blink" : ""}>
                  {stack.top()}
               </li>
            </h1>
            {/* <h2>Data di Stack:</h2> */}
            <pre className="to-json">
               {/* @ts-ignore */}
               {JSON.stringify(data, 0, 2)}
            </pre>
            <div className="canvas ">
               {data.elements.map((v, i) => {
                  return (
                     <div key={i} className="wrap-node">
                        <motion.div
                           initial={{ opacity: 0, y: -100 }}
                           animate={{ opacity: 1, y: 0, dur: 1 }}>
                           <li className={i === data.elements.length - 1 && top ? "blink" : ""}>
                              {v}
                           </li>
                        </motion.div>
                        <span className="text-black">{i}</span>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
