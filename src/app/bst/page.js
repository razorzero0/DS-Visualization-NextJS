/* eslint-disable react/jsx-indent */
"use client";
import React from "react";
import "treeflex/dist/css/treeflex.css";
import "./styles.css";
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
   const [number, setNumber] = React.useState(50);
   const [root, setRoot] = React.useState(null);

   React.useEffect(() => {
      bst.add(7);
      bst.add(4);
      bst.add(9);
      bst.add(3);
      bst.add(5);
      bst.add(8);
      bst.add(10);

      setRoot((prev) => ({ ...prev, ...bst.root }));
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
         <h1>Binary Search Tree Visualization</h1>
         <form onSubmit={addNumber} className="form-control">
            <input
               type="number"
               min="1"
               name="add"
               onChange={changeNumber}
               required
               className="h-10 pl-2 text-black rounded-md text-md"
            />
            <button type="submit" className="btn bg-slate-500">
               Add
            </button>
            <button type="button" onClick={findMax} className="btn bg-slate-500">
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
            <button type="submit" className="btn bg-slate-500">
               Remove
            </button>
            <button type="button" onClick={findMin} className="btn bg-slate-500">
               Find Min
            </button>
         </form>
         <pre className="to-json">{treeJson}</pre>
         <div className="canvas mt-8">
            <table className="text-slate-800">
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
            </table>
            <div className="tf-tree tf-custom">
               <ul>
                  <li>
                     <Tree data={root} parent={bst.root} />
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
}

export default App;
