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
      return this._head != null ? this._head.data : false;
    }

    tail() {
      return this._tail != null ? this._tail.data : false;
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

      return this;
    }

    deleteAt(index) {
      let currentNode = this._head;
      let count = 1;

      while (count <= this.length) {
        if (index === count) {
            if (currentNode.prev) {
              currentNode.prev.next = currentNode.next;
            }

            if (currentNode.next) {
              currentNode.next.prev = currentNode.prev;
            }

            this.length--;
            break;
        }

        currentNode = currentNode.next;
        count++;
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

        }
      }

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
