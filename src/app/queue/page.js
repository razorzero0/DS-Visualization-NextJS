"use client";
import "./styles.css";
import { motion } from "framer-motion";
// @ts-ignore
import { Deque } from "js_dsal";
import { useState } from "react";

export default function Dsqueue() {
   const [action, setAction] = useState("");
   const [top, setTop] = useState(false);
   const [data, setData] = useState({
      name: "Queue",
      size: 0,
      elements: [],
   });
   const [queue, setqueue] = useState(new Deque());

   const handler = (event) => {
      event.preventDefault();
      let name = event.target.name.value;
      if (name) {
         setAction("Enqueue : " + `'${name}'`);
         queue.push(name);
         // Mengambil semua elemen dalam tumpukan
         data.elements.push(name);
         // Memperbarui objek data dengan nilai yang sesuai
         setData({
            name: "Queue",
            size: queue.size(),
            elements: data.elements,
         });
      } else {
         alert("masukkan data");
      }
   };
   const pop = (e) => {
      e.preventDefault();
      if (queue.front()) {
         setAction("dequeue : " + `'${queue.front()}'`);
         queue.pop();
         data.elements.shift(); // Salin

         setData({
            name: "Queue",
            size: data.elements.length,
            elements: data.elements,
         });
      }
   };

   const isTop = () => {
      setTop(true);
      setTimeout(() => {
         setTop(false);
      }, 1500);
   };
   return (
      <div className="m-10">
         <form onSubmit={handler}>
            <input
               className="h-10 pl-2 text-black rounded-md text-md"
               type="text"
               name="name"
               required
            />
            <button className="btn" type="submit">
               ENQUEUE
            </button>
            <button className="btn" onClick={pop}>
               DEQUEUE
            </button>
         </form>

         <div>
            <h1 className={"font-serif text-sm mt-4 "}>
               action ={">"} {action && action}
            </h1>
            <h1 className="flex items-center justify-center gap-5 my-4">
               Front :{" "}
               <li onClick={isTop} className={top ? "blink" : ""}>
                  {queue.front()}
               </li>
            </h1>

            <pre className="absolute z-10 hidden h-40 overflow-scroll text-xs text-black rounded-sm md:block top-5 right-10 w-60 bg-slate-100">
               {JSON.stringify(data, 0, 2)}
            </pre>
            <div className="flex flex-wrap overflow-scroll md:justify-start justify-center gap-4 p-5 border rounded-md shadow-md h-[24rem] bg-slate-100 ">
               {data.elements.map((v, i) => {
                  return (
                     <div key={i} className="wrap-node">
                        <motion.div
                           initial={{ opacity: 0, y: -100 }}
                           animate={{ opacity: 1, y: 0, dur: 1 }}>
                           <li className={i === 0 && top ? "blink" : ""}>{v}</li>
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
