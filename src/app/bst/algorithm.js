class Node {
   constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
   }
}

class BinarySearchTree {
   constructor() {
      this.root = null;
   }

   add(data) {
      // debugger;
      const node = this.root;
      if (node === null) {
         this.root = new Node(data);
      } else {
         function searchTree(nodes) {
            // nodes equal this.root;
            // debugger;
            if (data < nodes.data) {
               if (nodes.left === null) {
                  nodes.left = new Node(data);
               } else if (nodes.data !== null) {
                  return searchTree(nodes.left);
               }
            } else if (data > nodes.data) {
               if (nodes.right === null) {
                  nodes.right = new Node(data);
               } else if (nodes.data !== null) {
                  return searchTree(nodes.right);
               }
            } else {
               return null;
            }
         }
         searchTree(node);
      }
   }

   findMin() {
      let current = this.root;
      if (current === null) {
         return null;
      }
      while (current.left !== null) {
         current = current.left;
      }
      return current.data;
   }

   findMinNode(node) {
      if (node.left === null) {
         return node;
      }
      return this.findMinNode(node.left);
   }

   findMax() {
      let current = this.root;
      if (current === null) {
         return null;
      }
      while (current.right !== null) {
         current = current.right;
      }
      return current.data;
   }

   remove(data) {
      function removeData(nodes, datas) {
         if (nodes === null) {
            return null;
         }
         if (datas < nodes.data) {
            nodes.left = removeData(nodes.left, datas);
            return nodes;
         }
         if (datas > nodes.data) {
            nodes.right = removeData(nodes.right, datas);
            return nodes;
         }
         if (nodes.left === null && nodes.right === null) {
            nodes = null;
            return nodes;
         }
         if (nodes.left === null) {
            nodes = nodes.right;
            return nodes;
         }
         if (nodes.right === null) {
            nodes = nodes.left;
            return nodes;
         }
         const min = this.findMinNode(nodes.right);
         nodes.data = min.data;
         nodes.right = removeData(nodes.right, min.data);
         return nodes;
      }
      this.root = removeData(this.root, data);
   }

   print() {
      return this.root;
   }
   // Metode inorderTraversal
   inorderTraversal() {
      const result = [];

      function traverse(node) {
         if (node !== null) {
            // Traverse ke kiri
            traverse(node.left);

            // Kunjungi node saat ini
            result.push(node.data);

            // Tambahkan "->" setelah node
            result.push("->");

            // Traverse ke kanan
            traverse(node.right);
         }
      }

      traverse(this.root);

      // Hapus tanda "->" yang terakhir
      result.pop();

      return result.join(" "); // Menggabungkan elemen dengan spasi
   }

   // Metode preorderTraversal
   preorderTraversal() {
      const result = [];

      function traverse(node) {
         if (node !== null) {
            // Kunjungi node saat ini
            result.push(node.data);

            // Tambahkan "->" setelah node
            result.push("->");

            // Traverse ke kiri
            traverse(node.left);

            // Traverse ke kanan
            traverse(node.right);
         }
      }

      traverse(this.root);

      // Hapus tanda "->" yang terakhir
      result.pop();

      return result.join(" "); // Menggabungkan elemen dengan spasi
   }

   // Metode postorderTraversal
   postorderTraversal() {
      const result = [];

      function traverse(node) {
         if (node !== null) {
            // Traverse ke kiri
            traverse(node.left);

            // Traverse ke kanan
            traverse(node.right);

            // Kunjungi node saat ini
            result.push(node.data);

            // Tambahkan "->" setelah node
            result.push("->");
         }
      }

      traverse(this.root);

      // Hapus tanda "->" yang terakhir
      result.pop();

      return result.join(" "); // Menggabungkan elemen dengan spasi
   }
   toJson() {
      function convertNodeToJson(node) {
         if (node === null) {
            return null;
         }

         const jsonNode = {
            data: node.data,
         };

         jsonNode.left = convertNodeToJson(node.left);
         jsonNode.right = convertNodeToJson(node.right);

         return jsonNode;
      }

      const rootJson = convertNodeToJson(this.root);
      return JSON.stringify(rootJson, null, 2);
   }
}

export { Node, BinarySearchTree };
