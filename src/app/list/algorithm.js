// Definisikan struktur data Node
function Node(data) {
   this.data = data;
   this.next = null;
}

// Definisikan struktur data LinkedList
function LinkedList() {
   this.head = null;
   this.tail = null;
   this.length = 0;
}

// Metode untuk menambahkan elemen di akhir linked list
LinkedList.prototype.append = function (data) {
   const newNode = new Node(data);
   if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
   } else {
      this.tail.next = newNode;
      this.tail = newNode;
   }
   this.length++;
};

// Metode untuk menambahkan elemen di awal linked list
LinkedList.prototype.prepend = function (data) {
   const newNode = new Node(data);
   newNode.next = this.head;
   this.head = newNode;
   if (this.tail === null) {
      this.tail = newNode;
   }
   this.length++;
};

// Metode untuk menghapus elemen dengan nilai tertentu atau elemen terakhir jika tidak ada parameter
LinkedList.prototype.remove = function (data) {
   if (this.head === null) return;

   if (!data || this.head.data === data) {
      this.head = this.head.next;
      if (this.head === null) {
         this.tail = null;
      }
      this.length--;
      return;
   }

   let current = this.head;
   while (current.next !== null) {
      if (current.next.data === data) {
         current.next = current.next.next;
         if (current.next === null) {
            this.tail = current;
         }
         this.length--;
         return;
      }
      current = current.next;
   }
};

// Metode untuk mencari elemen dengan nilai tertentu
LinkedList.prototype.search = function (data) {
   let current = this.head;
   while (current !== null) {
      if (current.data === data) {
         return current;
      }
      current = current.next;
   }
   return null;
};

// Metode untuk mendapatkan panjang linked list
LinkedList.prototype.size = function () {
   return this.length;
};

// Metode untuk mengecek apakah linked list kosong
LinkedList.prototype.isEmpty = function () {
   return this.length === 0;
};

// Metode untuk menghapus semua elemen dalam linked list
LinkedList.prototype.clear = function () {
   this.head = null;
   this.tail = null;
   this.length = 0;
};

// Metode untuk mengambil semua data linked list dan mengembalikannya sebagai array
LinkedList.prototype.toArray = function () {
   const result = [];
   let current = this.head;
   while (current !== null) {
      result.push(current.data);
      current = current.next;
   }
   return result;
};

// Contoh penggunaan

export { LinkedList };
