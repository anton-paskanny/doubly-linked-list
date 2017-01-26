const Node = require('./node');

class LinkedList {
    constructor() {
      this._head = null;
      this._tail = null;
      this.length = 0;
    }

    append(data) {
      let node = new Node(data);

      if (this.length === 0) {
        this._head = node;
        this._tail = node;
      } else {
        this._tail.next = node;
        node.prev = this._tail;
        this._tail = node;
      }

      this.length++;

      return this;
    }

    head() {
      return this._head.data;
    }

    tail() {
      return this._tail.data;
    }

    at(index) {
      let currentNode = this._head;
      let count = 1;

      while (count <= index) {
        currentNode = currentNode.next;
        count++;
      }

      return currentNode.data;
    }

    insertAt(index, data) {
      let node = new Node(data);
      let currentNode = this._head;
      let count = 1;
      let beforeNodeToInsert = null;
      let indexNode = null;
      let indexFindNode = null;

      /*---find beforeNode and indexNode---*/
      while (count <= index) {
        if (index === 1) {
            indexNode = currentNode;
            indexNode.next = node;
            node.prev = indexNode;
            this._tail = node;
            break;
        } else if (index === count) {
          indexNode = currentNode;
          indexFindNode = count;

          beforeNodeToInsert = indexNode.prev;
          beforeNodeToInsert.next = node;
          node.prev = beforeNodeToInsert;
          node.next = indexNode;

          indexNode.prev = node;
          break;
        } else {
          currentNode = currentNode.next;
          count++;
        }
      }

      return this;
    }

    isEmpty() {
      return this.length > 0 ? false : true;
    }

    clear() {
      let count = 1;
      let currentNode = this._head;
      let nextNode = currentNode.next;

      while (count <= this.length) {

        currentNode.data = null;
        currentNode.prev = null;
        currentNode.next = null;

        if (nextNode) {
          currentNode = nextNode;
          nextNode = nextNode.next;
        }

        count++;
      }

      this.length = 0;
    }

    deleteAt(index) {
      let currentNode = this._head;
      let count = 1;
      let beforeNodeToDelete = null;
      let afterNodeToDelete = null;
      let nodeToDelete = null;
      let indexFindNode = null;

      if (this.length >= 1) {
        if (index === 1) {
            if (currentNode.next) {
                this._head = currentNode.next;
                currentNode.next = null;
                currentNode.data = null;
                afterNodeToDelete = currentNode.next;
                afterNodeToDelete.prev = null;
                currentNode = afterNodeToDelete;
            } else {
              currentNode.data = null;
              this._head = null;
              this._tail = null;
              this.length = 0;
            }
          } else if (index === this.length) {
              this._tail = currentNode.prev;
              this._tail.next = null;
          } else {
              while (count <= index) {
                currentNode = currentNode.next;
                count++;
              }

              beforeNodeToDelete = currentNode.prev;
              nodeToDelete = currentNode;
              afterNodeToDelete = currentNode.next;

              beforeNodeToDelete.next = afterNodeToDelete;
              afterNodeToDelete.prev = beforeNodeToDelete;

              nodeToDelete.prev = null;
              nodeToDelete.next = null;
              nodeToDelete.data = null;

          }
        }

        return this;
    }

    reverse() {
      let count = 1;
      let currentNode = this._head;
      let currentNodeNext = currentNode.next;
      let currentNodePrev = null;

      if (this.length > 1) {
        while (count <= this.length) {
          if (count === 1) {
            currentNode.prev = currentNode.next;
            currentNode.next = null;
            this._tail = currentNode;
            currentNode = currentNodeNext;
          } else if (count === this.length) {
            currentNode.next = currentNode.prev;
            currentNode.prev = null;
            this._head = currentNode;
          } else {
            currentNodeNext = currentNode.next;
            currentNodePrev = currentNode.prev;
            currentNode.prev = currentNode.next;
            currentNode.next = currentNodePrev;
            currentNode = currentNodeNext;
          }

          count++;

        } // end while
      } // end if

      return this;
    }

    indexOf(data) {
      let currentNode = this._head;
      let count = 0;
      let index = -1;

      while (count < this.length) {
        if (currentNode.data === data) {
          index = count;
          break;
        } else {
          currentNode = currentNode.next;
          count++;
        }
      }

      return index;
    }

}

module.exports = LinkedList;
