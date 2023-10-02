"use client";
import "../globals.css";
import "./style.css";
import { motion } from "framer-motion";
import { List } from "../js";
import { useState, useRef } from "react";

export default function DsList() {
   const inputRef = useRef(null);
   const [action, setAction] = useState("");
   const [top, setTop] = useState(false);
   const [data, setData] = useState({
      name: "List",
      size: 0,
      elements: [],
   });

   const push = (event) => {
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
      }, 1500);
   };
   const [list, setList] = useState(new List());
   const pushFront = (name) => {
      setAction("pushFront : " + `'${name}'`);
      list.pushFront(name);
      updateData();
   };

   const popFront = () => {
      setAction("popFront : " + `'${name}'`);
      // Periksa apakah daftar sudah kosong
      // Memanggil metode popFront pada objek List
      if (list._size == 1) {
         list.clear();
      } else {
         list.popFront();
      }
      // Memanggil fungsi untuk memperbarui data di React state
      updateData();
   };

   const pushBack = (name) => {
      setAction("POP");
      // Memanggil metode pushBack pada objek List
      list.pushBack(name);
      updateData();
   };
   const popBack = () => {
      setAction("popBack : " + `'${name}'`);
      // Memanggil metode popBack pada objek List
      list.popBack();
      updateData();
   };

   const erase = (name) => {
      // Memanggil metode erase pada objek List
      setAction("Erase Data");
      list.clear(name);
      // Memanggil fungsi untuk memperbarui data di React state
      updateData();
   };
   const updateData = () => {
      const listElements = [];
      let iterator = list.begin();
      while (iterator != null) {
         listElements.push(iterator.getData());
         iterator = iterator.getNext();
      }
      const filteredListElements = listElements.filter((element) => element !== null);

      setData({
         name: "List",
         size: list.size(),
         elements: filteredListElements,
      });
   };
   function handler(e) {
      e.preventDefault();
   }
   return (
      <div className="m-10">
         <form onSubmit={handler} className="">
            <input
               className="h-10 pl-2 rounded-md text-md float-left"
               type="text"
               name="data"
               ref={inputRef}
            />
            <button className="btn ml-5" onClick={() => pushBack(inputRef.current.value)}>
               Append
            </button>
            <div className="mt-2 ">
               {/* <button className="btn ml-0 bg-Cgrape" onClick={popFront}>
                  Prepend
               </button> */}
               <button className="btn ml-0" onClick={() => pushFront(inputRef.current.value)}>
                  Prepend
               </button>
               <button className="btn bg-Cgrape" onClick={popBack}>
                  Pop
               </button>

               <button className="btn bg-Cpink" onClick={erase}>
                  Erase
               </button>
            </div>
         </form>

         <div>
            <h1 className={"font-serif text-sm mt-4 "}>
               action ={">"} {action && action}
            </h1>
            <h1 className="flex items-center justify-center gap-5 my-4">
               Front :{" "}
               <li onClick={isTop} className={top ? "blink" : ""}>
                  {list.front()}
               </li>
            </h1>
            {/* <h2>Data di Stack:</h2> */}
            <pre className="to-json">
               {/* @ts-ignore */}
               {JSON.stringify(data, 0, 2)}
            </pre>
            <div className="canvas ">
               {data.elements.map((v, i) => {
                  // Periksa apakah elemen tidak null

                  return (
                     <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {i !== 0 && (
                           // eslint-disable-next-line @next/next/no-img-element
                           <img
                              src="/2arrow.png"
                              alt="img"
                              className="w-12  h-8 transform translate-y-2"
                           />
                        )}
                        <div key={i} className="">
                           <motion.div
                              className="flex"
                              initial={{ opacity: 0, y: -100 }}
                              animate={{ opacity: 1, y: 0, dur: 1 }}>
                              <h1 className="text-Cblack bg-yellow-300 align-center items-center p-2 border border-black ">
                                 {i === 0 ? "null" : "prev"}
                              </h1>
                              <li className={i === 0 && top ? "blink" : ""}>{v}</li>
                              <h1 className="text-Cblack bg-yellow-300 align-center items-center p-2 border border-black ">
                                 {i !== list.size() - 1 ? "next" : "null"}
                              </h1>
                           </motion.div>
                        </div>
                     </>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
