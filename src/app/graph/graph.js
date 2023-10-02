"use client";
import "./style.css";
import "../globals.css";
import { motion } from "framer-motion";
// @ts-ignore
import { DirectedGraph } from "../js";
import { useRef, useState } from "react";
const nodes = [
   { id: 0, name: "A", x: 550, y: 80 },
   { id: 1, name: "B", x: 750, y: 80 },
   { id: 2, name: "C", x: 750, y: 220 },
   { id: 3, name: "D", x: 550, y: 220 },
   { id: 4, name: "E", x: 450, y: 150 },
   { id: 5, name: "F", x: 850, y: 150 },
];

const edges = [
   { id: 0, startNodeId: 0, endNodeId: 1, weight: 3 },
   { id: 1, startNodeId: 1, endNodeId: 2, weight: 5 },
   { id: 2, startNodeId: 2, endNodeId: 3, weight: 2 },
   { id: 3, startNodeId: 3, endNodeId: 0, weight: 1 },
   { id: 4, startNodeId: 0, endNodeId: 4, weight: 4 },
   { id: 5, startNodeId: 1, endNodeId: 5, weight: 20 },
   { id: 6, startNodeId: 4, endNodeId: 3, weight: 2 },
   { id: 7, startNodeId: 2, endNodeId: 5, weight: 8 },
];

export default function App() {
   const [path, setPath] = useState(false);
   const [dijkstra, setDijkstra] = useState({
      distance: "",
      visitedEdges: [{ nodeStart: "", nodeEnd: "", weight: "" }],
      visitedNodes: [{ Iteration: "", node: "", weight: "", prevnode: "" }],
   });
   const nodeStart = useRef("");
   const nodeEnd = useRef("");

   const submit = () => {
      // Inisialisasi objek DirectedGraph dengan 6 node dan 8 vertex
      const graph = new DirectedGraph(
         ["A", "B", "C", "D", "E", "F"],
         [
            ["A", "B", 3],
            ["B", "C", 5],
            ["C", "D", 2],
            ["D", "A", 1],
            ["A", "E", 4],
            ["B", "F", 20],
            ["E", "D", 2],
            ["C", "F", 8],
         ]
      );

      const start = nodeStart.current.value;
      const end = nodeEnd.current.value;
      if (start !== end) {
         try {
            const djikstra = graph.shortestDistance(start, end);
            setDijkstra(djikstra);
         } catch {
            setDijkstra({
               distance: "",
               visitedEdges: [{ nodeStart: start, nodeEnd: "", weight: "" }],
               visitedNodes: [{ Iteration: "", node: start, weight: "", prevnode: "" }],
            });
         }
      } else {
         setDijkstra({
            distance: "",
            visitedEdges: [{ nodeStart: start, nodeEnd: "", weight: "" }],
            visitedNodes: [{ Iteration: "", node: start, weight: "", prevnode: "" }],
         });
      }
   };
   const changeLineColor = (nodeStart, nodeEnd) => {
      if (dijkstra.visitedEdges.length > 0) {
         for (let i = 0; i < dijkstra.visitedEdges.length; i++) {
            if (
               nodeStart.name === dijkstra.visitedEdges[i].nodeStart &&
               nodeEnd.name === dijkstra.visitedEdges[i].nodeEnd
            ) {
               return "#FBBC05";
            }
         }
      }
      return "grey";
   };
   const changeCircleColor = (node) => {
      if (dijkstra.visitedEdges.length > 0) {
         for (let i = 0; i < dijkstra.visitedEdges.length; i++) {
            if (
               node.name === dijkstra.visitedEdges[i].nodeStart ||
               node.name === dijkstra.visitedEdges[i].nodeEnd
            ) {
               return "#FBBC05";
            }
         }
      }
      return "#BABABA";
   };
   const resetAction = () => {
      setDijkstra({
         distance: "",
         visitedEdges: [{ nodeStart: "", nodeEnd: "", weight: "" }],
         visitedNodes: [{ Iteration: "", node: "", weight: "", prevnode: "" }],
      });
      nodeStart.current.value = "";
      nodeEnd.current.value = "";
   };

   const optionNode = (margin = "", ref) => {
      return (
         <>
            <select
               className={margin + " w-16 h-10 pl-2  text-black rounded-md text-md"}
               type="text"
               name="end"
               required
               ref={ref}>
               {nodes.map((v, i) => {
                  return (
                     <>
                        <option id={v.id}>{v.name}</option>
                     </>
                  );
               })}
            </select>
         </>
      );
   };
   return (
      <div className="m-10 ">
         <form
            onSubmit={(e) => {
               e.preventDefault();
            }}>
            <label>Node Start : </label>
            {optionNode("", nodeStart)}

            <button className="btn-blue" onClick={submit}>
               Run Dijkstra
            </button>
         </form>
         <div className="flex items-center mt-3">
            <label> Node End : </label>
            {optionNode("ml-2", nodeEnd)}

            <button className="ml-2 btn-red" onClick={resetAction}>
               Reset
            </button>
         </div>
         <pre className="to-json">{JSON.stringify(dijkstra, 0, 2)}</pre>
         <div>
            <h1 className={"font-serif text-sm mt-4 "}>action ={">"}</h1>
            <h1 className="flex items-center justify-center gap-5 my-4 font-bold Text-lg">
               Distance : {dijkstra.distance}
            </h1>

            <div className="pl-40 canvas">
               <table className="hidden text-slate-800 md:block">
                  <tbody>
                     <tr>
                        <th>Iterasi</th>
                        <th>Node Diuji</th>
                        <th>Bobot</th>
                        <th>Node Sebelumnya</th>
                     </tr>
                     {dijkstra.visitedNodes[0].node !== "" &&
                        dijkstra.visitedNodes.map((v, i) => {
                           return (
                              <>
                                 <tr id={v.id}>
                                    <td>{i}</td>
                                    <td>{v.node}</td>
                                    <td>{v.weight ? v.weight : "infinity"}</td>
                                    <td>{v.prevNode ? v.prevNode : "null"}</td>
                                 </tr>
                              </>
                           );
                        })}
                  </tbody>
               </table>
               <motion.svg
                  width="1200"
                  height="1200"
                  viewBox="0 0 1200 1200"
                  initial="hidden"
                  animate="visible">
                  {/* Render edges */}
                  {edges.map((edge) => {
                     const startNode = nodes.find((node) => node.id === edge.startNodeId);
                     const endNode = nodes.find((node) => node.id === edge.endNodeId);
                     // Tentukan warna garis berdasarkan id edge tertentu
                     const stroke = changeLineColor(startNode, endNode);
                     if (startNode && endNode) {
                        // Calculate the position for the text label
                        const textX = (startNode.x + endNode.x) / 2;
                        const textY = (startNode.y + endNode.y) / 2;
                        // Definisikan marker arrow untuk setiap garis
                        const markerId = `marker-arrow-${edge.id}`;
                        const markerPath = `url(#${markerId})`;

                        return (
                           <motion.g key={edge.id}>
                              <defs>
                                 <marker
                                    id={markerId}
                                    markerWidth="14"
                                    markerHeight="7"
                                    refX="14"
                                    refY="3.5"
                                    orient="auto">
                                    <polygon points="0 0, 5 3.5, 0 7" fill={stroke} />
                                 </marker>
                              </defs>
                              {/* Line representing the edge */}
                              <motion.line
                                 x1={startNode.x}
                                 y1={startNode.y}
                                 x2={endNode.x}
                                 y2={endNode.y}
                                 stroke={stroke}
                                 strokeWidth="2"
                                 initial={{ opacity: 0, pathLength: 0 }}
                                 animate={{ opacity: 1, pathLength: 1 }}
                                 transition={{ duration: 1 }}
                                 markerEnd={markerPath}
                              />

                              {/* Text label for weight */}
                              <motion.text
                                 x={textX}
                                 y={textY}
                                 textAnchor="middle"
                                 alignmentBaseline="middle"
                                 fontSize="16" // Diperbesar
                                 fill="black"
                                 initial={{ opacity: 0, scale: 0 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ duration: 1 }}
                                 fontWeight="bold">
                                 {edge.weight}
                              </motion.text>
                           </motion.g>
                        );
                     }

                     return null;
                  })}
                  {/* Render nodes as circles */}
                  {nodes.map((node) => {
                     const fill = changeCircleColor(node);
                     return (
                        <motion.g key={node.id}>
                           {/* Lingkaran */}
                           <motion.circle
                              cx={node.x}
                              cy={node.y}
                              r={20} // Diperbesar
                              fill={fill} // Warna abu
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 1 }}
                           />

                           {/* Text "ABC" di dalam lingkaran */}
                           <motion.text
                              x={node.x}
                              y={node.y}
                              textAnchor="middle"
                              alignmentBaseline="middle"
                              fontSize="12"
                              fill="black" // Warna teks
                              fontWeight="bold"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 1 }}>
                              {node.name}
                           </motion.text>
                        </motion.g>
                     );
                  })}
               </motion.svg>
               ;
            </div>
         </div>
      </div>
   );
}
