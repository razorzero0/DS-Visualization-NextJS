/* eslint-disable react/jsx-indent */
"use client";
import React, { useEffect } from "react";
import "./treeflex.css";
import "./style.css";
// import "./globals.css";

import { BinarySearchTree } from "./algorithm";

const bst = new BinarySearchTree();

function Tree(props) {
   const { data } = props;

   function renderTree(node) {
      return Object.entries(node).map(function ([key, value]) {
         if (key === "left" && typeof value === "object") {
            if (value !== null) {
               return (
                  <li key={value.data}>
                     <Tree data={value} />
                  </li>
               );
            }
            if (value === null) {
               return null;
            }
         } else if (key === "right" && typeof value === "object") {
            if (value !== null) {
               return (
                  <li key={value.data}>
                     <Tree data={value} />
                  </li>
               );
            }
            if (value === null) {
               return null;
            }
         }
      });
   }

   return data ? (
      <>
         <span className="tf-nc">{data.data}</span>
         <ul>{renderTree(data)}</ul>
      </>
   ) : (
      "EMPTY"
   );
}

function App() {
   const [isClient, setIsClient] = React.useState(false);
   const [number, setNumber] = React.useState(50);
   const [root, setRoot] = React.useState(null);

   React.useEffect(() => {
      setRoot((prev) => ({ ...prev, ...bst.root }));
      setIsClient(true);
   }, []);

   function changeNumber(e) {
      setNumber(Number(e.target.value));
   }

   function addNumber(e) {
      e.preventDefault();
      bst.add(number);
      setRoot((prev) => ({ ...prev, ...bst.root }));
   }

   function removeNumber(e) {
      e.preventDefault();
      bst.remove(number);
      setRoot((prev) => ({ ...prev, ...bst.root }));
   }

   function findMax() {
      alert(`Max value is ${bst.findMax()}`);
   }

   function findMin() {
      alert(`Mim value is ${bst.findMin()}`);
   }
   const inorder = bst.inorderTraversal();
   const postorder = bst.postorderTraversal();
   const preorder = bst.preorderTraversal();
   const treeJson = bst.toJson();
   return (
      <div className="m-10">
         <form onSubmit={addNumber}>
            <input type="number" min="1" name="add" onChange={changeNumber} required />
            <button type="submit" className="btn-blue">
               Add
            </button>
            <button type="button" onClick={findMax} className="btn-grape">
               Find Max
            </button>
         </form>
         <form onSubmit={removeNumber} className="form-control">
            <input
               type="number"
               min="1"
               name="remove"
               onChange={changeNumber}
               required
               className="h-10 pl-2 text-black rounded-md text-md"
            />
            <button type="submit" className="btn-red">
               Remove
            </button>
            <button type="button" onClick={findMin} className="btn-grape">
               Find Min
            </button>
         </form>
         <pre className="to-json">{isClient && treeJson}</pre>
         <div className="mt-8 canvas">
            {isClient && (
               <>
                  <table className="text-slate-800">
                     <tbody>
                        <tr>
                           <td>InOrder </td>
                           <td>: {inorder}</td>
                        </tr>
                        <tr>
                           <td>PreOrder </td>
                           <td>: {preorder}</td>
                        </tr>
                        <tr>
                           <td>PostOrder </td>
                           <td>: {postorder}</td>
                        </tr>
                     </tbody>
                  </table>
                  <div className="tf-tree tf-custom">
                     <ul>
                        <li>
                           <Tree data={root} parent={bst.root} />
                        </li>
                     </ul>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default App;
