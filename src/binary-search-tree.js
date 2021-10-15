const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

module.exports = class BinarySearchTree {
  constructor() {
    this.rootEl = null;
  }

  root() {
    return this.rootEl;
  }

  add(data) {
    this.rootEl = addInside(this.rootEl, data);

    function addInside(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addInside(node.left, data);
      } else {
        node.right = addInside(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchInside(this.rootEl, data);

    function searchInside(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      if (data < node.data) {
        return searchInside(node.left, data);
      } else {
        return searchInside(node.right, data);
      }
    }
  }

  findHelper(rootEl, data) {
    if (rootEl === null) {
      return null;
    }
    if (data < rootEl.data) {
      return this.findHelper(rootEl.left, data);
    }
    if (data > rootEl.data) {
      return this.findHelper(rootEl.right, data);
    }
    return rootEl;
  }

  find(data) {
    return this.findHelper(this.rootEl, data);
  }

  remove(data) {
    this.rootEl = removeNode(this.rootEl, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;

        node.right = removeNode(node.right, minRight.data);

        return node;
      }
    }
  }

  minNode(root) {
    return root.left === null ? root : this.minNode(root.left);
  }

  maxNode(root) {
    return root.right === null ? root : this.maxNode(root.right);
  }

  min() {
    return !this.rootEl ? null : this.minNode(this.rootEl).data;
  }

  max() {
    return !this.rootEl ? null : this.maxNode(this.rootEl).data;
  }
};
