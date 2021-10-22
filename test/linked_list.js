// class Node{
//     constructor(ele) {
//         this.ele = ele;
//         this.next = null;
//     }
// }

// class LinkedList{
//     constructor() {
//         this.head = null;
//         this.length = 0;
//     }
//     append(ele) {
//         const node = new Node(ele);
//         if (this.length === 0) {
//             this.head = node;
//         } else {
//             let current = this.head;
//             while (current.next) {
//                 current = current.next;
//             }
//             current.next = new Node(ele)
//         }
//         this.length++;
//     }

//     insert(position, ele) {
//         if(position < 0 || position > this.length) return false
//         const n = new Node(ele);
//         if (position === 0) {
//             n.next = this.head;
//             this.head = n;
//         } else {
//             let i = 0;
//             let cur = this.head
//             let pre = null;
//             while (i++ < position) {
//                 pre = cur;
//                 cur = cur.next;
//             }
//             pre.next = n;
//             n.next = cur;
//         }
//         this.length++;
//         return true
//     }
// }

// const list = new LinkedList()
// list.append('111')
// list.append('bbb')
// list.append('abb')
// console.log(list);
