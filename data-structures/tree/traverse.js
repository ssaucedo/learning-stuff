//Traversal modes implementation

class BinaryTree {
  constructor(root){
    this.root = root
  }
  

	// BREATH FIRST
  bfs() {
    let queue = [this.root]
    while(queue.length !== 0) {
      let node = queue.shift()
      console.log(node.key)
      if(node.left !== null) {
        queue.push(node.left)
      }
      if(node.right !== null) {
        queue.push(node.right)
      }
    }
  } 
  
	// DEEP FIRST
  // root-left-rigth
  preOrder(root) {
    console.log(root.key)
    if(root.left !== null) {
      this.preOrder(root.left)
    }
    if(root.right !== null) {
      this.preOrder(root.right)
    }
  }
  
  // left-root-rigth
  inOrder(root) {
    if(root.left !== null) {
      this.inOrder(root.left)
    }

    console.log(root.key)
    
    if(root.right !== null) {
      this.inOrder(root.right)
    }
  }
  
  postOrder(root) {
    if(root.left !== null) {
      this.postOrder(root.left)
    }
    
    if(root.right !== null) {
      this.postOrder(root.right)
    }
    
    console.log(root.key)
  }

   postOrderIterative() {  
        let s1 = []
        let s2 = []
 
        s1.push(this.root)
        while (s1.length !== 0) {
            let tmp = s1.pop();
            s2.push(tmp);
         
            if (tmp.left != null)
                s1.push(tmp.left);
            if (tmp.right != null)
                s1.push(tmp.right);
        }
 
        while (s2.length !== 0) {
          let tmp = s2.pop();
          console.log(tmp.key)
        }
    }
}

class Node {
  constructor(k){
    this.key = k
    this.left = null
    this.right = null
  }
}

const root = new Node(1)
const node2 = new Node(2)
const node3 = new Node(3)
const node4 = new Node(4)
const node5 = new Node(5)


root.left = node2
root.right = node3
node2.left = node4
node2.right = node5

const bt = new BinaryTree(root)
bt.postOrder(root)
